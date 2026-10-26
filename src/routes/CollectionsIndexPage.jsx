// src/routes/CollectionsIndexPage.jsx
import { IndiceEditorial } from '../components/brand/IndiceEditorial';
import { Pliegues } from '../components/brand/Pliegues';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const UNIVERSOS_AUTOR = [
  {
    slug: 'aire-libre',
    title: 'Línea Aire Libre & Matera',
    subtitle: 'Lonas impermeables, sets materos y accesorios para el parque o la playa.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
    count: '4 piezas'
  },
  {
    slug: 'mundo-bebes',
    title: 'Mundo Bebés',
    subtitle: 'Cambiadores portátiles, organizadores y accesorios de delicada suavidad.',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1000&auto=format&fit=crop',
    count: '2 piezas'
  },
  {
    slug: 'almohadones',
    title: 'Mundo Almohadones',
    subtitle: 'Fundas en tusor y almohadones lumbares para vestir living y dormitorios.',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop',
    count: '2 piezas'
  },
  {
    slug: 'hogar-bano',
    title: 'Hogar & Baño',
    subtitle: 'Cortinas de gasa de algodón y toallones waffle de alta absorción.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
    count: '2 piezas'
  },
  {
    slug: 'decoracion',
    title: 'Decoración & Detalles',
    subtitle: 'Complementos artesanales diseñados para aportar calidez y personalidad a cada rincón.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
    count: 'Próximamente'
  },
  {
    slug: 'generos',
    title: 'Géneros & Telas',
    subtitle: 'Selección de lonas pesadas, tusor prelavado y gasas de algodón por metro.',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop',
    count: 'Selección atelier'
  }
];

export const CollectionsIndexPage = () => {
  return (
    <div className="min-h-screen bg-[#EFE9DF] text-[#2B2B28] font-body py-12 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* TÍTULO EDITORIAL PRINCIPAL */}
        <IndiceEditorial
          numero="01"
          titulo="Colecciones & Universos"
          subtexto="Galería interactiva de géneros, telas y líneas de producto"
        />

        {/* GALERÍA PLIEGUES INTERACTIVA */}
        <Pliegues />

        {/* SECCIÓN INFORMATIVA PROFUNDIZADA CON LAS 6 COLECCIONES E IMÁGENES */}
        <div className="pt-8 border-t border-[#2B2B28]/20 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-body uppercase tracking-[0.25em] text-[#5E6B4A]">
              // FILOSOFÍA DE AUTOR
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-light text-[#2B2B28]">
              Cada universo, una identidad textil
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4437] leading-relaxed">
              Diseñamos cada línea seleccionando géneros puros que priorizan la durabilidad, el tacto noble y la armonía estética en cada ambiente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {UNIVERSOS_AUTOR.map((item) => (
              <Link
                key={item.slug}
                to={`/coleccion/${item.slug}`}
                className="group bg-[#F7F3EB] border border-[#2B2B28] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl transition-all cursor-pointer"
              >
                {/* IMAGEN DE FONDO CON ZOOM EDITORIAL */}
                <div className="aspect-16/10 overflow-hidden bg-[#2B2B28] relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B28]/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-[#2B2B28] text-[#F7F3EB] text-[9px] uppercase tracking-widest px-2.5 py-1 font-semibold border border-[#F7F3EB]/20 shadow-xs">
                    {item.count}
                  </div>
                </div>

                {/* CONTENIDO DE LA TARJETA */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-body uppercase tracking-[0.2em] text-[#5E6B4A]">
                      <Sparkles className="w-3 h-3" /> Universo Dedicado
                    </div>
                    <h3 className="font-display text-xl font-light text-[#2B2B28] leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#4A4437] font-body leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#2B2B28]/10 flex items-center justify-between">
                    <span className="text-[10px] font-body font-bold uppercase tracking-[0.14em] text-[#2B2B28] group-hover:text-[#5E6B4A] transition-colors">
                      Explorar piezas
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#2B2B28] group-hover:translate-x-1 group-hover:text-[#5E6B4A] transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};