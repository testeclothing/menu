import type { Experience, GuidedStep } from "./data/experiences";
import type { CategoryId, DishTag, ExperienceId, MenuCategory } from "./data/menu";

export type Language = "pt" | "en";

export const languageOptions: Record<
  Language,
  {
    shortLabel: string;
    label: string;
    action: string;
    description: string;
  }
> = {
  pt: {
    shortLabel: "PT",
    label: "Portugues",
    action: "Ver em portugues",
    description: "Menu completo com descricoes em portugues.",
  },
  en: {
    shortLabel: "EN",
    label: "English",
    action: "View in English",
    description: "Full menu with descriptions in English.",
  },
};

export const uiCopy = {
  en: {
    languageGate: {
      eyebrow: "Virtual Menu",
      title: "Choose your language",
      subtitle: "Begin the Confraria experience in the language you prefer.",
      previewLabel: "Signature sharing selection",
    },
    hero: {
      headingTitle: "Menu",
      copy: "Choose your path. We'll guide the experience.",
      signalsLabel: "Menu qualities",
      fresh: "Fresh daily",
      chef: "Chef's creations",
      share: "Made to share",
    },
    home: {
      experienceEyebrow: "Choose your experience",
      experienceTitle: "Start with a guided path",
      categoryEyebrow: "Explore by category",
      categoryTitle: "Find the right plate",
      seeAll: "See all",
      starters: "Starters",
      verificationTitle: "items need verification",
      verificationCopy:
        "These are kept visible internally so uncertain prices or descriptions are never treated as final.",
    },
    header: {
      languageLabel: "Language",
      openNavigation: "Open navigation",
      closeNavigation: "Close navigation",
      guidedPaths: "Guided paths",
      categories: "Categories",
    },
    detail: {
      backToMenu: "Virtual Menu",
      mood: "Mood",
      pairing: "Pairing",
      recommendedEyebrow: "Your recommended path",
      recommendedTitle: "A complete table flow",
      categoryTabsLabel: "Menu categories",
      tailTitle: "Not sure where this fits?",
      tailCopy: "Ask the team for the best starter, main selection and finish for your table.",
      tailButton: "Best for Sharing",
    },
    finish: {
      eyebrow: "Don't forget the finish",
      title: "Complete the experience",
      desserts: "Desserts",
      dessertsCopy: "Sweet finish",
      teas: "Teas & Sake",
      teasCopy: "Carefully selected harmonies",
      drinks: "Drinks & Digestifs",
      drinksCopy: "To enjoy your moment",
    },
    info: {
      qrLabel: "QR code placeholder",
      videoTitle: "See our dishes in video",
      videoCopy: "Scan the QR code with your phone.",
      askTitle: "Ask our team",
      askCopy: "We're here to recommend the perfect experience.",
    },
    dish: {
      verify: "Verify",
    },
    draft: {
      openButton: "My Table Note",
      eyebrow: "Show-to-Waiter List",
      title: "Your Selection",
      close: "Close selection",
      addItem: "Add",
      addedLabel: "Selected",
      selected: "Selected",
      noModifiers: "No modifiers",
      quantityLabel: "Quantity",
      decrease: "Decrease quantity",
      increase: "Increase quantity",
      modifiersLabel: "Modifiers / upgrades",
      emptyTitle: "No dishes selected yet",
      emptyCopy: "Add dishes from the menu and they will appear here.",
    },
    footer: {
      title: "Made to be shared.",
      copy: "Better together.",
    },
  },
  pt: {
    languageGate: {
      eyebrow: "Menu Virtual",
      title: "Escolha o idioma",
      subtitle: "Comece a experiencia Confraria no idioma que preferir.",
      previewLabel: "Selecao de assinatura para partilhar",
    },
    hero: {
      headingTitle: "Menu",
      copy: "Escolha o percurso. Nos guiamos a experiencia.",
      signalsLabel: "Qualidades do menu",
      fresh: "Fresco todos os dias",
      chef: "Criacoes do chef",
      share: "Feito para partilhar",
    },
    home: {
      experienceEyebrow: "Escolha a experiencia",
      experienceTitle: "Comece por um percurso guiado",
      categoryEyebrow: "Explorar por categoria",
      categoryTitle: "Encontre o prato ideal",
      seeAll: "Ver tudo",
      starters: "Entradas",
      verificationTitle: "itens precisam de confirmacao",
      verificationCopy:
        "Estes itens continuam visiveis internamente para que precos ou descricoes incertos nao sejam tratados como finais.",
    },
    header: {
      languageLabel: "Idioma",
      openNavigation: "Abrir navegacao",
      closeNavigation: "Fechar navegacao",
      guidedPaths: "Percursos guiados",
      categories: "Categorias",
    },
    detail: {
      backToMenu: "Menu Virtual",
      mood: "Ambiente",
      pairing: "Harmonizacao",
      recommendedEyebrow: "O seu percurso recomendado",
      recommendedTitle: "Uma experiencia completa a mesa",
      categoryTabsLabel: "Categorias do menu",
      tailTitle: "Nao tem a certeza onde isto encaixa?",
      tailCopy: "Pergunte a equipa qual a melhor entrada, selecao principal e final para a sua mesa.",
      tailButton: "Ideal para Partilhar",
    },
    finish: {
      eyebrow: "Nao esqueca o final",
      title: "Complete a experiencia",
      desserts: "Sobremesas",
      dessertsCopy: "Final doce",
      teas: "Chas & Sake",
      teasCopy: "Harmonias cuidadosamente escolhidas",
      drinks: "Bebidas & Digestivos",
      drinksCopy: "Para saborear o momento",
    },
    info: {
      qrLabel: "Codigo QR",
      videoTitle: "Veja os pratos em video",
      videoCopy: "Leia o QR code com o telemovel.",
      askTitle: "Fale com a equipa",
      askCopy: "Estamos aqui para recomendar a experiencia perfeita.",
    },
    dish: {
      verify: "Confirmar",
    },
    draft: {
      openButton: "A Minha Nota de Mesa",
      eyebrow: "Nota para o Empregado",
      title: "A sua Selecao",
      close: "Fechar selecao",
      addItem: "Adicionar",
      addedLabel: "Selecionado",
      selected: "Selecionado",
      noModifiers: "Sem modificadores",
      quantityLabel: "Quantidade",
      decrease: "Diminuir quantidade",
      increase: "Aumentar quantidade",
      modifiersLabel: "Modificadores / upgrades",
      emptyTitle: "Ainda nao selecionou pratos",
      emptyCopy: "Adicione pratos a partir do menu e eles aparecem aqui.",
    },
    footer: {
      title: "Feito para partilhar.",
      copy: "Melhor em conjunto.",
    },
  },
} as const;

