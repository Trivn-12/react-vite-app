import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypedText = () => {
  const typedRef = useRef(null);
  const typedInstanceRef = useRef(null);

  useEffect(() => {
    if (typedRef.current) {
      typedInstanceRef.current = new Typed(typedRef.current, {
        strings: [
          'Tớ có điều muốn nói với nàng...',
          'tớ yêu nàng :p',
          'Nàng à ở dưới còn điều thú dị đó nha.'
        ],
        typeSpeed: 160, // Increased for smoother animation
        backSpeed: 80,  // Increased for smoother animation
        backDelay: 1500, // Reduced for faster transitions
        loop: true,
        showCursor: true,
        cursorChar: ''
      });

      // Add glow effect after delay
      const timer = setTimeout(() => {
        if (typedRef.current) {
          typedRef.current.classList.add('glow-text');
        }
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }

    return () => {
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
      }
    };
  }, []);

  return <div ref={typedRef} className="typed-text"></div>;
};

export default TypedText;
