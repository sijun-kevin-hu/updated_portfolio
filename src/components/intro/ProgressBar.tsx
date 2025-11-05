import { motion } from "framer-motion";

type ProgressBarProps = {
  progress: number;
  show: boolean;
};

export function ProgressBar({ progress, show }: ProgressBarProps) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/10 rounded-full overflow-hidden"
      style={{ opacity: show ? 1 : 0 }}
    >
      <motion.div
        className="h-full bg-white/60 rounded-full"
        style={{ width: `${progress * 100}%` }}
      />
    </motion.div>
  );
}

