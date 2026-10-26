// src/routes/CatalogPage.jsx
import { useState } from 'react';
import { ProductCard } from '../components/catalog/ProductCard';
import { IndiceEditorial } from '../components/brand/IndiceEditorial';
import productsData from '../data/products.json';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';

export const CatalogPage = ({ onSelectProduct }) => {
  const [categoriaSel, setCategoriaSel] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('destacados');

  const categorias = ['Todas', 'Lonas', 'Sets Materos', 'Almohadones', 'Combos'];

  let filtrados = productsData.filter((prod) => {
    const matchCat = categoriaSel === 'Todas' || prod.category === categoriaSel;
    const matchText = prod.title.toLowerCase().includes(busqueda.toLowerCase()) ||
                      prod.description.toLowerCase().includes(busqueda.toLowerCase());
    return matchCat && matchText;
  });

  if (orden === 'menor-precio') {
    filtrados.sort((a, b) => a.price - b.price);
  } else if (orden === 'mayor-precio') {
    filtrados.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="min-h-screen bg-arena text-carbon font-body py-12 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <IndiceEditorial numero="TIENDA" titulo="Catálogo Completo" subtexto="Nuestras confecciones textiles disponibles" />

        {/* BARRA DE BÚSQUEDA Y FILTROS */}
        <div className="bg-marfil border border-carbon p-6 space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-pie" />
              <input
                type="text"
                placeholder="Buscar por lona, set matero, almohadón..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full bg-arena border border-carbon/30 pl-10 pr-4 py-2.5 text-xs font-body focus:outline-none focus:border-carbon"
              />
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-oliva" />
              <select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                className="bg-arena border border-carbon/30 p-2.5 text-xs font-body focus:outline-none focus:border-carbon"
              >
                <option value="destacados">Orden: Destacados</option>
                <option value="menor-precio">Precio: Menor a Mayor</option>
                <option value="mayor-precio">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>

          {/* CHIPS DE CATEGORÍA */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-carbon/10">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaSel(cat)}
                className={`px-4 py-1.5 text-xs font-body uppercase tracking-wider border cursor-pointer transition-all ${
                  categoriaSel === cat
                    ? 'bg-carbon text-arena border-carbon font-medium'
                    : 'bg-arena text-pie border-carbon/30 hover:border-carbon'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRILLA DE PRODUCTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtrados.map((product) => (
            <div key={product.handle} className="space-y-2">
              <div onClick={() => onSelectProduct(product)} className="cursor-pointer">
                <ProductCard product={product} />
              </div>
              <Link
                to={`/producto/${product.handle}`}
                className="block text-center text-[10px] font-body uppercase tracking-[0.14em] text-pie hover:text-oliva underline pt-1"
              >
                Ver detalles completos de la pieza →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};