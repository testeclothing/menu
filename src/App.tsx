import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Coffee, Leaf, Star, Users } from "lucide-react";
import { AskTeamBlock } from "./components/AskTeamBlock";
import { CategoryCard } from "./components/CategoryCard";
import { DishCard } from "./components/DishCard";
import { DishVisual } from "./components/DishVisual";
import { ExperienceCard } from "./components/ExperienceCard";
import { FinishSection } from "./components/FinishSection";
import { GuidedPath } from "./components/GuidedPath";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { QRVideoBlock } from "./components/QRVideoBlock";
import { SectionHeader } from "./components/SectionHeader";
import { TableDraftDrawer } from "./components/TableDraftDrawer";
import { experienceById, experiences } from "./data/experiences";
import {
  type CategoryId,
  type ExperienceId,
  categories,
  categoryById,
  itemById,
  itemsByCategory,
  verificationItems,
} from "./data/menu";
import {
  languageOptions,
  localizeCategory,
  localizeExperience,
  uiCopy,
  type Language,
} from "./i18n";
import { type TableDraftControls, useTableDraft } from "./tableDraft";

type View =
  | { name: "home" }
  | { name: "experience"; id: ExperienceId }
  | { name: "category"; id: CategoryId };

type RouteState = {
  language: Language | null;
  view: View;
};

const defaultView: View = { name: "home" };

function isLanguage(value?: string): value is Language {
  return value === "pt" || value === "en";
}

function parseView(parts: string[]): View {
  const [type, id] = parts;

  if (type === "experience" && experienceById(id as ExperienceId)) {
    return { name: "experience", id: id as ExperienceId };
  }

  if (type === "category" && categoryById(id as CategoryId)) {
    return { name: "category", id: id as CategoryId };
  }

  return defaultView;
}

function parseHash(): RouteState {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const parts = raw.split("/").filter(Boolean);

  if (parts.length === 0) {
    return { language: null, view: defaultView };
  }

  const [firstPart, ...rest] = parts;

  if (isLanguage(firstPart)) {
    return { language: firstPart, view: parseView(rest) };
  }

  return { language: "en", view: parseView(parts) };
}

function pathFor(view: View, language: Language) {
  if (view.name === "experience") return `#/${language}/experience/${view.id}`;
  if (view.name === "category") return `#/${language}/category/${view.id}`;
  return `#/${language}`;
}

function useHashRoute() {
  const [route, setRoute] = useState<RouteState>(() => parseHash());

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash());
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    };

    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const navigate = (nextView: View) => {
    window.location.hash = pathFor(nextView, route.language ?? "en");
  };

  const selectLanguage = (nextLanguage: Language) => {
    window.location.hash = pathFor(defaultView, nextLanguage);
  };

  const changeLanguage = (nextLanguage: Language) => {
    window.location.hash = pathFor(route.view, nextLanguage);
  };

  return { route, navigate, selectLanguage, changeLanguage };
}

