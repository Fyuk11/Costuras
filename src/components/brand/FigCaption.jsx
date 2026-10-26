// src/components/brand/FigCaption.jsx
export const FigCaption = ({ numero = "01", codigo = "001", texto }) => {
    return (
      <span className="text-[11px] font-body font-medium uppercase tracking-[0.14em] text-pie">
        Fig. {numero} — Pieza N° {codigo} {texto ? `· ${texto}` : ''}
      </span>
    );
  };