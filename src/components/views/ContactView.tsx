import { useState, type FormEvent } from "react";
import { useLang } from "@/contexts/LangContext";

const subjectsPL = [
  "Weryfikacja twierdzenia",
  "Analiza źródeł",
  "Monitoring mediów",
  "Raport weryfikacyjny",
  "Inne",
];

const subjectsEN = [
  "Claim verification",
  "Source analysis",
  "Media monitoring",
  "Verification report",
  "Other",
];

const ContactView = () => {
  const { t, lang } = useLang();
  const subjects = lang === "pl" ? subjectsPL : subjectsEN;

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 py-16">
      <div className="w-full max-w-lg">
        <h2 className="font-mono text-xl font-bold text-primary uppercase tracking-wider mb-2">
          {t("Zapytanie", "Inquiry")}
        </h2>
        <p className="text-muted-foreground text-sm mb-8">
          {t(
            "Opisz twierdzenie lub temat do weryfikacji. Odpowiadam w ciągu 24 godzin.",
            "Describe the claim or topic for verification. I respond within 24 hours."
          )}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            required
            placeholder={t("Imię", "Name")}
            maxLength={100}
            className="bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:border-primary"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            maxLength={255}
            className="bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:border-primary"
          />
          <select
            name="subject"
            required
            defaultValue=""
            className="bg-card border border-border px-4 py-3 text-sm text-foreground font-mono focus:outline-none focus:border-primary appearance-none"
          >
            <option value="" disabled>
              {t("Temat", "Subject")}
            </option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <textarea
            name="message"
            required
            placeholder={t("Wiadomość", "Message")}
            maxLength={2000}
            className="bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:border-primary min-h-[120px] resize-y"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary text-primary-foreground font-mono text-sm px-6 py-3 hover:opacity-90 disabled:opacity-50"
          >
            {submitting
              ? "..."
              : t("Wyślij zapytanie", "Send inquiry")}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 font-mono text-sm text-primary">
            {t(
              "Wiadomość wysłana. Odpowiem w ciągu 24h.",
              "Message sent. I'll respond within 24 hours."
            )}
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 font-mono text-sm text-destructive">
            {t(
              "Nie udało się wysłać. Spróbuj ponownie lub napisz na PLACEHOLDER@EMAIL.COM",
              "Failed to send. Try again or email PLACEHOLDER@EMAIL.COM"
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactView;