function LanguageGate({ onSelect }: { onSelect: (language: Language) => void }) {
  const previewItem = itemById("combo-confraria-ii") ?? itemById("usuzukuri-salmao");
  const t = uiCopy.en.languageGate;

  return (
    <main className="language-gate" aria-labelledby="language-gate-title">
      <div className="language-gate__content">
        <div className="language-gate__logo" aria-label="Confraria Sushi">
          <span className="language-gate__mark" aria-hidden="true" />
          <span>
            <strong>Confraria</strong>
            <small>Sushi</small>
          </span>
        </div>

        <span className="eyebrow">{t.eyebrow}</span>
        <h1 id="language-gate-title">{t.title}</h1>
        <p>{t.subtitle}</p>

        <div className="language-actions" aria-label="Choose menu language">
          {(["pt", "en"] as const).map((language) => {
            const option = languageOptions[language];

            return (
              <button
                className="language-card"
                key={language}
                type="button"
                onClick={() => onSelect(language)}
              >
                <span>{option.shortLabel}</span>
                <strong>{option.action}</strong>
                <small>{option.description}</small>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="language-gate__preview">
        <DishVisual item={previewItem} theme="platter" label="Combo Confraria II" />
        <span>{t.previewLabel}</span>
      </div>
    </main>
  );
}

function HomePage({
  language,
  navigate,
}: {
  language: Language;
  navigate: (view: View) => void;
}) {
  const starterCategory = categories.find((category) => category.id === "starters");
  const t = uiCopy[language].home;

  return (
    <>
      <Hero language={language} />

      <main className="page-flow">
        <section>
          <SectionHeader
            eyebrow={t.experienceEyebrow}
            title={t.experienceTitle}
            actionLabel={t.seeAll}
            onAction={() => navigate({ name: "experience", id: "sharing" })}
          />
          <div className="experience-scroll">
            {experiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                language={language}
                onOpen={() => navigate({ name: "experience", id: experience.id })}
              />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow={t.categoryEyebrow}
            title={t.categoryTitle}
            actionLabel={t.starters}
            onAction={() => starterCategory && navigate({ name: "category", id: starterCategory.id })}
          />
          <div className="category-grid">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                language={language}
                onOpen={() => navigate({ name: "category", id: category.id })}
              />
            ))}
          </div>
        </section>

        <FinishSection language={language} onOpenFinish={() => navigate({ name: "category", id: "finish" })} />

        <div className="info-grid">
          <QRVideoBlock language={language} />
          <AskTeamBlock language={language} />
        </div>

        {verificationItems.length > 0 ? (
          <section className="verification-strip">
            <strong>
              {verificationItems.length} {t.verificationTitle}
            </strong>
            <p>{t.verificationCopy}</p>
          </section>
        ) : null}
      </main>
    </>
  );
}

function ExperiencePage({
  id,
  language,
  draftControls,
  navigate,
}: {
  id: ExperienceId;
  language: Language;
  draftControls: TableDraftControls;
  navigate: (view: View) => void;
}) {
  const experience = localizeExperience(experienceById(id) ?? experiences[0], language);
  const heroItem = itemById(experience.recommendedPath[0]);
  const recommendedItems = experience.recommendedPath
    .map((itemId) => itemById(itemId))
    .filter(Boolean);
  const t = uiCopy[language].detail;

  const stats = [
    { icon: Users, label: experience.bestFor, value: experience.guests },
    { icon: Star, label: t.mood, value: experience.tags[0] },
    { icon: Coffee, label: t.pairing, value: experience.pairing },
  ];

  return (
    <main className="detail-page">
      <button className="back-button" type="button" onClick={() => navigate({ name: "home" })}>
        <ArrowLeft size={18} aria-hidden="true" />
        {t.backToMenu}
      </button>

      <section className="detail-hero">
        <div>
          <span className="eyebrow">{experience.label}</span>
          <h1>{experience.title}</h1>
          <p>{experience.subtitle}</p>
        </div>
        <DishVisual
          className="detail-hero__visual"
          item={heroItem}
          theme={experience.heroTheme}
          label={experience.title}
        />
      </section>

      <div className="stat-row">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div className="stat" key={stat.label}>
              <Icon size={24} aria-hidden="true" />
              <span>{stat.label}</span>
              <b>{stat.value}</b>
            </div>
          );
        })}
      </div>

      <GuidedPath steps={experience.steps} language={language} draftControls={draftControls} />

      <section className="recommended-path">
        <SectionHeader
          eyebrow={t.recommendedEyebrow}
          title={t.recommendedTitle}
        />
        <div className="path-strip">
          {recommendedItems.map((item, index) =>
            item ? (
              <div className="path-item" key={item.id}>
                <DishCard item={item} compact language={language} draftControls={draftControls} />
                {index < recommendedItems.length - 1 ? <span className="path-plus">+</span> : null}
              </div>
            ) : null,
          )}
        </div>
        <p className="closing-note">{experience.finalNote}</p>
      </section>
    </main>
  );
}

