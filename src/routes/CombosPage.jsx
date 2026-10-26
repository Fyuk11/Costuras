// src/routes/CombosPage.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IndiceEditorial } from '../components/brand/IndiceEditorial';
import { FigCaption } from '../components/brand/FigCaption';
import { ShoppingBag, ArrowLeft, Tag } from 'lucide-react';

const COMBOS_DATA = [
  {
    id: 'combo-dia-playa',
    title: 'Combo Día de Plaza & Picnic',
    description: 'El set definitivo para disfrutar al aire libre. Incluye Lona Pampa XL (200x150cm) + Set Matero Completo + Almohadón Matero Casa.',
    originalPrice: 62500,
    price: 52500,
    discount: 'Ahorrá $10.000',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'combo-matero-completo',
    title: 'Set Matero & Almohadón Acolchado',
    description: 'Conjunto ideal para regalar o renovar tus mates. Incluye yerbero hermético, azucarero, funda acolchada y almohadón matero de 4 cavidades.',
    originalPrice: 38000,
    price: 32000,
    discount: 'Ahorrá $6.000',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop'
  }
];

export const CombosPage = () => {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-[#EFE9DF] text-[#2B2B28] font-body py-12 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-body uppercase tracking-[0.14em] text-[#4A4437] hover:text-[#2B2B28]">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>

        <IndiceEditorial
          numero="02"
          titulo="Combos & Conjuntos Especiales"
          subtexto="Packs con ahorro directo para el hogar y al aire libre"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COMBOS_DATA.map((combo) => (
            <div key={combo.id} className="bg-[#F7F3EB] border border-[#2B2B28] p-6 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#2B2B28]/20 pb-3">
                  <span className="text-[10px] font-body uppercase tracking-[0.2em] bg-[#5E6B4A] text-[#F7F3EB] px-2 py-0.5 font-bold flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {combo.discount}
                  </span>
                  <FigCaption numero="02" codigo="COMB" />
                </div>

                <div className="aspect-16/9 bg-[#D8CDB8] border border-[#2B2B28] overflow-hidden">
                  <img src={combo.image} alt={combo.title} className="w-full h-full object-cover" />
                </div>

                <h3 className="font-display text-2xl font-light text-[#2B2B28]">
                  {combo.title}
                </h3>

                <p className="text-xs text-[#4A4437] font-body leading-relaxed">
                  {combo.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#2B2B28]/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#4A4437] line-through block">
                    ${combo.originalPrice.toLocaleString('es-AR')} ARS
                  </span>
                  <span className="text-xl font-display text-[#2B2B28] font-normal">
                    ${combo.price.toLocaleString('es-AR')} ARS
                  </span>
                </div>

                <button
                  onClick={() => addToCart({ title: combo.title, price: combo.price, handle: combo.id, images: [{ src: combo.image }] }, null, 1)}
                  className="bg-[#2B2B28] hover:bg-[#5E6B4A] text-[#F7F3EB] font-body text-xs font-bold uppercase tracking-[0.1em] px-5 py-3 border border-[#2B2B28] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#5E6B4A]" />
                  Sumar Combo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};