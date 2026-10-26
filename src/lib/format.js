// src/lib/format.js
export const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return '$0 ARS';
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(amount);
  };