import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import TypedText from './TypedText';
import ParticleSystem from './ParticleSystem';
import LavaLamp from './LavaLamp';


const HomePage = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [isLetterVisible, setIsLetterVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [cardVisible, setCardVisible] = useState(false);
  
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const letterContentRef = useRef(null);

  const SECRET = '24-07';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollY / (windowHeight * 0.3), 1);

      if (progress > 0.5) {
        const opacity = Math.max(0, 1 - (progress - 0.5) * 2);
        setHeaderVisible(opacity > 0);
        setCardVisible(true);
        
        if (headerRef.current) {
          headerRef.current.style.opacity = opacity;
        }
      } else {
        setHeaderVisible(true);
        setCardVisible(false);
        
        if (headerRef.current) {
          headerRef.current.style.opacity = 1;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUnlock = () => {
    const value = code.trim();

    if (!value) {
      setMessage('Vui lòng nhập ngày! 📅');
      return;
    }

    if (value === SECRET) {
      setIsLetterVisible(true);
      setMessage('Đã mở khóa thành công! 💕');
      
      // Scroll to letter content with delay
      setTimeout(() => {
        if (letterContentRef.current) {
          letterContentRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 500);
    } else {
      setIsLetterVisible(false);
      setMessage('Chưa đúng rồi, thử lại nhé~ 🤔');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  };

  const messageStyle = {
    color: message.includes('thành công') ? 'var(--primary)' : '#e74c3c',
    animation: message.includes('thành công') ? 'glow 1s ease-in-out' : 'shake 0.5s ease-in-out'
  };

  return (
    <>
      <LavaLamp />
      <ParticleSystem />

      <header ref={headerRef} className="main-header">
        <TypedText />
      </header>

      <main>
        <section className={`card ${cardVisible ? 'card-visible' : ''}`} ref={cardRef}>
          <h2 style={{ margin: '0 0 8px', fontFamily: 'var(--head)', color: 'var(--primary)' }}>
            Lá thư nhỏ
          </h2>
          <p className="note">Nhập ngày "chốt đơn" để mở thư (định dạng dd-mm)</p>

          <div className="row">
            <input
              id="code"
              placeholder="dd-mm"
              inputMode="numeric"
              maxLength="5"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleUnlock}>Mở khóa</button>
          </div>
          
          {message && (
            <p className="note" style={messageStyle}>
              {message}
            </p>
          )}

          {isLetterVisible && (
            <div ref={letterContentRef} className="letter-content">
              <p style={{ color: 'var(--primary)' }}>
                Nàng à, từ ngày biết đến sự tồn tại của cậu, tớ mới hiểu rằng có những điều đẹp đẽ đến bất ngờ trong cuộc sống này.
              </p>
              <p style={{ color: 'var(--primary)', fontWeight: 500 }}>
                Cảm ơn nàng vì đã làm cuộc đời tớ thêm ý nghĩa ❤️
              </p>
              <nav style={{ textAlign: 'center', padding: '16px 0' }}>
                <Link 
                  to="/timeline" 
                  style={{ 
                    color: 'var(--primary)', 
                    textDecoration: 'none', 
                    fontWeight: 500 
                  }}
                >
                  → Xem timeline của chúng ta
                </Link>
              </nav>
            </div>
          )}
        </section>
      </main>

      {/* Spacer to enable scrolling */}
      <div className="scroll-spacer"></div>

      
    </>
  );
};

export default HomePage;
