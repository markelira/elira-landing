'use client';

import { motion, AnimatePresence } from "motion/react";
import { useCompanySize } from "./CompanySizeSelector";

interface DynamicContentProps {
  children: React.ReactNode;
}

export function DynamicContent({ children }: DynamicContentProps) {
  const { selectedSize } = useCompanySize();

  return (
    <AnimatePresence mode="wait">
      {selectedSize && (
        <motion.div
          initial={{ 
            opacity: 0, 
            y: 80,
            scale: 0.95,
            filter: "blur(10px)"
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: 1,
            filter: "blur(0px)"
          }}
          exit={{ 
            opacity: 0, 
            y: -30,
            scale: 0.98,
            filter: "blur(5px)"
          }}
          transition={{ 
            duration: 1.2, 
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.3,
            opacity: { duration: 0.8, ease: "easeOut" },
            y: { duration: 1.0, ease: [0.34, 1.56, 0.64, 1] },
            scale: { duration: 1.0, ease: "easeOut" },
            filter: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.8,
              staggerChildren: 0.1
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}