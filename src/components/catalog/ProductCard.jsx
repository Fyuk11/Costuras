// src/components/catalog/ProductCard.jsx
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { FigCaption } from '../brand/FigCaption';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || null
  );
  const [isHovered, setIsHovered] = useState(false);

  const priceToDisplay = selectedVariant?.price || product.price;
  const mainImage = product.images?.[0]?.src || '';
  const hoverImage = product.images?.[1]?.src || mainImage;

  return (
    <div className="bg-[#F7F3EB] border border-[#2B2B28] flex flex-col justify-between group transition-all duration-300 shadow-xs hover:border-[#5E6B4A]">
      <div>
        {/* IMAGEN */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative aspect-4/5 bg-[#D8CDB8] overflow-hidden border-b border-[#2B2B28] cursor-pointer"
        >
          <img
            src={mainImage}
            alt={product.title}
            className={`w-full h-full object-cover transition-opacity duration-500 absolute inset-0 ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <img
            src={hoverImage}
            alt={`${product.title} en uso`}
            className={`w-full h-full object-cover transition-opacity duration-500 absolute inset-0 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {product.isNew && (
            <span className="absolute top-3 left-3 bg-[#2B2B28] text-[#EFE9DF] text-[10px] font-body uppercase tracking-widest px-2.5 py-1 font-medium">
              Nueva
            </span>
          )}
        </div>

        {/* CONTENIDO */}
        <div className="p-5 space-y-3">
          <FigCaption numero="01" codigo={product.handle.slice(0, 4)} />

          <h3 className="font-display text-2xl text-[#2B2B28] font-light leading-snug">
            {product.title}
          </h3>

          <p className="text-xs text-[#4A4437] font-body leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* SELECTOR */}
          {product.variants?.length > 1 && (
            <div className="pt-3 border-t border-[#2B2B28]/20 space-y-1">
              <span className="text-[10px] font-body uppercase tracking-wider text-[#5E6B4A] block">
                Seleccionar Medida:
              </span>
              <select
                value={selectedVariant?.id}
                onChange={(e) => {
                  const found = product.variants.find((v) => v.id === e.target.value);
                  setSelectedVariant(found);
                }}
                className="w-full bg-[#EFE9DF] border border-[#2B2B28]/30 text-xs font-body text-[#2B2B28] p-2 focus:outline-none focus:border-[#2B2B28]"
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
      </div>

      {/* FOOTER CON BOTÓN DE ALTO CONTRASTE */}
      <div className="p-5 pt-3 border-t border-[#2B2B28] flex items-center justify-between bg-[#EFE9DF]">
        <div>
          <span className="text-[10px] font-body uppercase text-[#4A4437] block">Precio</span>
          <span className="text-xl font-display text-[#2B2B28] font-normal">
            ${priceToDisplay.toLocaleString('es-AR')} ARS
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product, selectedVariant, 1);
          }}
          className="bg-[#2B2B28] hover:bg-[#5E6B4A] text-[#F7F3EB] font-body text-xs font-bold uppercase tracking-[0.1em] px-4 py-2.5 border border-[#2B2B28] transition-colors cursor-pointer shadow-xs active:scale-95"
        >
          + Sumar
        </button>
      </div>
    </div>
  );
};