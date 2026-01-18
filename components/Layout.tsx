
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  stepKey: string;
}

const Layout: React.FC<LayoutProps> = ({ children, stepKey }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#fafafa] text-[#1a1a1a] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.main
          key={stepKey}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex-grow flex flex-col justify-center items-center px-6 md:px-12 py-12"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

export default Layout;