type CategoryTranslation = Pick<MenuCategory, "navTitle" | "title" | "subtitle" | "experienceCue">;

const categoryTranslations: Record<CategoryId, CategoryTranslation> = {
  starters: {
    navTitle: "Entradas",
    title: "Entradas",
    subtitle: "Comece com textura, frescura e uma primeira escolha segura.",
    experienceCue: "Melhor primeiro passo",
  },
  "nikkei-ceviches": {
    navTitle: "Nikkei & Ceviches",
    title: "Nikkei & Ceviches",
    subtitle: "Citrinos, leite de tigre, especiarias e energia leve de verao.",
    experienceCue: "Fresco e leve",
  },
  "new-style": {
    navTitle: "Nigiri Premium",
    title: "New Style Confraria",
    subtitle: "Gunkans e nigiris de autor para uma segunda ronda premium.",
    experienceCue: "Momento upgrade",
  },
  "signature-sushi": {
    navTitle: "Sushi de Autor",
    title: "Originais Confraria",
    subtitle: "Sushi de fusao, rolls da casa e combinados que ancoram a refeicao.",
    experienceCue: "Mais partilhado",
  },
  "traditional-sushi": {
    navTitle: "Tradicional",
    title: "Sushi & Sashimi Tradicional",
    subtitle: "Cortes limpos, rolls classicos, sashimi e selecoes tradicionais.",
    experienceCue: "Sushi puro",
  },
  "hot-vegetarian": {
    navTitle: "Quentes & Veg",
    title: "Pratos Quentes & Vegetarianos",
    subtitle: "Pratos quentes, opcoes vegetarianas, saladas e tapas.",
    experienceCue: "Conforto quente",
  },
  finish: {
    navTitle: "Final",
    title: "Sobremesas, Chas & Digestivos",
    subtitle: "Um fecho suave: doce, quente ou um pequeno digestivo.",
    experienceCue: "Completar a refeicao",
  },
};

