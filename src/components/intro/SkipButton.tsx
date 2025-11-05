import { motion, AnimatePresence } from "framer-motion";

type SkipButtonProps = {
  onSkip: () => void;
  show: boolean;
};

export function SkipButton({ onSkip, show }: SkipButtonProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ delay: 2 }}
          onClick={onSkip}
          className="absolute top-8 right-8 z-20 px-4 py-2 rounded-lg bg-white/10 dark:bg-neutral-900/10 backdrop-blur-md border border-white/20 dark:border-neutral-700/20 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-white/20 dark:hover:bg-neutral-900/20 transition-colors pointer-events-auto"
          aria-label="Skip intro"
        >
          Skip intro
        </motion.button>
      )}
    </AnimatePresence>
  );
}

