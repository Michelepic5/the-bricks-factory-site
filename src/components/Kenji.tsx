import { motion } from 'framer-motion';

export const Kenji = () => {
  return (
    <section className="py-24 bg-lego-yellow/10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-lego text-lego-green mb-6">
          Lei è Kenji, la nostra costruttrice
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-16">
          E' lei l'artista che riesce a dar vita ad ogni idea attraverso i LEGO
        </p>
        
        <motion.div  
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="relative inline-block"
        >
          <div className="absolute inset-0 bg-lego-red rotate-3 rounded-3xl"></div>
          <div className="absolute inset-0 bg-lego-blue -rotate-3 rounded-3xl"></div>
          <img 
            src="/images/kenji.jpg" 
            alt="Kenji" 
            className="relative z-10 w-full max-w-md rounded-2xl shadow-2xl border-4 border-white rotate-0 hover:rotate-1 transition-transform duration-300"
          />
        </motion.div>
      </div>
    </section>
  );
};

