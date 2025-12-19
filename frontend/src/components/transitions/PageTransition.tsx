import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

const variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export const PageTransition = ({ children }: PropsWithChildren) => (
  <motion.div
    variants={variants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.25 }}
    style={{
      display: "block",
      width: "100%",
      height: "100%",
    }}
    className="wrapper"
  >
    {children}
  </motion.div>
);
