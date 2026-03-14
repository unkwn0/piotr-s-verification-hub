import { useState, useEffect, useCallback } from "react";
import { useLang } from "@/contexts/LangContext";
import { Search } from "lucide-react";

/* ── Types ── */
interface CheckStep {
  checked: boolean;
  note: string;
  url: string;
}

interface Verification {
  id: string;
  claim: string;
  category: string;
  urgency: string;
  steps: CheckStep[];
  verdict: string;
  confidence: number;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "hub-verifications";

const stepLabelsPL = [
  "Identyfikacja źródła pierwotnego",
  "Weryfikacja źródła pierwotnego",
  "Źródło wtórne nr 1",
  "Źródło wtórne nr 2",
  "Weryfikacja krzyżowa",
  "Kontekst i data publikacji",
  "Potencjalne motywacje źródła",
  "Werdykt końcowy",
];
const stepLabelsEN = [
  "Primary source identification",
  "Primary source verification",
  "Secondary source #1",
  "Secondary source #2",
  "Cross-verification",
  "Context and publication date",
  "Potential source motivations",
  "Final verdict",
];

const categoriesPL = ["Polityka", "Gospodarka", "Historia", "Nauka", "Inne"];
const categoriesEN = ["Politics", "Economy", "History", "Science", "Other"];

const urgenciesPL = ["Niski", "Średni", "Wysoki"];
const urgenciesEN = ["Low", "Medium", "High"];

const verdictsPL = ["Prawda", "Fałsz", "Częściowo prawda", "Nieweryfikowalne", "W toku"];
const verdictsEN = ["True", "False", "Partially true", "Unverifiable", "In progress"];

const verdictColors: Record<string, string> = {
  Prawda: "#4ade80", True: "#4ade80",
  Fałsz: "#f87171", False: "#f87171",
  "Częściowo prawda": "#facc15", "Partially true": "#facc15",
  Nieweryfikowalne: "#71717a", Unverifiable: "#71717a",
  "W toku": "#38bdf8", "In progress": "#38bdf8",
};

function loadAll(): Verification[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveAll(v: Verification[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
}

function emptySteps(): CheckStep[] {
  return Array.from({ length: 8 }, () => ({ checked: false, note: "", url: "" }));
}

function blank(): Verification {
  return {
    id: "",
    claim: "",
    category: "",
    urgency: "Low",
    steps: emptySteps(),
    verdict: "",
    confidence: 50,
    createdAt: "",
    updatedAt: "",
  };
}

function confidenceColor(v: number) {
  if (v <= 33) return "#f87171";
  if (v <= 66) return "#facc15";
  return "#4ade80";
}

function confidenceLabel(v: number, lang: "pl" | "en") {
  if (v <= 33) return lang === "pl" ? "Niska" : "Low";
  if (v <= 66) return lang === "pl" ? "Średnia" : "Medium";
  return lang === "pl" ? "Wysoka" : "High";
}

/* ── Component ── */
const VerifyView = () => {
  const { t, lang } = useLang();
  const [subView, setSubView] = useState<"form" | "history">("form");
  const [data, setData] = useState(blank());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [items, setItems] = useState<Verification[]>([]);
  const [search, setSearch] = useState("");
  const [claimError, setClaimError] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const stepLabels = lang === "pl" ? stepLabelsPL : stepLabelsEN;
  const categories = lang === "pl" ? categoriesPL : categoriesEN;
  const urgencies = lang === "pl" ? urgenciesPL : urgenciesEN;
  const verdicts = lang === "pl" ? verdictsPL : verdictsEN;

  useEffect(() => {
    setItems(loadAll());
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  /* ── Save ── */
  const handleSave = () => {
    if (!data.claim.trim()) {
      setClaimError(true);
      return;
    }
    setClaimError(false);
    const now = new Date().toISOString();
    let updated: Verification[];
    if (editingId) {
      updated = items.map((it) =>
        it.id === editingId ? { ...data, id: editingId, updatedAt: now } : it
      );
    } else {
      const newV: Verification = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      updated = [newV, ...items];
    }
    saveAll(updated);
    setItems(updated);
    setData(blank());
    setEditingId(null);
    showToast(t("Zapisano weryfikację", "Verification saved"));
  };

  /* ── Delete ── */
  const handleDelete = (id: string) => {
    const updated = items.filter((it) => it.id !== id);
    saveAll(updated);
    setItems(updated);
    setConfirmDelete(null);
    if (editingId === id) {
      setEditingId(null);
      setData(blank());
    }
  };

  /* ── Load for edit ── */
  const loadForEdit = (v: Verification) => {
    setData(v);
    setEditingId(v.id);
    setSubView("form");
  };

  /* ── Export PDF ── */
  const handlePdf = async () => {
    if (!data.claim.trim()) return;
    const html2pdf = (await import("html2pdf.js")).default;
    const first3 = data.claim.split(/\s+/).slice(0, 3).join("-").replace(/[^a-zA-Z0-9-]/g, "");
    const dateStr = new Date().toISOString().slice(0, 10);

    const el = document.createElement("div");
    el.style.fontFamily = "JetBrains Mono, monospace";
    el.style.fontSize = "12px";
    el.style.color = "#fff";
    el.style.background = "#0a0a0a";
    el.style.padding = "24px";
    el.innerHTML = `
      <h1 style="color:#22d3ee;font-size:18px;margin-bottom:8px">Verification Report</h1>
      <p><b>Date:</b> ${dateStr}</p>
      <p><b>Claim:</b> ${data.claim}</p>
      <p><b>Category:</b> ${data.category || "—"}</p>
      <p><b>Urgency:</b> ${data.urgency}</p>
      <h2 style="color:#22d3ee;font-size:14px;margin-top:16px">Checklist</h2>
      ${stepLabelsEN
        .map(
          (label, i) =>
            `<p>${data.steps[i].checked ? "☑" : "☐"} ${label}${data.steps[i].note ? ": " + data.steps[i].note : ""}${data.steps[i].url ? " — " + data.steps[i].url : ""}</p>`
        )
        .join("")}
      <h2 style="color:#22d3ee;font-size:14px;margin-top:16px">Verdict</h2>
      <p><b>Verdict:</b> ${data.verdict || "—"}</p>
      <p><b>Confidence:</b> ${data.confidence}%</p>
    `;
    document.body.appendChild(el);
    await html2pdf().set({ filename: `weryfikacja-${dateStr}-${first3}.pdf`, margin: 10 }).from(el).save();
    document.body.removeChild(el);
  };

  /* ── Copy Markdown ── */
  const handleMarkdown = () => {
    if (!data.claim.trim()) return;
    const dateStr = new Date().toISOString().slice(0, 10);
    const lines = [
      `## Verification Report`,
      ``,
      `**Date:** ${dateStr}`,
      `**Claim:** ${data.claim}`,
      `**Category:** ${data.category || "—"}`,
      `**Urgency:** ${data.urgency}`,
      ``,
      `## Checklist`,
      ...stepLabelsEN.map(
        (label, i) =>
          `- [${data.steps[i].checked ? "x" : " "}] ${label}${data.steps[i].note ? ": " + data.steps[i].note : ""}${data.steps[i].url ? ` — [Source](${data.steps[i].url})` : ""}`
      ),
      ``,
      `## Verdict`,
      `**Verdict:** ${data.verdict || "—"}`,
      `**Confidence:** ${data.confidence}%`,
    ];
    navigator.clipboard.writeText(lines.join("\n"));
    showToast(t("Skopiowano do schowka", "Copied to clipboard"));
  };

  /* ── Filtered items ── */
  const filtered = items.filter((it) =>
    it.claim.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-mono text-xl font-bold text-primary uppercase tracking-widest">
          {t("Narzędzie weryfikacji", "Verification Tool")}
        </h2>

        {/* Sub-view toggle */}
        <div className="flex gap-0 mt-6 mb-8">
          <button
            onClick={() => setSubView("form")}
            className={`font-mono text-sm px-4 py-2 ${
              subView === "form"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            {t("Nowa weryfikacja", "New verification")}
          </button>
          <button
            onClick={() => setSubView("history")}
            className={`font-mono text-sm px-4 py-2 ${
              subView === "history"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            {t("Historia", "History")}
          </button>
        </div>

        {/* ── FORM ── */}
        {subView === "form" && (
          <div className="flex flex-col gap-6">
            {/* Claim */}
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                {t("Weryfikowane twierdzenie", "Claim to verify")}
              </label>
              <textarea
                value={data.claim}
                onChange={(e) => {
                  setData({ ...data, claim: e.target.value });
                  if (e.target.value.trim()) setClaimError(false);
                }}
                className="w-full bg-card border border-border px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary min-h-[120px] resize-y"
                placeholder={t("Wpisz twierdzenie…", "Enter claim…")}
              />
              {claimError && (
                <p className="font-mono text-xs text-destructive mt-1">
                  {t("Pole wymagane", "This field is required")}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                {t("Kategoria", "Category")}
              </label>
              <select
                value={data.category}
                onChange={(e) => setData({ ...data, category: e.target.value })}
                className="w-full bg-card border border-border px-4 py-3 font-mono text-sm text-foreground focus:outline-none focus:border-primary appearance-none"
              >
                <option value="">{t("Wybierz…", "Select…")}</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Urgency */}
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                {t("Poziom pilności", "Urgency level")}
              </label>
              <div className="flex gap-4">
                {urgencies.map((u) => (
                  <label key={u} className="flex items-center gap-2 font-mono text-sm text-foreground cursor-pointer">
                    <input
                      type="radio"
                      name="urgency"
                      checked={data.urgency === u}
                      onChange={() => setData({ ...data, urgency: u })}
                      className="accent-primary"
                    />
                    {u}
                  </label>
                ))}
              </div>
            </div>

            {/* Checklist */}
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-4">
                {t("Checklista weryfikacji", "Verification checklist")}
              </label>
              <div className="flex flex-col gap-4">
                {stepLabels.map((label, i) => (
                  <div key={i} className="border border-border bg-card p-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.steps[i].checked}
                        onChange={() => {
                          const steps = [...data.steps];
                          steps[i] = { ...steps[i], checked: !steps[i].checked };
                          setData({ ...data, steps });
                        }}
                        className="accent-primary"
                      />
                      <span className="font-mono text-sm text-foreground">{label}</span>
                    </label>
                    <textarea
                      value={data.steps[i].note}
                      onChange={(e) => {
                        const steps = [...data.steps];
                        steps[i] = { ...steps[i], note: e.target.value };
                        setData({ ...data, steps });
                      }}
                      placeholder={t("Notatka…", "Note…")}
                      className="w-full mt-2 bg-background border border-border px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary min-h-[48px] resize-y"
                    />
                    <input
                      type="text"
                      value={data.steps[i].url}
                      onChange={(e) => {
                        const steps = [...data.steps];
                        steps[i] = { ...steps[i], url: e.target.value };
                        setData({ ...data, steps });
                      }}
                      placeholder="https://…"
                      className="w-full mt-2 bg-background border border-border px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Verdict */}
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                {t("Werdykt", "Verdict")}
              </label>
              <select
                value={data.verdict}
                onChange={(e) => setData({ ...data, verdict: e.target.value })}
                className="w-full bg-card border border-border px-4 py-3 font-mono text-sm text-foreground focus:outline-none focus:border-primary appearance-none"
              >
                <option value="">{t("Wybierz…", "Select…")}</option>
                {verdicts.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            {/* Confidence */}
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                {t("Ocena pewności", "Confidence score")}
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={data.confidence}
                onChange={(e) => setData({ ...data, confidence: Number(e.target.value) })}
                className="w-full accent-primary"
              />
              <div className="w-full h-1.5 bg-muted mt-2">
                <div
                  className="h-full"
                  style={{
                    width: `${data.confidence}%`,
                    backgroundColor: confidenceColor(data.confidence),
                  }}
                />
              </div>
              <p className="font-mono text-xs text-muted-foreground mt-1">
                {data.confidence}% — {confidenceLabel(data.confidence, lang)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSave}
                className="bg-primary text-primary-foreground font-mono text-sm px-6 py-3 hover:opacity-90"
              >
                {t("Zapisz weryfikację", "Save verification")}
              </button>
              <button
                onClick={handlePdf}
                className="bg-card border border-border text-foreground font-mono text-sm px-6 py-3 hover:border-primary"
              >
                {t("Eksportuj PDF", "Export PDF")}
              </button>
              <button
                onClick={handleMarkdown}
                className="bg-card border border-border text-foreground font-mono text-sm px-6 py-3 hover:border-primary"
              >
                {t("Kopiuj Markdown", "Copy Markdown")}
              </button>
            </div>
          </div>
        )}

        {/* ── HISTORY ── */}
        {subView === "history" && (
          <div>
            {/* Search */}
            <div className="relative mb-6">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("Szukaj…", "Search…")}
                className="w-full bg-card border border-border pl-10 pr-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>

            {filtered.length === 0 ? (
              <p className="font-mono text-sm text-muted-foreground text-center py-16">
                {t("Brak zapisanych weryfikacji", "No saved verifications")}
              </p>
            ) : (
              <div className="flex flex-col gap-px bg-border">
                {filtered
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((item) => {
                    const vc = verdictColors[item.verdict] || "#71717a";
                    return (
                      <div
                        key={item.id}
                        className="bg-card border border-border p-4 cursor-pointer hover:border-primary"
                        onClick={() => loadForEdit(item)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground truncate">
                              {item.claim.length > 80
                                ? item.claim.slice(0, 80) + "…"
                                : item.claim}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                              <span className="font-mono text-xs text-muted-foreground">
                                {item.createdAt.slice(0, 10)}
                              </span>
                              {item.category && (
                                <span className="font-mono text-xs uppercase border border-border px-2 py-0.5 text-muted-foreground">
                                  {item.category}
                                </span>
                              )}
                              {item.verdict && (
                                <span
                                  className="font-mono text-xs px-2 py-0.5 border"
                                  style={{ borderColor: vc, color: vc }}
                                >
                                  {item.verdict}
                                </span>
                              )}
                            </div>
                            <div className="w-full max-w-[120px] h-1.5 bg-muted mt-2">
                              <div
                                className="h-full"
                                style={{
                                  width: `${item.confidence}%`,
                                  backgroundColor: confidenceColor(item.confidence),
                                }}
                              />
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfirmDelete(
                                confirmDelete === item.id ? null : item.id
                              );
                            }}
                            className="font-mono text-xs text-destructive hover:underline shrink-0"
                          >
                            {confirmDelete === item.id
                              ? t("Czy na pewno?", "Are you sure?")
                              : t("Usuń", "Delete")}
                          </button>
                        </div>
                        {confirmDelete === item.id && (
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(item.id);
                              }}
                              className="font-mono text-xs bg-destructive text-destructive-foreground px-3 py-1"
                            >
                              {t("Tak, usuń", "Yes, delete")}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfirmDelete(null);
                              }}
                              className="font-mono text-xs border border-border text-muted-foreground px-3 py-1"
                            >
                              {t("Anuluj", "Cancel")}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-card border border-primary px-4 py-2 font-mono text-sm text-foreground z-50">
          {toast}
        </div>
      )}
    </div>
  );
};

export default VerifyView;
