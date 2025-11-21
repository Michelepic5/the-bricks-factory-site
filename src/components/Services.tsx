import { motion } from 'framer-motion';
import { Cpu, Hammer } from 'lucide-react';

const Card = ({ title, description, icon: Icon, color }: { title: string, description: string, icon: any, color: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05 }}
    className={`p-8 rounded-2xl shadow-xl bg-white border-b-8 ${color} flex flex-col items-center text-center h-full`}
  >
    <div className={`mb-6 p-4 rounded-full bg-gray-100`}>
      <Icon className={`w-12 h-12 ${color.replace('border-b-', 'text-')}`} />
    </div>
    <h3 className="text-2xl font-bold mb-4 font-lego">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

export const Services = () => {
  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-lego text-lego-green mb-16 text-center">
          Che cosa facciamo?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          <Card 
            title="Ingegneria e Informatica"
            description="Uniamo ingegneria e informatica per portare l’esperienza LEGO ad un livello successivo, creando costruzioni che non sono solo creative ma anche tecnologiche."
            icon={Cpu}
            color="border-b-lego-red"
          />
          <Card 
            title="Repliche su Misura"
            description="Creiamo repliche in mattoncini di qualsiasi oggetto e edificio. Ci rechiamo nel luogo in questione, studiamo la struttura, progettiamo il manufatto e infine lo montiamo."
            icon={Hammer}
            color="border-b-lego-green"
          />
        </div>
      </div>
    </section>
  );
};

