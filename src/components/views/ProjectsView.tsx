import { useEffect, useRef } from "react";
import { useLang } from "@/contexts/LangContext";

const projects = [
  {
    num: "01",
    date: "2024 Q1–Q2",
    titlePL: "Audyt niezawodności LLM",
    titleEN: "LLM Reliability Audit",
    tags: ["LLM evaluation", "Prompt engineering", "Benchmarking"],
    descPL: "Kwantyfikacja leniwych odpowiedzi i halucynacji w DeepSeek-V3, GPT-4o, Claude 3.5 Sonnet i Llama 3.1 70B. 120 strukturalnych promptów, cztery kategorie, odtwarzalna metodologia.",
    descEN: "Quantifying lazy responses and hallucinations across DeepSeek-V3, GPT-4o, Claude 3.5 Sonnet and Llama 3.1 70B. 120 structured prompts, four categories, reproducible methodology.",
    resultPL: "32-stronicowy raport. DeepSeek-V3 wybrany jako główny model. Leniwe odpowiedzi zredukowane o 40%.",
    resultEN: "32-page internal report. DeepSeek-V3 selected as primary model. Lazy-response incidence reduced by 40%.",
  },
  {
    num: "02",
    date: "2023 Q3–2024 Q4",
    titlePL: "Magnificent 7 — analiza gigantów tech",
    titleEN: "Magnificent 7 — Tech Giants Analysis",
    tags: ["Market analysis", "Sentiment analysis", "FinBERT"],
    descPL: "Analiza spółka po spółce: Apple, Microsoft, Alphabet, Amazon, Nvidia, Meta i Tesla. Kwartalne wyniki, segmenty przychodów, sentyment FinBERT.",
    descEN: "Company-by-company analysis of Apple, Microsoft, Alphabet, Amazon, Nvidia, Meta and Tesla. Quarterly earnings, segment revenue, FinBERT sentiment on earnings calls.",
    resultPL: "Seria briefów analitycznych przez sześć miesięcy. Przyjęta jako referencja przez kolektyw badawczy.",
    resultEN: "Six-month series of analytical briefs. Adopted as reference by a research collective.",
  },
  {
    num: "03",
    date: "2024 Q2–Q3",
    titlePL: "Porównanie wrapperów AI",
    titleEN: "AI Wrapper Comparison",
    tags: ["UX evaluation", "Local inference", "Tooling"],
    descPL: "30-dniowy test porównawczy TypingMind, Msty Studio i Cherry-AI. Identyczne zestawy promptów, te same endpointy API.",
    descEN: "30-day comparative test of TypingMind, Msty Studio and Cherry-AI. Identical prompt sets, same API endpoints.",
    resultPL: "Matryca porównawcza funkcja × platforma. Msty Studio do codziennej pracy, TypingMind do pracy z klientami.",
    resultEN: "Feature × platform comparison matrix. Msty Studio for daily use, TypingMind for client work.",
  },
  {
    num: "04",
    date: "2024 Q1–Q3",
    titlePL: "Pipeline weryfikacji OSINT",
    titleEN: "OSINT Verification Pipeline",
    tags: ["OSINT", "Fact-checking", "Automation"],
    descPL: "Trzystopniowy pipeline: ekstrakcja twierdzeń → śledzenie źródła → klasyfikacja werdyktu. Python, web scraping, SEC EDGAR, Wayback Machine.",
    descEN: "Three-stage pipeline: claim extraction → source tracing → verdict classification. Python, web scraping, SEC EDGAR, Wayback Machine.",
    resultPL: "Open-source toolkit w Pythonie. Średni czas weryfikacji zredukowany z 45 do 12 minut.",
    resultEN: "Open-source Python toolkit. Average claim-check time reduced from 45 to 12 minutes.",
  },
  {
    num: "05",
    date: "2024 Q4–2025 Q1",
    titlePL: "Prototypowanie z AI — Lovable",
    titleEN: "AI-Assisted Prototyping — Lovable",
    tags: ["AI prototyping", "Accessibility", "WCAG"],
    descPL: "Cztery designy portfolio z briefów w języku naturalnym. Audyt WCAG 2.2 AA, Lighthouse, heurystyki UX. Czas do prototypu poniżej 10 minut.",
    descEN: "Four portfolio designs generated from natural-language briefs. WCAG 2.2 AA audit, Lighthouse scores, UX heuristics. Time-to-prototype under 10 minutes.",
    resultPL: "Cztery prototypy dopracowane do AA. Case study o workflow z AI.",
    resultEN: "Four prototypes refined to AA compliance. Documented as case study on AI-assisted workflows.",
  },
];

const ProjectCard = ({
  project,
  index,
  lang,
}: {
  project: (typeof projects)[0];
  index: number;
  lang: "pl" | "en";
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReduced) {
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (prefersReduced) {
            el.style.opacity = "1";
          } else {
            setTimeout(() => {
              el.style.transition = "opacity 0.3s ease-out, transform 0.3s ease-out";
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, index * 150);
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const t = (pl: string, en: string) => (lang === "pl" ? pl : en);

  return (
    <div
      ref={ref}
      className="border border-border bg-card p-6 hover:border-primary"
      style={{ boxShadow: "none" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 0 20px rgba(34,211,238,0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      <div className="font-mono text-2xl text-primary opacity-30">{project.num}</div>
      <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-2">
        {project.date}
      </div>
      <h3 className="text-lg font-semibold text-foreground mt-2">
        {t(project.titlePL, project.titleEN)}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mt-2">
        {t(project.descPL, project.descEN)}
      </p>
      <div className="border-l-2 border-primary pl-3 mt-4">
        <p className="text-xs text-muted-foreground">
          {t(project.resultPL, project.resultEN)}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs uppercase border border-border px-2 py-0.5 text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const ProjectsView = () => {
  const { lang } = useLang();

  return (
    <div className="px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-mono text-xl font-bold text-primary uppercase tracking-widest mb-12">
          Case Files // Timeline
        </h2>

        {/* Vertical timeline */}
        <div className="relative pl-12">
          {/* Line */}
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-border" />

          <div className="flex flex-col gap-8">
            {projects.map((project, i) => (
              <div key={project.num} className="relative">
                {/* Square marker */}
                <div className="absolute -left-12 top-6 w-8 h-8 border border-primary bg-background flex items-center justify-center font-mono text-sm text-primary">
                  {project.num}
                </div>
                <ProjectCard project={project} index={i} lang={lang} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsView;