type StepTranslation = Pick<GuidedStep, "eyebrow" | "title" | "copy"> & {
  badge?: string;
};

type ExperienceTranslation = Pick<
  Experience,
  "title" | "shortTitle" | "label" | "subtitle" | "cardCopy" | "bestFor" | "guests" | "pairing" | "tags" | "finalNote"
> & {
  steps: StepTranslation[];
};

const experienceTranslations: Record<ExperienceId, ExperienceTranslation> = {
  "first-time": {
    title: "Primeira Vez na Confraria",
    shortTitle: "Primeira vez",
    label: "Descobrir",
    subtitle: "Uma introducao segura ao estilo da casa.",
    cardCopy: "Favoritos da equipa para a primeira visita.",
    bestFor: "Primeira visita",
    guests: "1-3 pessoas",
    pairing: "Escolhas faceis",
    tags: ["Favoritos da casa", "Equilibrado", "Sem risco"],
    steps: [
      {
        eyebrow: "Comecar",
        title: "Comece com uma mordida fresca e uma textura crocante.",
        copy: "Isto cria contraste logo no inicio: citrinos, salmao, crocancia e uma entrada suave no lado Nikkei do menu.",
      },
      {
        eyebrow: "Escolher",
        title: "Ancore a refeicao com uma selecao da casa.",
        copy: "Escolha um combinado compacto para partilhar ou um roll de assinatura se quiser manter tudo simples.",
        badge: "Mais familiar",
      },
      {
        eyebrow: "Adicionar",
        title: "Junte um nigiri de autor se quiser uma nota premium.",
        copy: "Uma unica peca pode tornar a refeicao mais especial sem transformar tudo num menu de degustacao longo.",
      },
      {
        eyebrow: "Finalizar",
        title: "Termine leve ou classico.",
        copy: "O gelado de cha verde mantem a frescura. O fondant e o final classico de conforto.",
      },
    ],
    finalNote: "Perfeito se quiser conhecer o estilo da casa sem pensar demasiado no menu completo.",
  },
  sharing: {
    title: "Ideal para Partilhar",
    shortTitle: "Para partilhar",
    label: "Mais popular",
    subtitle: "Um percurso equilibrado para duas a quatro pessoas.",
    cardCopy: "A melhor forma de desfrutar em conjunto.",
    bestFor: "2-4 pessoas",
    guests: "2-4 pessoas",
    pairing: "Acompanhe com sake",
    tags: ["Mais escolhido", "Para partilhar", "Equilibrado"],
    steps: [
      {
        eyebrow: "Comecar",
        title: "Comece com uma entrada fresca e um prato crocante.",
        copy: "Abra a experiencia com sabor e textura antes da selecao maior de sushi chegar a mesa.",
      },
      {
        eyebrow: "Escolher",
        title: "Escolha o combinado central para partilhar.",
        copy: "O Combo Confraria II e a ancora natural para duas a quatro pessoas: variedade suficiente sem obrigar a demasiadas decisoes.",
        badge: "Mais escolhido",
      },
      {
        eyebrow: "Adicionar",
        title: "Junte uma selecao premium de nigiri ou gunkan.",
        copy: "Posicione as pecas premium como uma segunda ronda, nao como concorrencia do combinado.",
        badge: "Upgrade",
      },
      {
        eyebrow: "Finalizar",
        title: "Termine com sobremesa para partilhar ou cha.",
        copy: "Um pequeno final completa a refeicao e oferece a mesa mais um momento para partilhar.",
      },
    ],
    finalNote: "Perfeito se quiser variedade sem transformar o jantar numa folha de decisoes.",
  },
  "chef-experience": {
    title: "Experiencia do Chef",
    shortTitle: "Experiencia do Chef",
    label: "Escolha do chef",
    subtitle: "Para clientes que procuram o percurso premium.",
    cardCopy: "Para quem quer a experiencia completa.",
    bestFor: "Clientes curiosos",
    guests: "2+ pessoas",
    pairing: "Cortes premium",
    tags: ["Escolha do chef", "Premium", "Segunda ronda"],
    steps: [
      {
        eyebrow: "Abrir",
        title: "Comece com um prato fresco premium.",
        copy: "Use vieira, atum ou usuzukuri para definir o tom antes das pecas mais ricas.",
      },
      {
        eyebrow: "Provar",
        title: "Deixe a selecao do chef conduzir o meio.",
        copy: "As colecoes reduzem o esforco de escolha e fazem o menu parecer mais curado.",
        badge: "Rota do chef",
      },
      {
        eyebrow: "Elevar",
        title: "Escolha uma peca premium memoravel.",
        copy: "Lavagante, carabineiro ou foie gras transformam a refeicao num momento de degustacao.",
      },
      {
        eyebrow: "Fechar",
        title: "Feche com sashimi ou um cha tranquilo.",
        copy: "Se a mesa ainda quiser mais, o sashimi e limpo. Se nao, o Genmaicha fecha com elegancia.",
      },
    ],
    finalNote: "Ideal quando a mesa quer a versao conduzida pelo chef, nao apenas mais pecas.",
  },
  summer: {
    title: "Fresco & Verao",
    shortTitle: "Fresco & Verao",
    label: "Leve e fresco",
    subtitle: "Leve, citrico e perfeito para dias quentes.",
    cardCopy: "Leve, fresco e cheio de sabor.",
    bestFor: "Dias quentes",
    guests: "1-2 pessoas",
    pairing: "Cha gelado",
    tags: ["Fresco", "Citrico", "Mais leve"],
    steps: [
      {
        eyebrow: "Fresco",
        title: "Comece com ceviche ou tiradito.",
        copy: "Os citrinos e o peixe frio tornam o menu mais facil de interpretar para clientes internacionais.",
      },
      {
        eyebrow: "Roll",
        title: "Escolha um roll de sushi mais leve.",
        copy: "Yuzu, abacate e salmao mantem o percurso vivo em vez de pesado.",
      },
      {
        eyebrow: "Adicionar",
        title: "Junte uma peca premium fria ou citrica.",
        copy: "Um nigiri premium da ao percurso um pequeno destaque sem quebrar o mood fresco.",
      },
      {
        eyebrow: "Finalizar",
        title: "Termine frio e limpo.",
        copy: "Gelado de cha verde ou cha gelado de hibisco mantem toda a experiencia em modo verao.",
      },
    ],
    finalNote: "Ideal para almocos, noites quentes ou clientes que querem sabor sem peso.",
  },
};

