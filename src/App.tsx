import { LangProvider } from "@/contexts/LangContext";
import { ViewProvider, useView } from "@/contexts/ViewContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeView from "@/components/views/HomeView";
import ProjectsView from "@/components/views/ProjectsView";
import AnalyticsView from "@/components/views/AnalyticsView";
import VerifyView from "@/components/views/VerifyView";
import ContactView from "@/components/views/ContactView";

const ViewSwitch = () => {
  const { view } = useView();
  switch (view) {
    case "home": return <HomeView />;
    case "projects": return <ProjectsView />;
    case "analytics": return <AnalyticsView />;
    case "verify": return <VerifyView />;
    case "contact": return <ContactView />;
  }
};

const App = () => (
  <LangProvider>
    <ViewProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-14">
          <ViewSwitch />
        </main>
        <Footer />
      </div>
    </ViewProvider>
  </LangProvider>
);

export default App;
