import { useEffect, useRef } from 'react';

const LavaLamp = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const blobs = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createBlobs = () => {
      for (let i = 0; i < 5; i++) {
        blobs.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 100 + 50,
          color: `hsl(${280 + Math.random() * 20}, 70%, ${50 + Math.random() * 20}%)`
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      blobs.forEach((blob) => {
        blob.x += blob.vx;
        blob.y += blob.vy;
        
        if (blob.x < 0 || blob.x > canvas.width) blob.vx *= -1;
        if (blob.y < 0 || blob.y > canvas.height) blob.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.size, 0, Math.PI * 2);
        ctx.fillStyle = blob.color;
        ctx.globalAlpha = 0.3;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    createBlobs();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="lava-lamp" />;
};

export default LavaLamp;
