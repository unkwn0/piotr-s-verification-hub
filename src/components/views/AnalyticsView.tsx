import { useLang } from "@/contexts/LangContext";

const AnalyticsView = () => {
  const { t } = useLang();
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4">
      <h2 className="font-mono text-xl font-bold text-primary uppercase tracking-wider">
        Verification Dashboard
      </h2>
      <p className="text-muted-foreground mt-4 font-mono text-sm">
        {t("Dashboard analityczny — wkrótce", "Analytics dashboard — coming soon")}
      </p>
    </div>
  );
};

export default AnalyticsView;
