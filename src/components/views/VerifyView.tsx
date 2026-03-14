import { useLang } from "@/contexts/LangContext";

const VerifyView = () => {
  const { t } = useLang();
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4">
      <h2 className="font-mono text-xl font-bold text-primary uppercase tracking-wider">
        {t("Narzędzie weryfikacji", "Verification Tool")}
      </h2>
      <p className="text-muted-foreground mt-4 font-mono text-sm">
        {t("Weryfikator faktów — wkrótce", "Fact-checker — coming soon")}
      </p>
    </div>
  );
};

export default VerifyView;
