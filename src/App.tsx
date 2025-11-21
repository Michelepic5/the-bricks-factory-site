import { Hero } from './components/Hero';
import { VideoSection } from './components/VideoSection';
import { Services } from './components/Services';
import { Replicas } from './components/Replicas';
import { Kenji } from './components/Kenji';
import { Footer } from './components/Footer';
import { Cursor } from './components/Cursor';

function App() {
  return (
    <main className="relative min-h-screen bg-white selection:bg-lego-green selection:text-white md:cursor-none">
      {/* Hide default cursor on non-touch devices where custom cursor is visible */}
      <div className="hidden md:block">
        <Cursor />
      </div>
      
      <Hero />
      <VideoSection />
      <Services />
      <Replicas />
      <Kenji />
      <Footer />
    </main>
  );
}

export default App;
