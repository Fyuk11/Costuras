// src/components/catalog/CombosSection.jsx
import { useCart } from '../../context/CartContext';
import { IndiceEditorial } from '../brand/IndiceEditorial';
import { FigCaption } from '../brand/FigCaption';
import productsData from '../../data/products.json';

export const CombosSection = () => {
  const { addToCart } = useCart();

  // Filtramos solo productos etiquetados como categoría 'Combos' o con 'bundleOf'
  const combos = productsData.filter(
    (p) => p.category === 'Combos' || p.bundleOf?.length > 0
  );

  if (combos.length === 0) return null;

  return (
    <section id="combos" className="max-w-6xl mx-auto px-6 sm:px-12 py-12">
      <IndiceEditorial
        numero="02.B"
        titulo="Combos & Conjuntos Especiales"
        subtexto="Packs con ahorro directo para el hogar y al aire libre"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {combos.map((combo) => {
          const ahorro = combo.compareAtPrice
            ? combo.compareAtPrice - combo.price
            : 0;

          return (
            <div
              key={combo.handle}
              className="bg-marfil border border-carbon p-6 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-carbon/20 pb-3">
                  <span className="text-[10px] font-body uppercase tracking-[0.2em] text-oliva font-medium">
                    // BUNDLE · AHORRÁ ${ahorro.toLocaleString('es-AR')}
                  </span>
                  <FigCaption numero="02" codigo={combo.handle.slice(0, 4)} />
                </div>

                <div className="aspect-16/9 bg-arena-2 overflow-hidden border border-carbon/30">
                  <img
                    src={combo.images?.[0]?.src}
                    alt={combo.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-2xl font-display font-light text-carbon">
                  {combo.title}
                </h3>

                <p className="text-xs font-body text-pie leading-relaxed">
                  {combo.description}
                </p>
              </div>

              {/* PRECIO Y SUMAR */}
              <div className="pt-4 border-t border-carbon flex items-center justify-between bg-arena p-4 border border-carbon/20">
                <div>
                  {combo.compareAtPrice && (
                    <span className="text-xs font-body text-pie line-through block">
                      ${combo.compareAtPrice.toLocaleString('es-AR')} ARS
                    </span>
                  )}
                  <span className="text-2xl font-display text-carbon font-normal">
                    ${combo.price.toLocaleString('es-AR')} ARS
                  </span>
                </div>

                <button
                  onClick={() => addToCart(combo, combo.variants?.[0], 1)}
                  className="bg-carbon hover:bg-oliva text-arena hover:text-marfil text-xs font-body font-medium uppercase tracking-[0.14em] px-5 py-3 border border-carbon transition-colors cursor-pointer"
                >
                  Sumar Combo
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};