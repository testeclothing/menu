# Confraria Sushi Guided Menu

Mobile-first virtual menu for Confraria Sushi. It is designed as a guided in-restaurant menu, not an ordering flow: no cart, no checkout, no add-to-cart actions.

## Run

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Edit Menu Data

- Dishes, prices, categories and verification flags: `src/data/menu.ts`
- Guided experiences and recommended paths: `src/data/experiences.ts`
- UI components: `src/components/`

The interface is English-first while preserving original Portuguese/Japanese dish names.

## Generate Dish Images

The optional image script follows the official OpenAI image generation docs:

- https://developers.openai.com/api/docs/guides/image-generation
- https://developers.openai.com/api/docs/models/gpt-image-2

It uses `process.env.OPENAI_API_KEY` and does not hardcode secrets.

```bash
npm run generate:images -- --dry-run
npm run generate:images -- --limit=6
npm run generate:images -- --category=starters --limit=8
```

Output is saved to `public/menu/dishes/` with metadata in `public/menu/dish-image-metadata.json`.

## Needs Verification

These entries were readable enough to structure but should be confirmed before going live:

- Cone Crocante price, because the physical menu and old website screenshot appear to differ.
- Carpaccio Gambas description.
- Chutoro Caviar price.
- Tempura shrimp count.
- Nihon Baré count/composition.
- Salada Confraria full description.
