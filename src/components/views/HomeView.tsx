import { useLang } from "@/contexts/LangContext";
import { useView } from "@/contexts/ViewContext";

const HomeView = () => {
  const { t } = useLang();
  const { setView } = useView();

  const metrics = [
    { value: "85+", label: t("zweryfikowanych twierdzeń", "claims verified") },
    { value: "24h", label: t("czas odpowiedzi", "response time") },
    { value: "3/1", label: t("systemy operacyjne / pipeline", "operating systems / pipeline") },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4">
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
  );
};

export default HomeView;
