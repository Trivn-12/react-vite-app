import { useEffect, useRef } from 'react';

const ParticleSystem = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticles = () => {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        particle.style.animation = `float-particle ${Math.random() * 10 + 15}s infinite linear`;
        container.appendChild(particle);
      }
    };

    createParticles();

    // Particles are animated via CSS, so no further JS animation loop needed here.
    // The original timeline.html had an empty animate() function for ParticleSystem.

  }, []);

  return <div ref={containerRef} className="particles" id="particles"></div>;
};

export default ParticleSystem;
