import { motion, AnimatePresence } from "framer-motion";

type ScrollCueProps = {
  show: boolean;
};

export function ScrollCue({ show }: ScrollCueProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-sm font-medium"
          >
            Scroll to explore ↓
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="w-px h-8 bg-white/40"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

