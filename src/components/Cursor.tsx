import { useEffect, useRef } from 'react';

export const Cursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    class Ribbon {
      points: {x: number, y: number}[] = [];
      color: string;
      friction: number;
      
      constructor(color: string, friction: number) {
        this.color = color;
        this.friction = friction;
        this.points = [];
      }

      update(targetX: number, targetY: number) {
        // Add point
        this.points.push({x: targetX, y: targetY});
        if (this.points.length > 20) {
          this.points.shift();
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.points.length < 2) return;
        
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 7;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.moveTo(this.points[0].x, this.points[0].y);
        
        for (let i = 1; i < this.points.length; i++) {
             // Smooth curve
             const xc = (this.points[i].x + this.points[i - 1].x) / 2;
             const yc = (this.points[i].y + this.points[i - 1].y) / 2;
             ctx.quadraticCurveTo(this.points[i-1].x, this.points[i-1].y, xc, yc);
        }
        ctx.lineTo(this.points[this.points.length-1].x, this.points[this.points.length-1].y);
        ctx.stroke();
      }
    }

    const ribbons = [
      new Ribbon('#3ef639', 0.5),
      new Ribbon('#ca2620', 0.45)
    ];
    
    let cursorX = mouseX;
    let cursorY = mouseY;
    
    let cursorX2 = mouseX;
    let cursorY2 = mouseY;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth follow for ribbon 1
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      
      // Smooth follow for ribbon 2 (delayed)
      cursorX2 += (cursorX - cursorX2) * 0.2;
      cursorY2 += (cursorY - cursorY2) * 0.2;

      ribbons[0].update(cursorX, cursorY);
      ribbons[1].update(cursorX2, cursorY2);

      ribbons[0].draw(ctx);
      ribbons[1].draw(ctx);

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 mix-blend-multiply" />;
};
