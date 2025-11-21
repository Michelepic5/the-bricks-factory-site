import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const brickColors = [
    '#D01012', // Bright Red
    '#0055BF', // Bright Blue
    '#F2CD37', // Bright Yellow
    '#237841', // Dark Green
    '#FE8A18', // Bright Orange
    '#A83E96', // Bright Purple
    '#008F9B', // Dark Turquoise
    '#95B90B', // Lime
];

const brickTypes = [
    { width: 120, height: 40, studs: 4 },
    { width: 80, height: 40, studs: 3 },
    { width: 60, height: 40, studs: 2 },
    { width: 40, height: 40, studs: 1 },
];

interface BrickData {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    tx: number;
    ty: number;
    rotation: number;
    delay: number;
}

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [bricks, setBricks] = useState<BrickData[]>([]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20, restDelta: 0.001 });

    // Generate bricks on mount/resize
    useEffect(() => {
        const generateBricks = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            const newBricks: BrickData[] = [];
            let currentY = 0;
            let rowOffset = 0;
            let idCounter = 0;

            while (currentY < height) {
                let currentX = rowOffset;
                while (currentX < width + 100) {
                    const type = brickTypes[Math.floor(Math.random() * brickTypes.length)];
                    const color = brickColors[Math.floor(Math.random() * brickColors.length)];
                    
                    // Explosion vectors
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 1000 + Math.random() * 800;
                    
                    newBricks.push({
                        id: idCounter++,
                        x: currentX,
                        y: currentY,
                        width: type.width,
                        height: type.height,
                        color,
                        tx: Math.cos(angle) * distance,
                        ty: Math.sin(angle) * distance,
                        rotation: (Math.random() - 0.5) * 1080,
                        delay: Math.random() // Random delay factor
                    });

                    currentX += type.width;
                }
                currentY += 40;
                rowOffset = rowOffset === 0 ? -60 : 0;
            }
            setBricks(newBricks);
        };

        generateBricks();
        window.addEventListener('resize', generateBricks);
        return () => window.removeEventListener('resize', generateBricks);
    }, []);

    // Animation Transforms
    const logoOpacity = useTransform(smoothProgress, [0.1, 0.4], [1, 0]);
    const logoScale = useTransform(smoothProgress, [0, 0.3], [1, 1.2]);
    
    const textOpacity = useTransform(smoothProgress, [0.4, 0.8], [0, 1]);
    const textScale = useTransform(smoothProgress, [0.4, 0.8], [0.8, 1]);
    
    const heroOpacity = useTransform(smoothProgress, [0.9, 1], [1, 0]);

    return (
        <div ref={containerRef} className="h-[200vh] relative bg-[#1a1a1a]">
            <motion.div 
                className="sticky top-0 h-screen w-full overflow-hidden z-10"
                style={{ opacity: heroOpacity }}
            >
                {/* Background Image with blur - Moved inside sticky container */}
                <div 
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url(/images/sfondo.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(8px) brightness(0.4)'
                    }}
                />

                {/* Brick Wall */}
                <div className="absolute inset-0 pointer-events-none z-20">
                    {bricks.map((brick) => (
                        <Brick 
                            key={brick.id} 
                            data={brick} 
                            progress={smoothProgress} 
                        />
                    ))}
                </div>

                {/* Logo */}
                <motion.div 
                    className="absolute inset-0 flex items-center justify-center z-30"
                    style={{ opacity: logoOpacity, scale: logoScale }}
                >
                    <img 
                        src="/images/logo.png" 
                        alt="The Bricks Factory" 
                        className="max-w-[80vw] md:max-w-[600px] h-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] filter brightness-110" 
                    />
                </motion.div>

                {/* Reveal Text */}
                <motion.div 
                    className="absolute inset-0 flex items-center justify-center z-30 px-4 pointer-events-none"
                    style={{ opacity: textOpacity, scale: textScale }}
                >
                    <h1 className="font-lego text-4xl md:text-6xl text-white leading-tight text-center drop-shadow-[0_4px_8px_rgba(0,0,0,1)]">
                        <span className="text-lego-green">Creatività e ingegneria</span> unite per esperienze <span className="text-lego-red text-stroke-white">LEGO</span> uniche.
                    </h1>
                </motion.div>
            </motion.div>
        </div>
    );
};

const Brick = ({ data, progress }: { data: BrickData, progress: any }) => {
    const { x, y, width, height, color, tx, ty, rotation, delay } = data;
    
    // Delay calculation logic from script.js: 
    // delay = (index / bricks.length) * 0.3
    // brickProgress = Math.max(0, Math.min((scrollProgress - delay) * 2, 1))
    // Here we use framer motion transforms directly
    
    // Map global progress to individual brick progress based on a "stagger" effect
    // We want the explosion to start around 0.1 and finish around 0.8
    
    const start = 0.1 + (delay * 0.2); // Random start time between 0.1 and 0.3
    const end = start + 0.4; // Duration of 0.4
    
    const p = useTransform(progress, [start, end], [0, 1]);
    
    const xVal = useTransform(p, [0, 1], [x, x + tx]);
    const yVal = useTransform(p, [0, 1], [y, y + ty]);
    const rVal = useTransform(p, [0, 1], [0, rotation]);
    // Opacity transition matching script.js logic roughly
    const opacity = useTransform(p, [0, 0.5], [1, 0]); 

    return (
        <motion.div
            style={{
                x: xVal,
                y: yVal,
                rotate: rVal,
                opacity: opacity,
                width,
                height,
                backgroundColor: color,
            }}
            className="absolute border border-black/20 shadow-sm box-border"
        >
             {/* Inner highlights for 3D effect */}
             <div className="absolute inset-0 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3),inset_2px_2px_4px_rgba(255,255,255,0.2)]" />
        </motion.div>
    );
};
