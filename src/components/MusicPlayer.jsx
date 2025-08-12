import { useState, useRef, useEffect } from 'react';

const MusicPlayer = () => {
  const [showModal, setShowModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Always show modal on load as per user request
    setShowModal(true);
  }, []);

  const playMusic = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(e => console.error("Error playing music:", e));
      setIsPlaying(true);
    }
  };

  const pauseMusic = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleYesClick = () => {
    playMusic();
    sessionStorage.setItem('musicConsent', 'yes');
    setShowModal(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const modalStyle = {
    display: showModal ? 'flex' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.8)',
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center'
  };

  const modalContentStyle = {
    background: 'rgba(42,26,78,0.9)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow)',
    padding: '30px',
    maxWidth: '400px',
    textAlign: 'center',
    color: 'var(--text)'
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
    position: 'relative'
  };

  const yesButtonStyle = {
    background: 'linear-gradient(45deg, var(--primary), #00FF00)',
    color: '#fff',
    border: 0,
    borderRadius: '999px',
    padding: '12px 25px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 255, 0, 0.4)'
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Toggle Button (hidden by default) */}
      <div className="music-player">
        <button onClick={toggleMusic}>
          {isPlaying ? '🔇' : '🎵'}
        </button>
      </div>

      {/* Music Consent Modal */}
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <h2 style={{ fontFamily: 'var(--head)', color: 'var(--primary)', marginTop: 0 }}>
            Nàng iu có muốn mở nhạc không :)?
          </h2>
          <div style={buttonContainerStyle}>
            <button style={yesButtonStyle} onClick={handleYesClick}>
              Có
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
