import { Play } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="min-h-screen bg-white py-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-lego text-lego-green mb-12 text-center"
      >
        Guarda che cosa ci siamo inventati
      </motion.h2>

      <div className="w-full max-w-4xl aspect-video bg-black rounded-xl shadow-2xl overflow-hidden relative mb-12 group">
        {!isPlaying ? (
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-gray-900"
            onClick={() => setIsPlaying(true)}
          >
            {/* YouTube Thumbnail Placeholder since we don't have a custom one, we use the video's max res thumb */}
            <img 
              src={`https://img.youtube.com/vi/uUkh3IP2k5s/maxresdefault.jpg`} 
              alt="Video Preview" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
            />
            <div className="z-10 w-20 h-20 bg-lego-red rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Play className="w-10 h-10 text-white fill-current" />
            </div>
          </div>
        ) : (
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/uUkh3IP2k5s?autoplay=1&start=34"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl text-center space-y-6"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-lego-red">
          Una città LEGO completamente funzionante dove ogni edificio, veicolo e impianto rappresenta un sistema reale in miniatura, compreso di meccanica ed elettronica!
        </h3>
        <p className="text-2xl md:text-3xl font-bold text-lego-green">
          Ogni singola parte della città e’ interamente controllabile tramite un’app sviluppata da noi.
        </p>
      </motion.div>
    </section>
  );
};