function CategoryPage({
  id,
  language,
  draftControls,
  navigate,
}: {
  id: CategoryId;
  language: Language;
  draftControls: TableDraftControls;
  navigate: (view: View) => void;
}) {
  const category = localizeCategory(categoryById(id) ?? categories[0], language);
  const items = useMemo(() => itemsByCategory(category.id), [category.id]);
  const heroItem = items.find((item) => item.tags.includes("chef_pick")) ?? items[0];
  const t = uiCopy[language].detail;

  return (
    <main className="detail-page">
      <button className="back-button" type="button" onClick={() => navigate({ name: "home" })}>
        <ArrowLeft size={18} aria-hidden="true" />
        {t.backToMenu}
      </button>

      <section className="category-hero">
        <div>
          <span className="eyebrow">{category.experienceCue}</span>
          <h1>{category.title}</h1>
          <p>{category.subtitle}</p>
        </div>
        <DishVisual item={heroItem} theme={category.imageTheme} className="category-hero__visual" />
      </section>

      <nav className="category-tabs" aria-label={t.categoryTabsLabel}>
        {categories.map((categoryItem) => {
          const localizedCategory = localizeCategory(categoryItem, language);

          return (
            <button
              key={categoryItem.id}
              className={categoryItem.id === category.id ? "is-active" : ""}
              type="button"
              onClick={() => navigate({ name: "category", id: categoryItem.id })}
            >
              {localizedCategory.navTitle}
            </button>
          );
        })}
      </nav>

      <section className="dish-list">
        {items.map((item) => (
          <DishCard key={item.id} item={item} language={language} draftControls={draftControls} />
        ))}
      </section>

      <div className="category-tail">
        <div>
          <Leaf size={24} aria-hidden="true" />
          <h2>{t.tailTitle}</h2>
          <p>{t.tailCopy}</p>
        </div>
        <button type="button" onClick={() => navigate({ name: "experience", id: "sharing" })}>
          {t.tailButton}
        </button>
      </div>
    </main>
  );
}

export default function App() {
  const { route, navigate, selectLanguage, changeLanguage } = useHashRoute();
  const { language, view } = route;
  const tableDraft = useTableDraft();

  useEffect(() => {
    document.documentElement.lang = language ?? "en";
  }, [language]);

  if (!language) {
    return (
      <div className="app-shell app-shell--gate">
        <LanguageGate onSelect={selectLanguage} />
      </div>
    );
  }

  const t = uiCopy[language].footer;
  const navHome = () => navigate({ name: "home" });
  const navCategory = (id: string) => navigate({ name: "category", id: id as CategoryId });
  const navExperience = (id: string) => navigate({ name: "experience", id: id as ExperienceId });

  return (
    <div className="app-shell">
      <Header
        language={language}
        onHome={navHome}
        onCategory={navCategory}
        onExperience={navExperience}
        onLanguageChange={changeLanguage}
      />
      {view.name === "home" ? <HomePage language={language} navigate={navigate} /> : null}
      {view.name === "experience" ? (
        <ExperiencePage
          id={view.id}
          language={language}
          draftControls={tableDraft.controls}
          navigate={navigate}
        />
      ) : null}
      {view.name === "category" ? (
        <CategoryPage
          id={view.id}
          language={language}
          draftControls={tableDraft.controls}
          navigate={navigate}
        />
      ) : null}
      <TableDraftDrawer
        language={language}
        draftItems={tableDraft.items}
        totalQuantity={tableDraft.totalQuantity}
        onSetQuantity={tableDraft.setQuantity}
        onToggleModifier={tableDraft.controls.toggleModifier}
      />
      <footer className="site-footer">
        <span />
        <p>
          <b>{t.title}</b>
          {t.copy}
        </p>
        <span />
      </footer>
    </div>
  );
}
