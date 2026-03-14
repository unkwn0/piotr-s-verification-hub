import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { useView, type View } from "@/contexts/ViewContext";
import { Menu, X } from "lucide-react";

const tabs: { key: View; pl: string; en: string }[] = [
  { key: "home", pl: "Start", en: "Home" },
  { key: "projects", pl: "Projekty", en: "Projects" },
  { key: "analytics", pl: "Analityka", en: "Analytics" },
  { key: "verify", pl: "Weryfikator", en: "Verify" },
  { key: "contact", pl: "Kontakt", en: "Contact" },
];

const Navbar = () => {
  const { lang, setLang, t } = useLang();
  const { view, setView } = useView();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex items-center justify-between h-14 px-4">
        {/* Logo */}
        <button
          onClick={() => { setView("home"); setMenuOpen(false); }}
          className="font-mono font-bold text-lg text-foreground"
        >
          Piotr.
        </button>

        {/* Desktop tabs */}
        <div className="hidden md:flex items-center gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setView(tab.key)}
              className={`px-4 py-4 font-mono text-sm ${
                view === tab.key
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(tab.pl, tab.en)}
            </button>
          ))}
        </div>

        {/* Right side: lang switch + hamburger */}
        <div className="flex items-center gap-2">
          <div className="flex">
            <button
              onClick={() => setLang("pl")}
              className={`px-2 py-1 font-mono text-xs ${
                lang === "pl"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              PL
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 font-mono text-xs ${
                lang === "en"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              EN
            </button>
          </div>

          <button
            className="md:hidden text-foreground p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setView(tab.key); setMenuOpen(false); }}
              className={`block w-full text-left px-4 py-3 font-mono text-sm ${
                view === tab.key
                  ? "text-primary border-l-2 border-primary"
                  : "text-muted-foreground"
              }`}
            >
              {t(tab.pl, tab.en)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
