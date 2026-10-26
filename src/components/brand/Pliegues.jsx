// src/components/brand/Pliegues.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FigCaption } from './FigCaption';

const FRANJAS = [
  {
    id: 'lonas',
    titulo: 'Lonas de Pasto & Playa',
    precio: '18.500',
    fig: '01',
    codigo: '001',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'matera',
    titulo: 'Sets & Almohadones Materos',
    precio: '16.000',
    fig: '02',
    codigo: '002',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'almohadones',
    titulo: 'Almohadones Decorativos',
    precio: '21.000',
    fig: '03',
    codigo: '003',
    img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'cambiadores',
    titulo: 'Cambiadores de Bebé',
    precio: '14.500',
    fig: '04',
    codigo: '004',
    img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'cortinas',
    titulo: 'Cortinas & Baño',
    precio: '38.000',
    fig: '05',
    codigo: '005',
    img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'toallas',
    titulo: 'Toallas & Géneros',
    precio: '12.000',
    fig: '06',
    codigo: '006',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop'
  }
];

export const Pliegues = () => {
  const [activa, setActiva] = useState(0);
  const navigate = useNavigate();

  // Manejador específico para los clics en mobile (Acordeón de dos pasos)
  const handleMobileClick = (e, index, id) => {
    if (activa !== index) {
      // Primer toque: solo se expande y previene la navegación
      e.preventDefault();
      setActiva(index);
    } else {
      // Segundo toque (estando ya expandida): navega a la colección
      navigate(`/coleccion/${id}`);
    }
  };

  return (
    <div className="w-full my-8">
      {/* DESKTOP: FRANJAS HORIZONTALES CON EXPANSIÓN POR HOVER */}
      <div className="hidden md:flex h-[60vh] min-h-[420px] max-h-[640px] w-full border border-[#2B2B28] overflow-hidden bg-[#D8CDB8]">
        {FRANJAS.map((f, index) => {
          const isSelected = activa === index;
          return (
            <Link
              key={f.id}
              to={`/coleccion/${f.id}`}
              onMouseEnter={() => setActiva(index)}
              className="relative transition-[flex-grow] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] cursor-pointer overflow-hidden border-r last:border-r-0 border-[#2B2B28] group"
              style={{ flexGrow: isSelected ? 5 : 1 }}
            >
              <img
                src={f.img}
                alt={f.titulo}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* OVERLAY SUTIL */}
              <div
                className={`absolute inset-0 bg-[#2B2B28]/20 transition-opacity duration-500 ${
                  isSelected ? 'opacity-0' : 'opacity-40'
                }`}
              />

              {/* DETALLE PIE DE FOTO SI ESTÁ ACTIVA */}
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#2B2B28]/90 via-[#2B2B28]/40 to-transparent text-[#F7F3EB] flex flex-col justify-end space-y-1">
                <FigCaption numero={f.fig} codigo={f.codigo} />
                <h3 className="font-display text-2xl font-light">{f.titulo}</h3>
                <p className="font-body text-xs text-[#D8CDB8] tracking-wider">
                  Desde ${f.precio} ARS — <span className="underline text-[#5E6B4A]">Ver colección →</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* MOBILE: ACORDEÓN VERTICAL DE DOS PASOS (TOCAR PARA EXPANDIR / SEGUNDO TOCAR PARA INGRESAR) */}
      <div className="md:hidden flex flex-col border border-[#2B2B28] overflow-hidden">
        {FRANJAS.map((f, index) => {
          const isSelected = activa === index;
          return (
            <div
              key={f.id}
              onClick={(e) => handleMobileClick(e, index, f.id)}
              className={`relative transition-all duration-500 overflow-hidden border-b last:border-b-0 border-[#2B2B28] bg-[#D8CDB8] cursor-pointer ${
                isSelected ? 'h-52' : 'h-16'
              }`}
            >
              <img
                src={f.img}
                alt={f.titulo}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className={`absolute inset-0 transition-colors duration-500 ${isSelected ? 'bg-[#2B2B28]/40' : 'bg-[#2B2B28]/60'}`} />
              
              <div className="relative z-10 p-4 h-full flex flex-col justify-between text-[#F7F3EB]">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm tracking-widest text-[#F7F3EB] uppercase">
                    {f.fig} — {f.titulo}
                  </span>
                  <span className="text-xs font-body text-[#5E6B4A] bg-[#F7F3EB] px-2 py-0.5">
                    {isSelected ? '✦' : '+'}
                  </span>
                </div>

                {isSelected && (
                  <div className="space-y-2 pt-2 animate-fadeIn">
                    <p className="text-xs font-body text-[#EFE9DF]">Desde ${f.precio} ARS</p>
                    <span className="inline-block text-[11px] font-body font-bold uppercase tracking-widest text-[#F7F3EB] underline bg-[#2B2B28]/60 px-2.5 py-1">
                      Ingresar a la colección →
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};