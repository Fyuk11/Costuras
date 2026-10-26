// src/components/catalog/ProductModal.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FigCaption } from '../brand/FigCaption';

export const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants?.[0] || null);
    }
  }, [product]);

  if (!product) return null;

  const currentPrice = selectedVariant?.price || product.price;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#2B2B28]/70 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl bg-[#F7F3EB] border border-[#2B2B28] shadow-2xl z-50 my-auto overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-[#EFE9DF] hover:bg-[#D8CDB8] text-[#2B2B28] p-2 border border-[#2B2B28] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-[#D8CDB8] border-b md:border-b-0 md:border-r border-[#2B2B28] aspect-4/5 md:aspect-auto">
              <img
                src={product.images?.[0]?.src}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#F7F3EB]">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#2B2B28]/20 pb-3">
                  <span className="text-[10px] font-body uppercase tracking-[0.2em] text-[#5E6B4A] font-medium">
                    // FICHA TÉCNICA
                  </span>
                  <FigCaption numero="01" codigo={product.handle.slice(0, 4)} />
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-light text-[#2B2B28] leading-tight">
                  {product.title}
                </h3>

                <p className="text-xs font-body text-[#4A4437] leading-relaxed">
                  {product.description}
                </p>

                {product.variants?.length > 1 && (
                  <div className="pt-2 space-y-1.5">
                    <span className="text-[10px] font-body uppercase tracking-wider text-[#5E6B4A] block">
                      Medida / Variante:
                    </span>
                    <select
                      value={selectedVariant?.id}
                      onChange={(e) => {
                        const found = product.variants.find((v) => v.id === e.target.value);
                        setSelectedVariant(found);
                      }}
                      className="w-full bg-[#EFE9DF] border border-[#2B2B28]/40 text-xs font-body text-[#2B2B28] p-2.5 focus:outline-none focus:border-[#2B2B28]"
                    >
                      {product.variants.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.title} — ${v.price.toLocaleString('es-AR')}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#2B2B28] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-body uppercase text-[#4A4437] block">Precio</span>
                    <span className="text-2xl font-display text-[#2B2B28] font-normal">
                      ${currentPrice.toLocaleString('es-AR')} ARS
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(product, selectedVariant, 1);
                      onClose();
                    }}
                    className="bg-[#2B2B28] hover:bg-[#5E6B4A] text-[#EFE9DF] hover:text-[#F7F3EB] text-xs font-body font-medium uppercase tracking-[0.14em] px-5 py-3.5 border border-[#2B2B28] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Sumar al pedido
                  </button>
                </div>

                <Link
                  to={`/producto/${product.handle}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-body uppercase tracking-widest text-[#5E6B4A] hover:underline pt-2"
                >
                  <span>Ver página completa de la pieza</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};