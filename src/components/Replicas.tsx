import { useRef } from 'react';

const ReplicaPair = ({ real, lego, title }: { real: string, lego: string, title: string }) => (
  <div className="flex-shrink-0 w-[85vw] md:w-[45vw] p-4 snap-center">
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-center font-lego">{title}</h3>
      <div className="grid grid-cols-2 gap-2 h-64 md:h-96">
        <div className="relative group overflow-hidden rounded-lg">
          <img src={real} alt="Reale" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute bottom-0 left-0 bg-black/50 text-white px-2 py-1 text-sm">Reale</div>
        </div>
        <div className="relative group overflow-hidden rounded-lg">
          <img src={lego} alt="LEGO" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute bottom-0 left-0 bg-lego-red text-white px-2 py-1 text-sm">LEGO®</div>
        </div>
      </div>
    </div>
  </div>
);

export const Replicas = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl md:text-6xl font-lego text-lego-red mb-4">
          Guarda le nostre repliche
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-semibold">
          Perlustriamo il luogo, studiamo la struttura, progettiamo il manufatto LEGO e lo costruiamo da zero
        </p>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory pb-12 px-4 space-x-8 scrollbar-hide"
        style={{ scrollPaddingLeft: '2rem', scrollPaddingRight: '2rem' }}
      >
        <ReplicaPair 
          real="/images/replies/pressa_vero.png" 
          lego="/images/replies/pressa_lego.png"
          title="Pressa"
        />
        <ReplicaPair 
          real="/images/replies/rocca%20narni%20vera.png" 
          lego="/images/replies/rocca_lego.jpg"
          title="Rocca di Narni"
        />
      </div>
      
      <p className="text-center text-gray-500 italic mt-4">
        Scorri per vedere altre realizzazioni
      </p>
    </section>
  );
};
