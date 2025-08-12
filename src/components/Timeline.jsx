import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import LavaLamp from './LavaLamp';
import ParticleSystem from './ParticleSystem';

const Timeline = () => {
  const timelineData = [
    {
      date: '22/02',
      title: 'Biết đến sự tồn tại của nàng',
      description: 'Ngày đầu tiên tớ nhận ra có một người đặc biệt như dị.'
    },
    {
      date: '25/02',
      title: 'Nàng ngủ đông ',
      description: 'Một khoảng lặng trong câu chuyện ( cơ mà ôn thi sấp mặt 🙃).'
    },
    {
      date: '12/07',
      title: 'Nàng ngủ dậy',
      description: 'Ngày nàng trở lại, như một bông hoa nở rộ sau mùa đông (mùa hè) dài.'
    },
    {
      date: '22/07',
      title: 'Dòng chat đầu tiên',
      description: 'Giữ đúng lời :)).'
    },
    {
      date: '24/07',
      title: 'Chốt đơn ✨',
      description: 'Ngày chúng ta chính thức thuộc về nhau ☺️.'
    },
    {
      date: 'Tiếp',
      title: 'Tiếp tục viết.....',
      description: 'Câu chuyện của chúng ta vẫn đang được viết tiếp... Mỗi ngày trôi qua là một chương mới, và tớ rất mong được viết tiếp cùng nàng...........'
    }
  ];

  useEffect(() => {
    function checkTimelineItems() {
      const items = document.querySelectorAll('.timeline-item');
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          item.classList.add('visible');
        }
      });
    }

    window.addEventListener('scroll', checkTimelineItems);
    // Initial check
    setTimeout(checkTimelineItems, 500);

    return () => {
      window.removeEventListener('scroll', checkTimelineItems);
    };
  }, []);

  return (
    <>
      <LavaLamp />
      <ParticleSystem />
      
      {/* Floating Emojis */}
      {['☺️', '😊', '🙂', '🙃', '😳', '😍', '♥️'].map((emoji, index) => (
        <div
          key={index}
          className="floating-emoji"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`, // Add random delay for better effect
            animationDuration: `${10 + Math.random() * 10}s` // Randomize duration
          }}
        >
          {emoji}
        </div>
      ))}

      <div className="container">
        <Link to="/" className="back-link">
          ← Về trang chủ
        </Link>

        <header>
          <h1>Timeline của tớ và nàng</h1>
          <p className="subtitle">Những mốc đáng nhớ trong hành trình của chúng ta</p>
        </header>

        <div className="timeline">
          {timelineData.map((item, index) => (
            <div className="timeline-item" id={`event${index + 1}`} key={index}>
              <div className="timeline-date">{item.date}</div>
              <div className="timeline-content">
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Timeline;
