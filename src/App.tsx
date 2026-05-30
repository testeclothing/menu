import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Coffee, Leaf, Star, Users } from "lucide-react";
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

type View =
  | { name: "home" }
  | { name: "experience"; id: ExperienceId }
  | { name: "category"; id: CategoryId };

const defaultView: View = { name: "home" };

function parseHash(): View {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const [type, id] = raw.split("/");

  if (type === "experience" && experienceById(id as ExperienceId)) {
    return { name: "experience", id: id as ExperienceId };
  }

  if (type === "category" && categoryById(id as CategoryId)) {
    return { name: "category", id: id as CategoryId };
  }

  return defaultView;
}

function pathFor(view: View) {
  if (view.name === "experience") return `#/experience/${view.id}`;
  if (view.name === "category") return `#/category/${view.id}`;
  return "#/";
}

function useHashView() {
  const [view, setView] = useState<View>(() => parseHash());

  useEffect(() => {
    const onChange = () => {
      setView(parseHash());
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    };

    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const navigate = (nextView: View) => {
    window.location.hash = pathFor(nextView);
  };

  return { view, navigate };
}

function HomePage({ navigate }: { navigate: (view: View) => void }) {
  const starterCategory = categories.find((category) => category.id === "starters");

  return (
    <>
      <Hero />

      <main className="page-flow">
        <section>
          <SectionHeader
            eyebrow="Choose your experience"
            title="Start with a guided path"
            actionLabel="See all"
            onAction={() => navigate({ name: "experience", id: "sharing" })}
          />
          <div className="experience-scroll">
            {experiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                onOpen={() => navigate({ name: "experience", id: experience.id })}
              />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Explore by category"
            title="Find the right plate"
            actionLabel="Starters"
            onAction={() => starterCategory && navigate({ name: "category", id: starterCategory.id })}
          />
          <div className="category-grid">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onOpen={() => navigate({ name: "category", id: category.id })}
              />
            ))}
          </div>
        </section>

        <FinishSection onOpenFinish={() => navigate({ name: "category", id: "finish" })} />

        <div className="info-grid">
          <QRVideoBlock />
          <AskTeamBlock />
        </div>

        {verificationItems.length > 0 ? (
          <section className="verification-strip">
            <strong>{verificationItems.length} items need verification</strong>
            <p>These are kept visible internally so uncertain prices or descriptions are never treated as final.</p>
          </section>
        ) : null}
      </main>
    </>
  );
}

function ExperiencePage({
  id,
  navigate,
}: {
  id: ExperienceId;
  navigate: (view: View) => void;
}) {
  const experience = experienceById(id) ?? experiences[0];
  const heroItem = itemById(experience.recommendedPath[0]);
  const recommendedItems = experience.recommendedPath
    .map((itemId) => itemById(itemId))
    .filter(Boolean);

  const stats = [
    { icon: Users, label: experience.bestFor, value: experience.guests },
    { icon: Star, label: "Mood", value: experience.tags[0] },
    { icon: Coffee, label: "Pairing", value: experience.pairing },
  ];

  return (
    <main className="detail-page">
      <button className="back-button" type="button" onClick={() => navigate({ name: "home" })}>
        <ArrowLeft size={18} aria-hidden="true" />
        Virtual Menu
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

      <GuidedPath steps={experience.steps} />

      <section className="recommended-path">
        <SectionHeader
          eyebrow="Your recommended path"
          title="A complete table flow"
        />
        <div className="path-strip">
          {recommendedItems.map((item, index) =>
            item ? (
              <div className="path-item" key={item.id}>
                <DishCard item={item} compact />
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
  navigate,
}: {
  id: CategoryId;
  navigate: (view: View) => void;
}) {
  const category = categoryById(id) ?? categories[0];
  const items = useMemo(() => itemsByCategory(category.id), [category.id]);
  const heroItem = items.find((item) => item.tags.includes("chef_pick")) ?? items[0];

  return (
    <main className="detail-page">
      <button className="back-button" type="button" onClick={() => navigate({ name: "home" })}>
        <ArrowLeft size={18} aria-hidden="true" />
        Virtual Menu
      </button>

      <section className="category-hero">
        <div>
          <span className="eyebrow">{category.experienceCue}</span>
          <h1>{category.title}</h1>
          <p>{category.subtitle}</p>
        </div>
        <DishVisual item={heroItem} theme={category.imageTheme} className="category-hero__visual" />
      </section>

      <nav className="category-tabs" aria-label="Menu categories">
        {categories.map((categoryItem) => (
          <button
            key={categoryItem.id}
            className={categoryItem.id === category.id ? "is-active" : ""}
            type="button"
            onClick={() => navigate({ name: "category", id: categoryItem.id })}
          >
            {categoryItem.navTitle}
          </button>
        ))}
      </nav>

      <section className="dish-list">
        {items.map((item) => (
          <DishCard key={item.id} item={item} />
        ))}
      </section>

      <div className="category-tail">
        <div>
          <Leaf size={24} aria-hidden="true" />
          <h2>Not sure where this fits?</h2>
          <p>Ask the team for the best starter, main selection and finish for your table.</p>
        </div>
        <button type="button" onClick={() => navigate({ name: "experience", id: "sharing" })}>
          Best for Sharing
        </button>
      </div>
    </main>
  );
}

export default function App() {
  const { view, navigate } = useHashView();

  const navHome = () => navigate({ name: "home" });
  const navCategory = (id: string) => navigate({ name: "category", id: id as CategoryId });
  const navExperience = (id: string) => navigate({ name: "experience", id: id as ExperienceId });

  return (
    <div className="app-shell">
      <Header onHome={navHome} onCategory={navCategory} onExperience={navExperience} />
      {view.name === "home" ? <HomePage navigate={navigate} /> : null}
      {view.name === "experience" ? <ExperiencePage id={view.id} navigate={navigate} /> : null}
      {view.name === "category" ? <CategoryPage id={view.id} navigate={navigate} /> : null}
      <footer className="site-footer">
        <span />
        <p>
          <b>Made to be shared.</b>
          Better together.
        </p>
        <span />
      </footer>
    </div>
  );
}
