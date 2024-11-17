"use client";

import { useConfetti } from "./confetti";

export default function Home() {
  const { runAnimation } = useConfetti();

  return (
    <div className="grid w-svw h-svh place-items-center">
      <button
        className="group relative rounded-lg border border-amber-500/70 bg-amber-500/90 px-4 py-1.5 text-lg font-semibold text-white transition-colors duration-100 hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 disabled:cursor-not-allowed md:px-3 md:py-1 md:text-base dark:border-white/10 dark:bg-[rgba(244,244,244,.1)] dark:text-foreground dark:hover:bg-[rgba(244,244,244,.2)] dark:focus-visible:border-white/30 dark:focus-visible:ring-white/10"
        onClick={() =>
          runAnimation({
            duration: 5000,
          })
        }
      >
        <span className="group-disabled:invisible">Rain Down</span>
      </button>
    </div>
  );
}
