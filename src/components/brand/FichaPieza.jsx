// src/components/brand/FichaPieza.jsx
import { useCart } from '../../context/CartContext';
import { FigCaption } from './FigCaption';

export const FichaPieza = ({ product }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <div className="bg-marfil border border-carbon p-6 sm:p-8 space-y-6 relative shadow-sm">
      {/* CABECERA ETIQUETA */}
      <div className="flex items-center justify-between border-b border-carbon/20 pb-4">
        <span className="text-[10px] font-body uppercase tracking-[0.2em] text-oliva font-medium">
          // FICHA TÉCNICA · ETIQUETA DE TELA
        </span>
        <FigCaption numero="01" codigo={product.handle.slice(0, 4)} />
      </div>

      {/* TITULO Y DESCRIPCIÓN */}
      <div>
        <h3 className="text-3xl font-display font-light text-carbon leading-tight">
          {product.title}
        </h3>
        <p className="text-xs font-body text-pie mt-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* FILAS DE DETALLE TÉCNICO */}
      <div className="space-y-3 text-xs font-body pt-2 border-t border-carbon/20">
        <div className="flex justify-between py-1.5 border-b border-carbon/10">
          <span className="text-pie uppercase tracking-wider text-[11px]">Composición</span>
          <span className="text-carbon font-medium text-right">{product.fabric?.composition || '100% Algodón / Base Impermeable'}</span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-carbon/10">
          <span className="text-pie uppercase tracking-wider text-[11px]">Cuidados</span>
          <span className="text-carbon font-medium text-right">{product.fabric?.care || 'Lavar con agua fría'}</span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-carbon/10">
          <span className="text-pie uppercase tracking-wider text-[11px]">Origen</span>
          <span className="text-carbon font-medium text-right">Confeccionado por Gabriela (Ituzaingó)</span>
        </div>
      </div>

      {/* PRECIO Y BOTÓN */}
      <div className="flex items-center justify-between pt-4 border-t border-carbon">
        <div>
          <span className="text-[10px] font-body uppercase text-pie block">Precio estimado</span>
          <span className="text-2xl font-display text-carbon">
            ${product.price.toLocaleString('es-AR')} ARS
          </span>
        </div>

        <button
          onClick={() => addToCart(product, product.variants?.[0], 1)}
          className="bg-carbon hover:bg-oliva text-arena hover:text-marfil text-xs font-body font-medium uppercase tracking-[0.14em] px-6 py-3.5 border border-carbon transition-colors cursor-pointer"
        >
          Sumar al pedido
        </button>
      </div>
    </div>
  );
};