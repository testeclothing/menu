import { useCallback, useEffect, useMemo, useState } from "react";
import type { MenuItem } from "./data/menu";
import type { Language } from "./i18n";

const storageKey = "confraria-table-note-v1";

export interface TableDraftItem {
  itemId: string;
  quantity: number;
  modifierIds: string[];
  addedAt: number;
}

interface ModifierDefinition {
  id: string;
  label: Record<Language, string>;
}

export interface ModifierOption {
  id: string;
  label: string;
}

export interface TableDraftControls {
  itemsById: Record<string, TableDraftItem>;
  addItem: (itemId: string) => void;
  setQuantity: (itemId: string, quantity: number) => void;
  toggleModifier: (itemId: string, modifierId: string) => void;
}

const modifiers: Record<string, ModifierDefinition> = {
  truffle_shavings: {
    id: "truffle_shavings",
    label: {
      pt: "+ Trufa ralada",
      en: "+ Fresh truffle",
    },
  },
  foie_gras: {
    id: "foie_gras",
    label: {
      pt: "+ Foie gras",
      en: "+ Foie gras",
    },
  },
  extra_truffled_butter: {
    id: "extra_truffled_butter",
    label: {
      pt: "Manteiga trufada extra",
      en: "Extra truffled butter",
    },
  },
  extra_wasabi: {
    id: "extra_wasabi",
    label: {
      pt: "Wasabi extra",
      en: "Extra wasabi",
    },
  },
  extra_ginger: {
    id: "extra_ginger",
    label: {
      pt: "Gengibre extra",
      en: "Extra ginger",
    },
  },
  tare_side: {
    id: "tare_side",
    label: {
      pt: "Molho tare a parte",
      en: "Tare sauce on the side",
    },
  },
  spicy_side: {
    id: "spicy_side",
    label: {
      pt: "Molho spicy a parte",
      en: "Spicy sauce on the side",
    },
  },
  extra_spicy: {
    id: "extra_spicy",
    label: {
      pt: "Picante extra",
      en: "Extra spicy",
    },
  },
  no_coriander: {
    id: "no_coriander",
    label: {
      pt: "Sem coentros",
      en: "No coriander",
    },
  },
};

function unique(values: string[]) {
  return Array.from(new Set(values));
}

function modifierIdsForItem(item: MenuItem) {
  const name = item.name.toLowerCase();
  const description = `${item.descriptionPt} ${item.descriptionEn}`.toLowerCase();
  const ids: string[] = [];

  if (["new-style", "traditional-sushi", "signature-sushi"].includes(item.categoryId)) {
    ids.push("extra_wasabi", "extra_ginger");
  }

  if (["new-style", "signature-sushi"].includes(item.categoryId)) {
    ids.push("tare_side");
  }

  if (["starters", "hot-vegetarian"].includes(item.categoryId)) {
    ids.push("spicy_side");
  }

  if (item.categoryId === "nikkei-ceviches") {
    ids.push("extra_spicy", "no_coriander");
  }

  if (name.includes("filet mignon")) {
    ids.push("truffle_shavings", "foie_gras", "extra_truffled_butter");
  } else if (description.includes("truf")) {
    ids.push("truffle_shavings");
  }

  return unique(ids);
}

export function getModifierOptions(item: MenuItem, language: Language): ModifierOption[] {
  return modifierIdsForItem(item)
    .map((id) => modifiers[id])
    .filter((modifier): modifier is ModifierDefinition => Boolean(modifier))
    .map((modifier) => ({
      id: modifier.id,
      label: modifier.label[language],
    }));
}

export function getModifierLabel(modifierId: string, language: Language) {
  return modifiers[modifierId]?.label[language] ?? modifierId;
}

function normalizeDraftItems(value: unknown): TableDraftItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const draftItem = item as Partial<TableDraftItem>;

      if (typeof draftItem.itemId !== "string") return null;

      return {
        itemId: draftItem.itemId,
        quantity: Math.max(1, Math.floor(Number(draftItem.quantity) || 1)),
        modifierIds: Array.isArray(draftItem.modifierIds)
          ? draftItem.modifierIds.filter((id): id is string => typeof id === "string")
          : [],
        addedAt: Number(draftItem.addedAt) || Date.now(),
      };
    })
    .filter((item): item is TableDraftItem => Boolean(item));
}

function loadDraft() {
  if (typeof window === "undefined") return [];

  try {
    return normalizeDraftItems(JSON.parse(window.localStorage.getItem(storageKey) ?? "[]"));
  } catch {
    return [];
  }
}

export function useTableDraft() {
  const [items, setItems] = useState<TableDraftItem[]>(loadDraft);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((itemId: string) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.itemId === itemId);

      if (existingItem) {
        return currentItems.map((item) =>
          item.itemId === itemId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...currentItems,
        {
          itemId,
          quantity: 1,
          modifierIds: [],
          addedAt: Date.now(),
        },
      ];
    });
  }, []);

  const setQuantity = useCallback((itemId: string, quantity: number) => {
    setItems((currentItems) => {
      if (quantity <= 0) return currentItems.filter((item) => item.itemId !== itemId);

      return currentItems.map((item) =>
        item.itemId === itemId ? { ...item, quantity: Math.floor(quantity) } : item,
      );
    });
  }, []);

  const toggleModifier = useCallback((itemId: string, modifierId: string) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.itemId !== itemId) return item;

        const hasModifier = item.modifierIds.includes(modifierId);

        return {
          ...item,
          modifierIds: hasModifier
            ? item.modifierIds.filter((id) => id !== modifierId)
            : [...item.modifierIds, modifierId],
        };
      }),
    );
  }, []);

  const itemsById = useMemo(
    () =>
      items.reduce<Record<string, TableDraftItem>>((result, item) => {
        result[item.itemId] = item;
        return result;
      }, {}),
    [items],
  );

  const totalQuantity = useMemo(
    () => items.reduce((result, item) => result + item.quantity, 0),
    [items],
  );

  const controls = useMemo<TableDraftControls>(
    () => ({
      itemsById,
      addItem,
      setQuantity,
      toggleModifier,
    }),
    [addItem, itemsById, setQuantity, toggleModifier],
  );

  return {
    items,
    totalQuantity,
    controls,
    setQuantity,
  };
}
