import { useLang } from "@/contexts/LangContext";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-6 px-4">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="font-mono text-xs text-muted-foreground">
          © {year} Piotr. Kraków, Poland.
        </span>
        <a
          href="https://piotr.app"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-muted-foreground hover:text-primary"
        >
          piotr.app
        </a>
      </div>
    </footer>
  );
};

export default Footer;
