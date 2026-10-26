// src/routes/Home.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IndiceEditorial } from '../components/brand/IndiceEditorial';
import { Pliegues } from '../components/brand/Pliegues';
import { ProductCard } from '../components/catalog/ProductCard';
import { CombosSection } from '../components/catalog/CombosSection';
import { Accordion } from '../components/ui/Accordion';
import { Link } from 'react-router-dom';

import productsData from '../data/products.json';
import configData from '../data/config.json';
import faqsData from '../data/faqs.json';

import { ArrowDown, Scissors, ShieldCheck, Truck, Sparkles, ArrowRight } from 'lucide-react';

const HERO_IMAGES = [
  {
    url: '/images/hero-1a.jpg',
    caption: 'Colección Aire Libre — Lonas de Pasto & Playa'
  },
  {
    url: '/images/hero-1b.jpg',
    caption: 'Línea Matera — Sets en Tusor & Forro Impermeable'
  }
];

export const Home = ({ onSelectProduct }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-[#EFE9DF]">
      {/* HERO INMERSIVO DE AUTOR */}
      <section className="relative w-full h-[85vh] min-h-[550px] max-h-[800px] bg-[#2B2B28] flex items-center justify-between px-6 sm:px-16 border-b border-[#2B2B28] z-10">
        <div className="absolute inset-0 w-full h-full">
          {HERO_IMAGES.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2B2B28]/95 via-[#2B2B28]/50 to-transparent z-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B28]/80 via-transparent to-[#2B2B28]/30 z-20" />
        </div>

        <div className="absolute left-6 sm:left-12 top-0 bottom-0 z-30 flex flex-col items-center justify-between py-8 pointer-events-none">
          <div className="w-px h-full border-l-2 border-dashed border-[#F7F3EB]/40 animate-pulse" />
        </div>

        <div className="relative z-30 max-w-2xl text-left space-y-6 pl-6 sm:pl-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 bg-[#2B2B28]/90 backdrop-blur-xs text-[#F7F3EB] border border-[#F7F3EB]/40 px-3.5 py-1.5 shadow-lg"
          >
            <Scissors className="w-3.5 h-3.5 text-[#5E6B4A]" />
            <span className="text-[10px] font-body uppercase tracking-[0.2em] font-medium">
              Confección Artesanal · {configData.artisanName}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-6xl font-display font-light text-[#F7F3EB] leading-[1.08] tracking-wide drop-shadow-md"
          >
            Textiles hechos con calma, <br />
            <span className="italic font-normal text-[#D8CDB8] drop-shadow-md">
              para vivir afuera y adentro.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xs sm:text-sm text-[#F7F3EB] leading-relaxed font-body max-w-lg font-light drop-shadow-md bg-[#2B2B28]/40 p-3.5 border-l-2 border-[#5E6B4A]"
          >
            Lonas de playa y pasto, sets materos, almohadones, cortinas y cambiadores de bebé. Cosidos pieza por pieza con géneros seleccionados y terminaciones de durabilidad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-4 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/tienda"
              className="bg-[#F7F3EB] hover:bg-[#EFE9DF] text-[#2B2B28] text-xs font-body font-bold uppercase tracking-[0.16em] px-8 py-4 border border-[#F7F3EB] flex items-center gap-2 transition-all shadow-xl active:scale-95 cursor-pointer"
            >
              <span>Explorar Catálogo</span>
              <ArrowDown className="w-4 h-4 text-[#5E6B4A]" />
            </Link>

            <Link
              to="/colecciones"
              className="bg-[#2B2B28]/70 hover:bg-[#2B2B28]/95 text-[#F7F3EB] text-xs font-body font-medium uppercase tracking-[0.14em] px-6 py-4 border border-[#F7F3EB]/50 backdrop-blur-xs transition-all cursor-pointer shadow-lg"
            >
              Ver Colecciones
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="hidden lg:flex flex-col items-end relative z-30 self-end mb-12"
        >
          <div className="bg-[#F7F3EB] text-[#2B2B28] border border-[#2B2B28] p-4 shadow-2xl space-y-2 max-w-xs border-l-4 border-l-[#5E6B4A]">
            <div className="flex items-center justify-between text-[9px] font-body uppercase tracking-widest text-[#5E6B4A]">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Ficha de Colección
              </span>
              <span>0{currentSlide + 1} / 02</span>
            </div>
            <p className="font-display text-sm text-[#2B2B28] leading-tight font-medium">
              {HERO_IMAGES[currentSlide].caption}
            </p>
            <div className="flex items-center gap-1.5 pt-1">
              {HERO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1 transition-all cursor-pointer ${
                    currentSlide === i ? 'w-6 bg-[#5E6B4A]' : 'w-2 bg-[#2B2B28]/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* FRANJA DE CONFIANZA */}
      <section className="relative z-10 py-12 bg-[#F7F3EB] border-y border-[#2B2B28]">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <Scissors className="w-5 h-5 text-[#5E6B4A]" />
              <h3 className="text-sm font-display text-[#2B2B28] font-medium uppercase">Hecho a mano</h3>
              <p className="text-xs text-[#4A4437] leading-relaxed">Confección individual por Gabriela con refuerzos en costuras.</p>
            </div>
            <div className="space-y-2">
              <ShieldCheck className="w-5 h-5 text-[#5E6B4A]" />
              <h3 className="text-sm font-display text-[#2B2B28] font-medium uppercase">Materiales Probados</h3>
              <p className="text-xs text-[#4A4437] leading-relaxed">Lonetas pesadas, tusor lavable e interiores impermeables.</p>
            </div>
            <div className="space-y-2">
              <Truck className="w-5 h-5 text-[#5E6B4A]" />
              <h3 className="text-sm font-display text-[#2B2B28] font-medium uppercase">Envíos & Retiro</h3>
              <p className="text-xs text-[#4A4437] leading-relaxed">Envíos a todo el país o retiro sin cargo en Ituzaingó y Castelar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* GALERÍA PLIEGUES (LIMPIA) */}
      <section id="colecciones" className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 py-12">
        <IndiceEditorial numero="01" titulo="Colecciones" subtexto="Galería de telas y líneas de producto" />
        <Pliegues />
      </section>

      {/* SECCIÓN COMBOS (FONDO MARFIL LIMPIO CÁLIDO) */}
      <section className="relative z-10 py-12 bg-[#F7F3EB] border-y border-[#2B2B28]/20">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 space-y-8">
          <CombosSection />
          <div className="text-center pt-4">
            <Link
              to="/combos"
              className="inline-flex items-center gap-2 bg-[#2B2B28] hover:bg-[#5E6B4A] text-[#F7F3EB] text-xs font-body font-bold uppercase tracking-[0.16em] px-8 py-4 border border-[#2B2B28] transition-all shadow-md cursor-pointer"
            >
              <span>Ver todos los combos y conjuntos especiales</span>
              <ArrowRight className="w-4 h-4 text-[#5E6B4A]" />
            </Link>
          </div>
        </div>
      </section>

      {/* CATÁLOGO PRINCIPAL (LIMPIO) */}
      <section id="catalogo" className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 py-16">
        <IndiceEditorial numero="03" titulo="Catálogo de Piezas" subtexto="Hacé clic en cualquier tarjeta o visitá su página dedicada" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {productsData.map((product) => (
            <div key={product.handle} className="space-y-2">
              <div onClick={() => onSelectProduct(product)} className="cursor-pointer">
                <ProductCard product={product} />
              </div>
              <Link
                to={`/producto/${product.handle}`}
                className="block text-center text-[10px] font-body uppercase tracking-[0.14em] text-[#4A4437] hover:text-[#5E6B4A] underline pt-1"
              >
                Ver página completa de la pieza →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CORTE DE SECCIÓN Y DUDAS FRECUENTES */}
      <div className="max-w-4xl mx-auto px-6 my-8 flex items-center justify-center gap-4">
        <div className="h-px bg-[#2B2B28]/30 flex-1" />
        <span className="text-[10px] font-body uppercase tracking-[0.25em] text-[#5E6B4A]">
          // ATELIER & INFORMACIÓN
        </span>
        <div className="h-px bg-[#2B2B28]/30 flex-1" />
      </div>

      {/* PREGUNTAS FRECUENTES */}
      <section id="faqs" className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 pb-20 pt-6">
        <IndiceEditorial numero="04" titulo="Preguntas Frecuentes" subtexto="Dudas habituales sobre envíos, pagos y confección" />
        <div className="mt-8">
          <Accordion items={faqsData} />
        </div>
      </section>
    </div>
  );
};