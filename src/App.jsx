// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { Home } from './routes/Home';
import { CatalogPage } from './routes/CatalogPage';
import { CollectionPage } from './routes/CollectionPage';
import { CollectionsIndexPage } from './routes/CollectionsIndexPage';
import { ProductDetail } from './routes/ProductDetail';
import { FlotanteUnico } from './components/brand/FlotanteUnico';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProductModal } from './components/catalog/ProductModal';
import { RecomendadorPopUp } from './components/brand/RecomendadorPopUp';
import { CombosPage } from './routes/CombosPage';

import configData from './data/config.json';
import { ShoppingBag, MessageCircle, Share2, Globe } from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

function Header() {
  const { toggleCart, getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const location = useLocation();

  const handleNavClick = (e, targetPath) => {
    if (targetPath === '/' && location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#EFE9DF]/95 backdrop-blur-xs border-b border-[#2B2B28] py-4 px-6 sm:px-12 flex items-center justify-between">
      <Link to="/" onClick={(e) => handleNavClick(e, '/')} className="cursor-pointer">
        <span className="text-[10px] font-body font-medium uppercase tracking-[0.2em] text-[#5E6B4A] block">
          // {configData.brandName.toUpperCase()}
        </span>
        <h1 className="text-xl sm:text-2xl font-display text-[#2B2B28] font-normal">
          Textiles & Confección A Medida
        </h1>
      </Link>

      <nav className="hidden md:flex items-center gap-8 text-xs font-body font-medium uppercase tracking-[0.12em] text-[#4A4437]">
        <Link to="/" onClick={(e) => handleNavClick(e, '/')} className="hover:text-[#2B2B28] transition-colors cursor-pointer">
          Inicio
        </Link>
        <Link to="/tienda" onClick={(e) => handleNavClick(e, '/tienda')} className="hover:text-[#2B2B28] transition-colors">Catálogo</Link>
        <Link to="/colecciones" onClick={(e) => handleNavClick(e, '/colecciones')} className="hover:text-[#2B2B28] transition-colors">Colecciones</Link>
        <Link to="/combos" onClick={(e) => handleNavClick(e, '/combos')} className="hover:text-[#2B2B28] transition-colors">Combos</Link>
      </nav>

      <button
        onClick={toggleCart}
        className="bg-[#2B2B28] text-[#F7F3EB] border border-[#2B2B28] px-4 py-2 text-xs font-body font-medium uppercase tracking-[0.1em] flex items-center gap-2.5 hover:bg-[#5E6B4A] transition-all cursor-pointer shadow-sm"
      >
        <ShoppingBag className="w-4 h-4 text-[#EFE9DF]" />
        <span className="hidden sm:inline">Mi Pedido</span>
        <span className="bg-[#5E6B4A] text-[#F7F3EB] font-bold px-1.5 py-0.5 text-[10px]">
          {totalItems}
        </span>
      </button>
    </header>
  );
}

export function MainLayout() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="min-h-screen bg-[#EFE9DF] text-[#2B2B28] font-body selection:bg-[#5E6B4A] selection:text-[#F7F3EB]">
      <ScrollToTop />

      <div className="bg-[#2B2B28] text-[#F7F3EB] text-[11px] font-body uppercase tracking-[0.14em] py-2 px-4 text-center border-b border-[#2B2B28]">
        {configData.announcementBar[0]}
      </div>

      <Header />

      <Routes>
        <Route path="/" element={<Home onSelectProduct={setSelectedProduct} />} />
        <Route path="/tienda" element={<CatalogPage onSelectProduct={setSelectedProduct} />} />
        <Route path="/colecciones" element={<CollectionsIndexPage />} />
        <Route path="/coleccion/:id" element={<CollectionPage onSelectProduct={setSelectedProduct} />} />
        <Route path="/combos" element={<CombosPage />} />
        <Route path="/producto/:handle" element={<ProductDetail />} />
      </Routes>

      {/* FOOTER SEGURO SIN ERRORES DE LIBRERÍA */}
      <footer className="bg-[#EFE9DF] py-14 pb-28 sm:pb-16 border-t border-[#2B2B28] text-[#4A4437] text-xs font-body">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="space-y-1 text-center md:text-left">
            <p className="font-display text-sm tracking-widest text-[#2B2B28] uppercase">// {configData.brandName}</p>
            <p>© {new Date().getFullYear()} {configData.brandName}. Confección artesanal por {configData.artisanName}.</p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://wa.me/5491100000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#2B2B28] hover:text-[#5E6B4A] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#5E6B4A]" /> WhatsApp
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#2B2B28] hover:text-[#5E6B4A] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-[#5E6B4A]" /> Instagram
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#2B2B28] hover:text-[#5E6B4A] transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#5E6B4A]" /> TikTok
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="uppercase tracking-widest text-[10px] text-[#5E6B4A]">Atelier Textil — Precios actualizados al {configData.updatedPricesDate}</p>
          </div>

        </div>
      </footer>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <CartDrawer />
      <FlotanteUnico />
      <RecomendadorPopUp />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <MainLayout />
      </CartProvider>
    </BrowserRouter>
  );
}