// src/components/brand/IndiceEditorial.jsx
export const IndiceEditorial = ({ numero = "01", titulo, subtexto }) => {
    return (
      <div className="w-full my-8">
        <div className="flex items-center gap-4">
          <span className="font-display italic text-2xl sm:text-4xl text-oliva font-normal">
            {numero}
          </span>
          <h2 className="font-display text-2xl sm:text-4xl text-carbon font-light tracking-wide uppercase">
            — {titulo}
          </h2>
          <div className="flex-1 h-[1px] bg-carbon" />
        </div>
        {subtexto && (
          <p className="text-xs font-body text-pie mt-2 tracking-wider uppercase">
            {subtexto}
          </p>
        )}
      </div>
    );
  };