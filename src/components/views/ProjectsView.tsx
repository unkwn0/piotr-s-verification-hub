import { useLang } from "@/contexts/LangContext";

const ProjectsView = () => {
  const { t } = useLang();
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4">
      <h2 className="font-mono text-xl font-bold text-primary uppercase tracking-wider">
        Case Files // Timeline
      </h2>
      <p className="text-muted-foreground mt-4 font-mono text-sm">
        {t("Timeline projektów — wkrótce", "Project timeline — coming soon")}
      </p>
    </div>
  );
};

export default ProjectsView;
