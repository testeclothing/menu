import type { ExperienceId } from "./menu";

export interface GuidedStep {
  eyebrow: string;
  title: string;
  copy: string;
  dishIds: string[];
  badge?: string;
}

export interface Experience {
  id: ExperienceId;
  title: string;
  shortTitle: string;
  label: string;
  subtitle: string;
  cardCopy: string;
  bestFor: string;
  guests: string;
  pairing: string;
  heroTheme: string;
  tags: string[];
  steps: GuidedStep[];
  recommendedPath: string[];
  finalNote: string;
}

export const experiences: Experience[] = [
  {
    id: "first-time",
    title: "First Time at Confraria",
    shortTitle: "First time",
    label: "Discover",
    subtitle: "A confident introduction to the house style.",
    cardCopy: "Our team's favourites for your first visit.",
    bestFor: "First visit",
    guests: "1-3 guests",
    pairing: "Easy choices",
    heroTheme: "signature",
    tags: ["House favourites", "Balanced", "Low risk"],
    steps: [
      {
        eyebrow: "Start",
        title: "Begin with one fresh bite and one crispy texture.",
        copy: "This gives contrast immediately: citrus, salmon, crunch and a gentle entry into the Nikkei side of the menu.",
        dishIds: ["taquito-salmao", "hot-philadelphia"],
      },
      {
        eyebrow: "Choose",
        title: "Anchor the meal with a house selection.",
        copy: "Choose a compact sharing combo or one signature roll if you want to keep it simple.",
        dishIds: ["combo-confraria-i", "ebi-shake", "aburi-shake"],
        badge: "Most familiar",
      },
      {
        eyebrow: "Add",
        title: "Add one chef-style nigiri if you want a premium note.",
        copy: "A single piece can make the meal feel more special without turning it into a long tasting menu.",
        dishIds: ["nigiri-shake-jo", "gunkan-amarillo"],
      },
      {
        eyebrow: "Finish",
        title: "End light or classic.",
        copy: "Green tea ice cream keeps it fresh. Fondant is the classic comfort finish.",
        dishIds: ["gelado-cha-verde", "fondant-chocolate"],
      },
    ],
    recommendedPath: [
      "taquito-salmao",
      "combo-confraria-i",
      "nigiri-shake-jo",
      "gelado-cha-verde",
    ],
    finalNote: "Perfect if you want the restaurant's style without overthinking the full menu.",
  },
  {
    id: "sharing",
    title: "Best for Sharing",
    shortTitle: "Best for Sharing",
    label: "Most popular",
    subtitle: "A balanced path for two to four guests.",
    cardCopy: "The best way to enjoy together.",
    bestFor: "2-4 guests",
    guests: "2-4 guests",
    pairing: "Pair with sake",
    heroTheme: "platter",
    tags: ["Most chosen", "Great to share", "Balanced"],
    steps: [
      {
        eyebrow: "Start",
        title: "Start with one fresh starter and one crispy dish.",
        copy: "Open the experience with flavor and texture before the larger sushi selection arrives.",
        dishIds: ["tartaro-salmao", "inka-gyozas"],
      },
      {
        eyebrow: "Choose",
        title: "Choose the central sharing platter.",
        copy: "Combo Confraria II is the natural anchor for two to four guests: enough variety without forcing decisions.",
        dishIds: ["combo-confraria-ii"],
        badge: "Most chosen",
      },
      {
        eyebrow: "Add",
        title: "Add one premium nigiri or gunkan selection.",
        copy: "Position premium pieces as a second round, not as competition with the combo.",
        dishIds: ["nigiri-collection", "gunkan-lavagante-trufado"],
        badge: "Upgrade",
      },
      {
        eyebrow: "Finish",
        title: "Finish with dessert to share or tea.",
        copy: "A small finish makes the meal feel complete and gives the table one more shared moment.",
        dishIds: ["tarte-tatin", "cha-japones-genmaicha"],
      },
    ],
    recommendedPath: [
      "tartaro-salmao",
      "combo-confraria-ii",
      "nigiri-collection",
      "cha-japones-genmaicha",
    ],
    finalNote: "Perfect if you want variety without turning dinner into a decision spreadsheet.",
  },
  {
    id: "chef-experience",
    title: "Chef's Experience",
    shortTitle: "Chef's Experience",
    label: "Chef's choice",
    subtitle: "For guests who want the premium route.",
    cardCopy: "For those who want the full experience.",
    bestFor: "Curious guests",
    guests: "2+ guests",
    pairing: "Premium cuts",
    heroTheme: "premium",
    tags: ["Chef's pick", "Premium", "Second round"],
    steps: [
      {
        eyebrow: "Open",
        title: "Start with a premium fresh plate.",
        copy: "Use scallop, tuna or usuzukuri to set the tone before richer pieces.",
        dishIds: ["carpaccio-vieira", "usuzukuri-salmao"],
      },
      {
        eyebrow: "Taste",
        title: "Let the chef selection carry the middle.",
        copy: "Collections reduce decision fatigue and make the menu feel curated.",
        dishIds: ["gunkan-collection", "nigiri-collection"],
        badge: "Chef's route",
      },
      {
        eyebrow: "Upgrade",
        title: "Choose one memorable premium piece.",
        copy: "Lobster, carabineiro or foie gras turns the meal into a tasting moment.",
        dishIds: [
          "gunkan-lavagante-trufado",
          "nigiri-carabineiro",
          "nigiri-tuna-foie-gras",
        ],
      },
      {
        eyebrow: "Close",
        title: "Close with sashimi or a quiet tea.",
        copy: "If the table still wants more, sashimi is clean. If not, Genmaicha keeps the close elegant.",
        dishIds: ["sashimi-moriwase", "cha-japones-genmaicha"],
      },
    ],
    recommendedPath: [
      "carpaccio-vieira",
      "gunkan-collection",
      "gunkan-lavagante-trufado",
      "cha-japones-genmaicha",
    ],
    finalNote: "Best when the table wants the chef-led version of Confraria, not just more pieces.",
  },
  {
    id: "summer",
    title: "Fresh & Summer",
    shortTitle: "Fresh & Summer",
    label: "Light & fresh",
    subtitle: "Light, citrusy and perfect for warm days.",
    cardCopy: "Light, fresh and full of flavor.",
    bestFor: "Warm days",
    guests: "1-2 guests",
    pairing: "Iced tea",
    heroTheme: "salmon",
    tags: ["Fresh", "Citrus", "Lighter"],
    steps: [
      {
        eyebrow: "Fresh",
        title: "Start with ceviche or tiradito.",
        copy: "Citrus and cold seafood make the menu easier for international guests to understand.",
        dishIds: ["ceviche-limeno", "tiradito-salmao-passion"],
      },
      {
        eyebrow: "Roll",
        title: "Choose a lighter sushi roll.",
        copy: "Yuzu, avocado and salmon keep the path bright instead of heavy.",
        dishIds: ["uramaki-2-salmons", "uramaki-acevichado"],
      },
      {
        eyebrow: "Add",
        title: "Add one chilled or citrus-forward premium piece.",
        copy: "A premium nigiri gives the path a small highlight without breaking the fresh mood.",
        dishIds: ["nigiri-lagostim", "nigiri-chulpe"],
      },
      {
        eyebrow: "Finish",
        title: "Finish cold and clean.",
        copy: "Green tea ice cream or iced hibiscus tea keeps the whole experience in summer mode.",
        dishIds: ["gelado-cha-verde", "cha-gelado-hibisco"],
      },
    ],
    recommendedPath: [
      "ceviche-limeno",
      "uramaki-2-salmons",
      "nigiri-lagostim",
      "gelado-cha-verde",
    ],
    finalNote: "Best for lunch, hot evenings or guests who want flavor without heaviness.",
  },
];

export const experienceById = (id: ExperienceId) =>
  experiences.find((experience) => experience.id === id);
