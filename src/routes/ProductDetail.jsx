// src/routes/ProductDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FigCaption } from '../components/brand/FigCaption';
import { Accordion } from '../components/ui/Accordion';
import productsData from '../data/products.json';
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, CheckCircle, Package } from 'lucide-react';

export const ProductDetail = () => {
  const { handle } = useParams();
  const { addToCart } = useCart();

  const product = productsData.find((p) => p.handle === handle);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) return null;

  const currentPrice = selectedVariant?.price || product.price;
  const currentImg = product.images?.[activeImg]?.src || product.images?.[0]?.src;

  const faqsProducto = [
    { q: '¿Cuándo se despacha mi pedido?', a: 'Los productos listos en stock se despachan o coordinan para retiro en 24 a 48 hs hábiles.' },
    { q: '¿Cómo son las condiciones de lavado?', a: `${product.fabric?.care || 'Lavar con agua fría a máquina, no centrifugar ni usar blanqueadores.'}` },
    { q: '¿Cómo coordino el pago y el envío?', a: 'Al hacer clic en "Sumar al pedido" e ir al carrito, se genera un mensaje de WhatsApp donde coordinamos el pago (transferencia/efectivo) y la entrega.' }
  ];

  return (
    <div className="min-h-screen bg-[#EFE9DF] text-[#2B2B28] font-body py-12 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <Link to="/tienda" className="inline-flex items-center gap-2 text-xs font-body uppercase tracking-[0.14em] text-[#4A4437] hover:text-[#2B2B28]">
          <ArrowLeft className="w-4 h-4" /> Volver a la tienda
        </Link>

        {/* CONTENEDOR PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-[#F7F3EB] border border-[#2B2B28] p-6 sm:p-10 shadow-sm">
          {/* GALERÍA DE IMÁGENES CON MINIATURAS */}
          <div className="md:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            <div className="flex sm:flex-col gap-3 overflow-x-auto">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`w-16 h-16 bg-[#D8CDB8] border overflow-hidden cursor-pointer shrink-0 ${
                    activeImg === idx ? 'border-[#2B2B28] border-2' : 'border-[#2B2B28]/30'
                  }`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="flex-1 aspect-4/5 bg-[#D8CDB8] border border-[#2B2B28] overflow-hidden">
              <img src={currentImg} alt={product.title} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* CAJA LATERAL DE COMPRA */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#2B2B28]/20 pb-3">
                <span className="text-[10px] font-body uppercase tracking-[0.2em] text-[#5E6B4A] font-medium">
                  // EDICIÓN LIMITADA
                </span>
                <FigCaption numero="01" codigo={product.handle.slice(0, 4)} />
              </div>

              <h1 className="text-3xl sm:text-4xl font-display font-light text-[#2B2B28] leading-tight">
                {product.title}
              </h1>

              <p className="text-xs font-body text-[#4A4437] leading-relaxed">
                {product.description}
              </p>

              {/* OPCIONES DE MEDIDA / VARIANTES */}
              <div className="pt-3 border-t border-[#2B2B28]/20 space-y-2">
                <span className="text-xs font-body uppercase tracking-wider text-[#5E6B4A] block font-medium">
                  Seleccioná tu medida u opción:
                </span>
                <div className="space-y-2.5">
                  {product.variants?.map((v, i) => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`w-full p-4 border text-left transition-all cursor-pointer relative flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#EFE9DF] border-[#2B2B28] border-2 shadow-sm'
                            : 'bg-[#F7F3EB] border-[#2B2B28]/30 hover:border-[#2B2B28]'
                        }`}
                      >
                        {i === 0 && (
                          <span className="absolute -top-2.5 right-3 bg-[#5E6B4A] text-[#F7F3EB] text-[9px] font-body uppercase tracking-wider px-2 py-0.5 font-bold">
                            MÁS PEDIDO
                          </span>
                        )}
                        <div>
                          <p className="text-xs font-body font-medium text-[#2B2B28]">{v.title}</p>
                          <p className="text-[10px] text-[#4A4437] font-body mt-0.5">Disponibilidad para entrega inmediata</p>
                        </div>
                        <span className="text-sm font-display text-[#2B2B28] font-normal">
                          ${v.price.toLocaleString('es-AR')} ARS
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* BOTÓN CTA PRINCIPAL */}
            <div className="pt-6 border-t border-[#2B2B28] space-y-4">
              <button
                onClick={() => addToCart(product, selectedVariant, 1)}
                className="w-full bg-[#2B2B28] hover:bg-[#5E6B4A] text-[#F7F3EB] font-body text-xs font-bold uppercase tracking-[0.16em] py-4 border border-[#2B2B28] shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99]"
              >
                <ShoppingBag className="w-4 h-4 text-[#5E6B4A]" />
                Sumar al pedido — ${currentPrice.toLocaleString('es-AR')} ARS
              </button>

              <div className="grid grid-cols-2 gap-3 text-[10px] text-[#4A4437] font-body">
                <div className="flex items-center gap-2 bg-[#EFE9DF] p-2.5 border border-[#2B2B28]/20">
                  <Truck className="w-4 h-4 text-[#5E6B4A] shrink-0" />
                  <span>Envíos o retiro en Ituzaingó / Castelar</span>
                </div>
                <div className="flex items-center gap-2 bg-[#EFE9DF] p-2.5 border border-[#2B2B28]/20">
                  <ShieldCheck className="w-4 h-4 text-[#5E6B4A] shrink-0" />
                  <span>Atención personalizada por WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FICHA TÉCNICA AMPLIADA EXCLUSIVA DEL PRODUCTO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#F7F3EB] border border-[#2B2B28] p-6 space-y-4">
            <h3 className="text-xl font-display text-[#2B2B28] uppercase border-b border-[#2B2B28]/20 pb-2 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#5E6B4A]" />
              Especificaciones Técnicas
            </h3>
            <div className="space-y-2.5 text-xs font-body">
              <div className="flex justify-between py-2 border-b border-[#2B2B28]/10">
                <span className="text-[#4A4437] uppercase text-[10px]">Composición del género</span>
                <span className="text-[#2B2B28] font-medium text-right">{product.fabric?.composition || 'Tusor de algodón / Base impermeable'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#2B2B28]/10">
                <span className="text-[#4A4437] uppercase text-[10px]">Cuidados & Lavado</span>
                <span className="text-[#2B2B28] font-medium text-right">{product.fabric?.care || 'Lavar con agua fría'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#2B2B28]/10">
                <span className="text-[#4A4437] uppercase text-[10px]">Terminaciones</span>
                <span className="text-[#2B2B28] font-medium text-right">Costuras reforzadas & doblado compacto</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#2B2B28]/10">
                <span className="text-[#4A4437] uppercase text-[10px]">Origen de confección</span>
                <span className="text-[#2B2B28] font-medium text-right">Taller Sereno (Ituzaingó, Buenos Aires)</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F7F3EB] border border-[#2B2B28] p-6 space-y-4">
            <h3 className="text-xl font-display text-[#2B2B28] uppercase border-b border-[#2B2B28]/20 pb-2">
              Preguntas Frecuentes de la Pieza
            </h3>
            <Accordion items={faqsProducto} />
          </div>
        </div>
      </div>
    </div>
  );
};