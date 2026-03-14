import { useLang } from "@/contexts/LangContext";
import { useView } from "@/contexts/ViewContext";

const services = [
  {
    label: "[01] CLAIM_VERIFICATION",
    titlePL: "Weryfikacja twierdzeń",
    titleEN: "Claim verification",
    descPL: "Sprawdzam konkretne twierdzenie — docieram do źródła pierwotnego, oceniam metodologię i dostarczam werdykt z poziomem pewności.",
    descEN: "I trace a specific claim to its primary source, assess the methodology and deliver a verdict with a confidence level.",
  },
  {
    label: "[02] SOURCE_ANALYSIS",
    titlePL: "Analiza źródeł",
    titleEN: "Source analysis",
    descPL: "Oceniam wiarygodność i motywacje źródła informacji — od komunikatów prasowych po publikacje naukowe.",
    descEN: "I evaluate the credibility and motivations behind an information source — from press releases to academic publications.",
  },
  {
    label: "[03] MEDIA_MONITORING",
    titlePL: "Monitoring mediów",
    titleEN: "Media monitoring",
    descPL: "Systematyczne śledzenie narracji medialnych wokół wybranego tematu z raportowaniem odchyleń od faktów.",
    descEN: "Systematic tracking of media narratives around a chosen topic, with deviation-from-fact reporting.",
  },
  {
    label: "[04] VERIFICATION_REPORT",
    titlePL: "Raport weryfikacyjny",
    titleEN: "Verification report",
    descPL: "Pełna dokumentacja procesu weryfikacji — od hipotezy przez źródła po werdykt. Format PDF lub Markdown.",
    descEN: "Full documentation of the verification process — from hypothesis through sources to verdict. PDF or Markdown format.",
  },
];

const steps = [
  {
    titlePL: "Przyjmuję twierdzenie",
    titleEN: "Claim intake",
    descPL: "Definiuję dokładnie, co jest weryfikowane. Ustalam zakres i kontekst.",
    descEN: "I define exactly what is being verified. Scope and context are established.",
  },
  {
    titlePL: "Docieram do źródeł",
    titleEN: "Source tracing",
    descPL: "Szukam źródła pierwotnego — bazy danych, dokumenty, oświadczenia, archiwa.",
    descEN: "I locate the primary source — databases, documents, statements, archives.",
  },
  {
    titlePL: "Weryfikacja krzyżowa",
    titleEN: "Cross-verification",
    descPL: "Konfrontuję źródło pierwotne ze źródłami wtórnymi. Szukam sprzeczności.",
    descEN: "I confront the primary source with secondary sources. Looking for contradictions.",
  },
  {
    titlePL: "Werdykt i raport",
    titleEN: "Verdict & report",
    descPL: "Dostarczam werdykt (Prawda / Fałsz / Częściowo prawda / Nieweryfikowalne) z oceną pewności i pełną dokumentacją.",
    descEN: "I deliver a verdict (True / False / Partially true / Unverifiable) with a confidence score and full documentation.",
  },
];

const HomeView = () => {
  const { t } = useLang();
  const { setView } = useView();

  const metrics = [
    { value: "85+", label: t("zweryfikowanych twierdzeń", "claims verified") },
    { value: "24h", label: t("czas odpowiedzi", "response time") },
    { value: "3/1", label: t("systemy operacyjne / pipeline", "operating systems / pipeline") },
  ];

  return (
    <div className="px-4">
      {/* Hero */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {t(
              "Weryfikacja informacji dla mediów i firm",
              "Fact-checking for media & business"
            )}
          </h1>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {t(
              "Niezależny fact-checking oparty na źródłach pierwotnych, białym wywiadzie i systematycznej metodologii.",
              "Independent verification built on primary sources, open-source intelligence and systematic methodology."
            )}
          </p>
          <button
            onClick={() => setView("contact")}
            className="bg-primary text-primary-foreground font-mono text-sm px-6 py-3 hover:opacity-90"
          >
            {t("Wyślij zapytanie", "Send inquiry")}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 w-full max-w-2xl">
          {metrics.map((m, i) => (
            <div key={i} className="border border-border bg-card p-4 text-center">
              <div className="font-mono text-2xl font-bold text-primary">{m.value}</div>
              <div className="font-mono text-xs text-muted-foreground mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <section className="max-w-3xl mx-auto py-24">
        <h2 className="font-mono text-xl font-bold mb-8 text-foreground">
          {t("Czym się zajmuję", "What I do")}
        </h2>
        <div className="bg-border grid grid-cols-1 md:grid-cols-2 gap-px">
          {services.map((s, i) => (
            <div key={i} className="bg-card p-6 border border-border">
              <span className="font-mono text-xs text-muted-foreground tracking-wider">
                {s.label}
              </span>
              <h3 className="text-lg font-semibold mt-3 text-foreground">
                {t(s.titlePL, s.titleEN)}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {t(s.descPL, s.descEN)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Timeline */}
      <section className="max-w-3xl mx-auto py-24">
        <h2 className="font-mono text-xl font-bold mb-12 text-foreground">
          {t("Jak pracuję", "How I work")}
        </h2>
        <div className="relative pl-12">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-border" />

          <div className="flex flex-col gap-10">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {/* Square marker */}
                <div className="absolute -left-12 top-0 w-8 h-8 border border-primary bg-background flex items-center justify-center font-mono text-sm text-primary">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-foreground">{t(step.titlePL, step.titleEN)}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {t(step.descPL, step.descEN)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
