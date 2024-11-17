"use client";

import Script from "next/script";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

const ConfettiContext = createContext<{
  loaded: boolean;
  setLoaded: (state: boolean) => void;
}>({
  loaded: false,
  setLoaded: () => {},
});

const useConfettiContext = () => {
  const context = useContext(ConfettiContext);
  if (!context) {
    throw new Error(
      "useConfettiContext must be used within a ConfettiProvider"
    );
  }

  return context;
};

export const useConfetti = () => {
  const { loaded } = useConfettiContext();
  let timeout: NodeJS.Timeout | undefined;

  useEffect(() => {
    return () => {
      if (loaded) {
        // @ts-expect-error - This library is not typed
        window.confetti.stop();
      }
      clearTimeout(timeout);
    };
  }, [loaded, timeout]);

  const runAnimation = ({ duration = 3000 }: { duration?: number } = {}) => {
    if (loaded) {
      // @ts-expect-error - this library is not typed
      window.confetti.start();
      timeout = setTimeout(() => {
        // @ts-expect-error - this library is not typed
        window.confetti.stop();
        // setStartAnimation(false);
      }, duration);
    }
  };

  return { runAnimation };
};

export function Confetti({ children }: PropsWithChildren) {
  const [loaded, setLoaded] = useState(false);

  return (
    <ConfettiContext.Provider value={{ loaded, setLoaded }}>
      {children}
      <Script
        strategy="lazyOnload"
        src="https://cdn.jsdelivr.net/gh/raiyansarker/confetti@main/confetti.min.js"
        onLoad={() => setLoaded(true)}
      />
    </ConfettiContext.Provider>
  );
}
