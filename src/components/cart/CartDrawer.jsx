// src/components/cart/CartDrawer.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, Send } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer = () => {
  const {
    cart,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    buildWhatsAppLink
  } = useCart();

  const [cliente, setCliente] = useState({
    nombre: '',
    localidad: '',
    entrega: 'Envío a domicilio',
    nota: ''
  });

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleEnviarPedido = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    const url = buildWhatsAppLink(cliente);
    window.open(url, '_blank');
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* OVERLAY TAPA FONDO */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-[#2B2B28]/60 backdrop-blur-sm"
          />

          {/* CONTENEDOR PRINCIPAL ADAPTADO A MOBILE Y DESKTOP */}
          <div className="fixed inset-y-0 right-0 w-full max-w-full sm:max-w-md flex justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
              className="w-full sm:w-[440px] bg-[#F7F3EB] border-l border-[#2B2B28] shadow-2xl flex flex-col justify-between relative z-50 h-full"
            >
              {/* HEADER */}
              <div className="p-5 sm:p-6 border-b border-[#2B2B28] flex items-center justify-between bg-[#EFE9DF]">
                <div>
                  <span className="text-[10px] font-body font-medium uppercase tracking-[0.2em] text-[#5E6B4A] block">
                    // TALLER SERENO
                  </span>
                  <h2 className="text-xl font-display text-[#2B2B28] font-light">
                    Mi Pedido ({totalItems})
                  </h2>
                </div>

                <button
                  onClick={closeCart}
                  className="p-2 text-[#2B2B28] hover:text-[#5E6B4A] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* LISTA Y FORMULARIO */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#F7F3EB]">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className="w-12 h-12 border border-[#2B2B28] flex items-center justify-center text-[#4A4437]">
                      <ShoppingBag className="w-6 h-6 stroke-1" />
                    </div>
                    <div>
                      <p className="text-base font-display text-[#2B2B28]">Tu pedido está vacío</p>
                      <p className="text-xs text-[#4A4437] font-body mt-1">
                        Explorá nuestras colecciones y sumá tus piezas.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cart.map((item) => {
                        const prod = item.product;
                        const varTitle = item.variant?.title || 'Estándar';
                        const subtotal = item.price * item.quantity;
                        const img = prod.images?.[0]?.src || '';

                        return (
                          <div
                            key={item.key}
                            className="bg-[#EFE9DF] p-3 sm:p-4 border border-[#2B2B28] flex gap-3 sm:gap-4 items-center justify-between"
                          >
                            <img
                              src={img}
                              alt={prod.title}
                              className="w-14 h-14 sm:w-16 sm:h-16 object-cover border border-[#2B2B28]/30 shrink-0"
                            />

                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs sm:text-sm font-display text-[#2B2B28] truncate">
                                {prod.title}
                              </h4>
                              <p className="text-[10px] sm:text-[11px] font-body text-[#5E6B4A]">
                                {varTitle}
                              </p>

                              <div className="flex items-center gap-3 mt-2">
                                <div className="flex items-center border border-[#2B2B28]/40 bg-[#F7F3EB]">
                                  <button
                                    onClick={() => updateQuantity(item.key, item.quantity - 1)}
                                    className="p-1 text-[#2B2B28] hover:bg-[#D8CDB8] cursor-pointer"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="w-6 text-center font-body text-xs font-medium">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.key, item.quantity + 1)}
                                    className="p-1 text-[#2B2B28] hover:bg-[#D8CDB8] cursor-pointer"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>

                                <span className="text-xs font-body font-medium text-[#2B2B28] ml-auto">
                                  ${subtotal.toLocaleString('es-AR')}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.key)}
                              className="p-1.5 text-[#4A4437] hover:text-[#9A3B26] transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <form className="pt-6 border-t border-[#2B2B28]/20 space-y-3">
                      <span className="text-xs font-body font-medium uppercase tracking-[0.14em] text-[#5E6B4A] block">
                        Datos para la Entrega
                      </span>

                      <div>
                        <label className="text-[11px] font-body text-[#4A4437] block uppercase">
                          Nombre completo
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          value={cliente.nombre}
                          onChange={handleChange}
                          placeholder="Ej: Laura Pérez"
                          className="w-full bg-[#EFE9DF] border border-[#2B2B28]/30 p-2.5 text-xs font-body text-[#2B2B28] focus:outline-none focus:border-[#2B2B28] mt-1"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-body text-[#4A4437] block uppercase">
                          Localidad / Zona
                        </label>
                        <input
                          type="text"
                          name="localidad"
                          value={cliente.localidad}
                          onChange={handleChange}
                          placeholder="Ej: Ituzaingó, Morón, CABA"
                          className="w-full bg-[#EFE9DF] border border-[#2B2B28]/30 p-2.5 text-xs font-body text-[#2B2B28] focus:outline-none focus:border-[#2B2B28] mt-1"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-body text-[#4A4437] block uppercase">
                          Modalidad de entrega
                        </label>
                        <select
                          name="entrega"
                          value={cliente.entrega}
                          onChange={handleChange}
                          className="w-full bg-[#EFE9DF] border border-[#2B2B28]/30 p-2.5 text-xs font-body text-[#2B2B28] focus:outline-none focus:border-[#2B2B28] mt-1"
                        >
                          <option value="Envío a domicilio">Envío a domicilio</option>
                          <option value="Retiro en Ituzaingó Centro">
                            Retiro sin cargo en Ituzaingó
                          </option>
                          <option value="Retiro en Castelar Sur">
                            Retiro sin cargo en Castelar
                          </option>
                        </select>
                      </div>
                    </form>
                  </>
                )}
              </div>

              {/* FOOTER DEL CARRITO (TOTAL + BOTONES) */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-6 border-t border-[#2B2B28] bg-[#EFE9DF] space-y-4 relative z-20">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-body text-[#4A4437] uppercase tracking-wider block">
                        Total Estimado
                      </span>
                      <span className="text-xl sm:text-2xl font-display text-[#2B2B28] font-normal">
                        ${getTotalPrice().toLocaleString('es-AR')} ARS
                      </span>
                    </div>

                    <button
                      onClick={clearCart}
                      className="text-xs font-body text-[#4A4437] hover:text-[#9A3B26] underline cursor-pointer py-1 px-2"
                    >
                      Vaciar pedido
                    </button>
                  </div>

                  <button
                    onClick={handleEnviarPedido}
                    className="w-full bg-[#2B2B28] hover:bg-[#5E6B4A] text-[#EFE9DF] font-body text-xs font-medium uppercase tracking-[0.14em] py-3.5 sm:py-4 border border-[#2B2B28] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <Send className="w-4 h-4 text-[#5E6B4A]" />
                    Enviar Pedido por WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};