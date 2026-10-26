// src/routes/CollectionPage.jsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IndiceEditorial } from '../components/brand/IndiceEditorial';
import { ProductCard } from '../components/catalog/ProductCard';
import { ArrowLeft, Scissors, SlidersHorizontal, Sparkles } from 'lucide-react';
import productsData from '../data/products.json';

const COLLECTION_DETAILS = {
  'aire-libre': {
    title: 'Línea Aire Libre & Matera',
    subtitle: 'Piezas diseñadas para acompañar tus momentos de descanso al sol, en el parque o de viaje.',
    manifesto: 'Confeccionadas con lonas pesadas de alta resistencia y forrería 100% impermeable, garantizando durabilidad y aislamiento total de la humedad.',
    detalles: 'Ideales para resistir el uso intensivo al aire libre, fáciles de plegar y transportar con sus elásticos de sujeción.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop'
  },
  'mundo-bebes': {
    title: 'Mundo Bebés',
    subtitle: 'Suavidad, practicidad y texturas nobles para los primeros cuidados.',
    manifesto: 'Accesorios funcionales pensados para el día a día de las familias. Géneros hipoalergénicos, lavables y con terminaciones reforzadas.',
    detalles: 'Confeccionadas con telas de algodón puro y plásticos cristal impermeables de fácil limpieza para máxima higiene.',
    heroImage: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1600&auto=format&fit=crop'
  },
  'almohadones': {
    title: 'Mundo Almohadones',
    subtitle: 'El detalle de confort que transforma cualquier espacio de la casa.',
    manifesto: 'Fundas en puro tusor prelavado y rellenos mullidos que aportan volumen, calidez y un aspecto relajado a sillones y dormitorios.',
    detalles: 'Diseñados con solapas ocultas y costuras reforzadas, aptos para lavado frecuente conservando su suavidad.',
    heroImage: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1600&auto=format&fit=crop'
  },
  'hogar-bano': {
    title: 'Hogar & Baño',
    subtitle: 'Textiles livianos y nobles para vestir tus ambientes con calma.',
    manifesto: 'Cortinas de gasa de algodón que filtran la luz natural y toallones de alta absorción con texturas tipo waffle diseñados para durar.',
    detalles: 'Tejidos seleccionados que potencian la claridad y el confort hogareño con una caída natural inigualable.',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop'
  }
};

