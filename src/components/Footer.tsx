import { Youtube, Instagram } from 'lucide-react';

// Custom TikTok icon since Lucide might not have it in this version or I want to be safe
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Contact Form */}
        <div className="bg-white text-gray-900 rounded-2xl p-8 shadow-2xl mb-20">
          <h2 className="text-3xl font-lego text-lego-red mb-8 text-center">Contattaci</h2>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1">Nome</label>
                <input type="text" className="w-full bg-gray-100 border-0 rounded-lg p-3 focus:ring-2 focus:ring-lego-green" placeholder="Mario" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Cognome</label>
                <input type="text" className="w-full bg-gray-100 border-0 rounded-lg p-3 focus:ring-2 focus:ring-lego-green" placeholder="Rossi" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Email</label>
              <input type="email" className="w-full bg-gray-100 border-0 rounded-lg p-3 focus:ring-2 focus:ring-lego-green" placeholder="mario@esempio.it" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Messaggio</label>
              <textarea rows={4} className="w-full bg-gray-100 border-0 rounded-lg p-3 focus:ring-2 focus:ring-lego-green" placeholder="Scrivi qui il tuo messaggio..."></textarea>
            </div>
            <button className="w-full bg-lego-green hover:bg-green-500 text-white font-bold py-4 rounded-lg transition-colors text-lg shadow-lg transform hover:-translate-y-1">
              Invia Messaggio
            </button>
          </form>
        </div>

        {/* Socials */}
        <div className="text-center">
          <h3 className="text-2xl font-lego mb-8 text-white">SOCIAL</h3>
          <div className="flex justify-center space-x-8">
            <a 
              href="https://www.youtube.com/@thebricksfactory" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-white rounded-full hover:scale-110 transition-transform group"
            >
              <Youtube className="w-8 h-8 text-[#FF0000]" />
            </a>
            <a 
              href="https://www.instagram.com/thebricksfactory/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-white rounded-full hover:scale-110 transition-transform group"
            >
              <Instagram className="w-8 h-8 text-[#E1306C]" />
            </a>
            <a 
              href="https://www.tiktok.com/@thebricksfactory?is_from_webapp=1&sender_device=pc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-white rounded-full hover:scale-110 transition-transform group"
            >
              <TikTokIcon className="w-8 h-8 text-[#000000]" />
            </a>
          </div>
          <p className="mt-12 text-gray-500 text-sm">
            © {new Date().getFullYear()} The Bricks Factory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

