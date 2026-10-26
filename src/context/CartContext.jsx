// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import configData from '../data/config.json';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      // sessionStorage se borra automáticamente al cerrar la pestaña o iniciar nueva sesión
      const savedCart = sessionStorage.getItem('pedido-v1');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem('pedido-v1', JSON.stringify(cart));
    } catch (e) {
      console.error('Error guardando pedido en sessionStorage:', e);
    }
  }, [cart]);

  const toggleCart = () => setIsOpen((prev) => !prev);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (product, variant = null, quantity = 1) => {
    const selectedVariant = variant || product.variants?.[0];
    const key = `${product.handle}-${selectedVariant?.id || 'std'}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.key === key);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = Math.min(updated[existingIndex].quantity + quantity, 20);
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        return updated;
      }

      return [
        ...prevCart,
        {
          key,
          product,
          variant: selectedVariant,
          quantity: Math.min(quantity, 20),
          price: selectedVariant?.price || product.price
        }
      ];
    });

    openCart();
  };

  const updateQuantity = (key, quantity) => {
    if (quantity <= 0) {
      removeFromCart(key);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.key === key ? { ...item, quantity: Math.min(quantity, 20) } : item
      )
    );
  };

  const removeFromCart = (key) => {
    setCart((prevCart) => prevCart.filter((item) => item.key !== key));
  };

  const clearCart = () => setCart([]);

  const getTotalItems = () => cart.reduce((acc, item) => acc + item.quantity, 0);

  const getTotalPrice = () =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const buildWhatsAppLink = (datosCliente = {}) => {
    const numPedido = `A-${Math.floor(1000 + Math.random() * 9000)}`;
    const phone = configData.whatsappNumber;

    let msg = `Hola! Quiero hacer este pedido (N° ${numPedido}):\n\n`;

    cart.forEach((item) => {
      const varName = item.variant?.title ? ` · ${item.variant.title}` : '';
      msg += `${item.quantity}x ${item.product.title}${varName} · $${(
        item.price * item.quantity
      ).toLocaleString('es-AR')}\n`;
    });

    msg += `\nTotal estimado: $${getTotalPrice().toLocaleString('es-AR')} ARS\n`;

    if (datosCliente.nombre) msg += `Nombre: ${datosCliente.nombre}\n`;
    if (datosCliente.localidad) msg += `Localidad: ${datosCliente.localidad}\n`;
    if (datosCliente.entrega) msg += `Entrega: ${datosCliente.entrega}\n`;
    if (datosCliente.nota) msg += `Nota: ${datosCliente.nota}\n`;

    msg += `\nSé que el stock y el precio final se confirman por acá.`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        toggleCart,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
        buildWhatsAppLink
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);