// src/components/brand/RecomendadorPopUp.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import productsData from '../../data/products.json';

export const RecomendadorPopUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [recomendado, setRecomendado] = useState(null);

  useEffect(() => {
    const item = productsData.find((p) => p.featured) || productsData[0];
    setRecomendado(item);

    // Aparece recién a los 8 segundos para dar tiempo a recorrer el Hero
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (!recomendado) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 30, x: -20 }}
          transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
          className="fixed bottom-6 left-6 z-40 max-w-sm bg-[#F7F3EB] border border-[#2B2B28] p-4 shadow-2xl flex items-center gap-4 border-l-4 border-l-[#5E6B4A]"
        >
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-[#4A4437] hover:text-[#2B2B28] p-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="w-16 h-16 bg-[#D8CDB8] border border-[#2B2B28] shrink-0 overflow-hidden">
            <img
              src={recomendado.images?.[0]?.src}
              alt={recomendado.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-1 text-[10px] font-body uppercase tracking-wider text-[#5E6B4A] font-medium">
              <Sparkles className="w-3 h-3" />
              <span>Recomendación del día</span>
            </div>

            <h4 className="text-sm font-display text-[#2B2B28] truncate mt-0.5">
              {recomendado.title}
            </h4>

            <Link
              to={`/producto/${recomendado.handle}`}
              onClick={() => setIsVisible(false)}
              className="inline-flex items-center gap-1 text-[11px] font-body uppercase tracking-wider text-[#2B2B28] font-medium underline mt-1 hover:text-[#5E6B4A]"
            >
              Ver pieza <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};