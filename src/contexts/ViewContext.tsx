import React, { createContext, useContext, useState, type ReactNode } from "react";

export type View = "home" | "projects" | "analytics" | "verify" | "contact";

interface ViewContextType {
  view: View;
  setView: (v: View) => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<View>("home");
  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error("useView must be used within ViewProvider");
  return ctx;
};
