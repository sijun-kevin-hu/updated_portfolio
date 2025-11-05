"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type IntroContextType = {
  introCompleted: boolean;
  setIntroCompleted: (completed: boolean) => void;
};

const IntroContext = createContext<IntroContextType | undefined>(undefined);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [introCompleted, setIntroCompleted] = useState(false);

  return (
    <IntroContext.Provider value={{ introCompleted, setIntroCompleted }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const context = useContext(IntroContext);
  // Return default values if context is not available (e.g., on other pages)
  if (context === undefined) {
    return { introCompleted: true, setIntroCompleted: () => {} };
  }
  return context;
}

