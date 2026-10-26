// src/components/ui/Accordion.jsx
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export const AccordionItem = ({ pregunta, respuesta }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-carbon/20 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 text-left flex justify-between items-center gap-4 cursor-pointer group"
      >
        <span className="text-sm font-body text-carbon font-medium group-hover:text-oliva transition-colors">
          {pregunta}
        </span>
        <span className="p-1 border border-carbon/30 group-hover:border-oliva text-carbon group-hover:text-oliva shrink-0">
          {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </span>
      </button>

      {isOpen && (
        <div className="pb-4 text-xs font-body text-pie leading-relaxed">
          {respuesta}
        </div>
      )}
    </div>
  );
};

export const Accordion = ({ items }) => {
  return (
    <div className="border border-carbon bg-marfil p-6">
      {items.map((item, index) => (
        <AccordionItem key={index} pregunta={item.q} respuesta={item.a} />
      ))}
    </div>
  );
};