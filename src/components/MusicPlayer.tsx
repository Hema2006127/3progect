import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import styles from './MusicPlayer.module.css';

interface MusicPlayerProps {
  // Optional URL for music. If not provided, a placeholder is used.
  musicUrl?: string; 
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ musicUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Fallback to a free sample if no URL provided (for demonstration)
  const sourceUrl = musicUrl || "https://archive.org/download/Classical_Sampler-9615/Kevin_MacLeod_-_Canon_in_D_Major.mp3";

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Handle promise for autoplay restrictions
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // We don't autoplay automatically to respect browser policies,
    // but we let the user click the button to start.
  }, []);

  return (
    <div className={styles.musicPlayerContainer}>
      <audio ref={audioRef} loop src={sourceUrl} />
      <button 
        onClick={togglePlay} 
        className={`${styles.playBtn} ${isPlaying ? styles.playing : ''}`}
        aria-label={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        {isPlaying && (
          <span className={styles.equalizer}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </span>
        )}
      </button>
    </div>
  );
};