export const CollectionPage = ({ onSelectProduct }) => {
  const { id } = useParams();
  const [sortOrder, setSortOrder] = useState('featured');

  const normalizedId = id ? id.toLowerCase().trim() : '';
  const collectionInfo = COLLECTION_DETAILS[normalizedId] || {
    title: normalizedId.replace('-', ' ').toUpperCase(),
    subtitle: 'Piezas artesanales seleccionadas pieza por pieza.',
    manifesto: 'Confeccionadas con géneros nobles y terminaciones de alta durabilidad en el taller.',
    detalles: 'Cada pieza es única y elaborada con dedicación exclusiva.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop'
  };

  let collectionProducts = productsData.filter(
    (p) => p.collection === normalizedId || p.collection === normalizedId.replace('-', ' ')
  );

  if (sortOrder === 'low-high') {
    collectionProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high-low') {
    collectionProducts.sort((a, b) => b.price - a.price);
  } else if (sortOrder === 'featured') {
    collectionProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return (
    <div className="min-h-screen bg-[#EFE9DF] text-[#2B2B28] font-body pb-20">
      {/* HERO DE SECCIÓN CON EFECTO DE ZOOM LENTO Y CONTINUO */}
      <div className="relative w-full h-[52vh] min-h-[400px] bg-[#2B2B28] flex items-center justify-center overflow-hidden border-b border-[#2B2B28]">
        <img
          src={collectionInfo.heroImage}
          alt={collectionInfo.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 animate-subtle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B28] via-[#2B2B28]/50 to-[#2B2B28]/30" />

        {/* BOTÓN VOLVER ARRIBA A LA IZQUIERDA */}
        <div className="absolute top-6 left-6 sm:left-12 z-20">
          <Link
            to="/colecciones"
            className="inline-flex items-center gap-2 bg-[#2B2B28]/85 hover:bg-[#2B2B28] text-[#F7F3EB] text-[10px] font-body uppercase tracking-[0.2em] px-4 py-2.5 border border-[#F7F3EB]/30 backdrop-blur-xs transition-all shadow-lg cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#5E6B4A]" />
            <span>Volver a Colecciones</span>
          </Link>
        </div>

        {/* CONTENIDO CENTRAL */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4 pt-12">
          <span className="text-[10px] font-body uppercase tracking-[0.3em] text-[#5E6B4A] bg-[#F7F3EB] px-4 py-1.5 border border-[#2B2B28] inline-block shadow-md">
            ✦ UNIVERSO DEDICADO ✦
          </span>

          <h1 className="text-4xl sm:text-6xl font-display font-light text-[#F7F3EB] tracking-wide capitalize">
            {collectionInfo.title}
          </h1>

          <p className="text-xs sm:text-sm text-[#EFE9DF] max-w-xl mx-auto font-light leading-relaxed">
            {collectionInfo.subtitle}
          </p>
        </div>
      </div>

      {/* MANIFIESTO DE AUTOR */}
      <div className="max-w-5xl mx-auto px-6 sm:px-12 py-14">
        <div className="bg-[#F7F3EB] border border-[#2B2B28] p-8 sm:p-10 shadow-sm relative">
          <div className="absolute top-0 left-8 -translate-y-1/2 bg-[#5E6B4A] text-[#F7F3EB] text-[9px] uppercase tracking-widest px-3 py-1 font-bold flex items-center gap-1 shadow-xs">
            <Sparkles className="w-3 h-3" /> Filosofía del Universo
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pt-2">
            <div className="md:col-span-2 space-y-4">
              <h3 className="font-display text-2xl font-light text-[#2B2B28]">
                Materiales seleccionados & Confección artesanal
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4437] leading-relaxed font-body">
                {collectionInfo.manifesto} {collectionInfo.detalles}
              </p>
            </div>

            <div className="border-l border-[#2B2B28]/20 pl-6 space-y-2 flex flex-col justify-center">
              <span className="text-[10px] font-body uppercase tracking-widest text-[#5E6B4A]">
                Disponibilidad
              </span>
              <span className="font-display text-3xl text-[#2B2B28] font-normal">
                {collectionProducts.length} {collectionProducts.length === 1 ? 'Pieza' : 'Piezas'}
              </span>
              <span className="text-[10px] text-[#4A4437] italic">
                Elaboradas a mano en el atelier.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CATÁLOGO DE LA COLECCIÓN */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#2B2B28]/20">
          <div>
            <span className="text-[10px] font-body uppercase tracking-[0.25em] text-[#5E6B4A]">
              // 01 — CATÁLOGO DE LA LÍNEA
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-light text-[#2B2B28] mt-1">
              Piezas Disponibles en la Colección
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-[#F7F3EB] border border-[#2B2B28] px-3.5 py-2 shadow-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#5E6B4A]" />
            <span className="text-[10px] font-body uppercase tracking-wider text-[#4A4437]">Ordenar:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-transparent text-xs font-body font-medium text-[#2B2B28] outline-none cursor-pointer"
            >
              <option value="featured">Destacados</option>
              <option value="low-high">Precio: Menor a Mayor</option>
              <option value="high-low">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        {collectionProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#F7F3EB] border border-[#2B2B28] mt-8">
            <p className="text-sm font-display text-[#4A4437]">Pronto agregaremos nuevas piezas a este universo.</p>
            <Link to="/tienda" className="inline-block mt-4 text-xs uppercase tracking-widest underline text-[#5E6B4A] font-bold">
              Ver catálogo general →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {collectionProducts.map((product) => (
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
        )}
      </div>
    </div>
  );
};