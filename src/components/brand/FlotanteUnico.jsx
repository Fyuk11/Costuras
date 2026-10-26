// src/components/brand/FlotanteUnico.jsx
import { MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import configData from '../../data/config.json';

export const FlotanteUnico = () => {
  const { getTotalItems, getTotalPrice, openCart } = useCart();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleConsultWhatsApp = () => {
    const text = `Hola! Quiero consultar por las piezas y trabajos a medida de ${configData.brandName}.`;
    window.open(
      `https://wa.me/${configData.whatsappNumber}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center">
      {totalItems === 0 ? (
        /* ESTADO A: Pedido Vacío -> Consultar por WhatsApp */
        <button
          onClick={handleConsultWhatsApp}
          className="bg-[#5E6B4A] hover:bg-[#4E5B3A] text-[#F7F3EB] px-5 py-3.5 border border-[#2B2B28] flex items-center gap-2.5 shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer font-body"
          aria-label="Consultar por WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs font-medium uppercase tracking-[0.08em] hidden sm:inline">
            Consultar por WhatsApp
          </span>
        </button>
      ) : (
        /* ESTADO B: Pedido con ítems -> Píldora rectangular original con fondo sólido */
        <button
          onClick={openCart}
          className="bg-[#2B2B28] hover:bg-[#3B3B38] text-[#F7F3EB] px-6 py-4 border border-[#F7F3EB] flex items-center gap-3 shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer font-body"
          aria-label="Abrir mi pedido"
        >
          <ShoppingBag className="w-4 h-4 text-[#5E6B4A]" />
          <span className="text-xs font-medium uppercase tracking-[0.1em]">
            Mi pedido · {totalItems} · ${totalPrice.toLocaleString('es-AR')}
          </span>
        </button>
      )}
    </div>
  );
};