const tagLabels: Record<Language, Record<DishTag, string>> = {
  en: {
    classic: "Classic",
    new: "New",
    fresh: "Fresh",
    crispy: "Crispy",
    chef_pick: "Chef's pick",
    most_chosen: "Most chosen",
    to_share: "Great to share",
    premium: "Premium",
    summer: "Summer",
    vegetarian: "Vegetarian",
    hot: "Hot",
    dessert: "Dessert",
    tea: "Tea",
    digestif: "Digestif",
    needs_verification: "Verify",
  },
  pt: {
    classic: "Classico",
    new: "Novo",
    fresh: "Fresco",
    crispy: "Crocante",
    chef_pick: "Escolha do chef",
    most_chosen: "Mais escolhido",
    to_share: "Para partilhar",
    premium: "Premium",
    summer: "Verao",
    vegetarian: "Vegetariano",
    hot: "Quente",
    dessert: "Sobremesa",
    tea: "Cha",
    digestif: "Digestivo",
    needs_verification: "Confirmar",
  },
};

export function localizeCategory(category: MenuCategory, language: Language): MenuCategory {
  if (language === "en") return category;

  return {
    ...category,
    ...categoryTranslations[category.id],
  };
}

export function localizeExperience(experience: Experience, language: Language): Experience {
  if (language === "en") return experience;

  const translation = experienceTranslations[experience.id];

  return {
    ...experience,
    ...translation,
    steps: experience.steps.map((step, index) => {
      const translatedStep = translation.steps[index];

      return {
        ...step,
        ...translatedStep,
        badge: translatedStep && "badge" in translatedStep ? translatedStep.badge : step.badge,
      };
    }),
  };
}

export function getTagLabel(tag: DishTag, language: Language) {
  return tagLabels[language][tag];
}
