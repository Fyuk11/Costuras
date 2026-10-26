// src/components/brand/Toast.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

export const Toast = ({ isVisible, message, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-carbon text-arena border border-marfil px-5 py-3 shadow-2xl flex items-center gap-3"
        >
          <div className="w-5 h-5 bg-oliva text-marfil flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-body font-medium uppercase tracking-[0.1em]">
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};