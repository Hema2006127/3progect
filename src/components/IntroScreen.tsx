import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './IntroScreen.module.css';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStart = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleVideoEnded = () => {
    setIsRevealed(true);
    // After revealing the names for a few seconds, complete the intro
    setTimeout(() => {
      onComplete();
    }, 3500);
  };

  return (
    <div className={styles.introContainer}>
      <video
        ref={videoRef}
        className={styles.doorVideo}
        playsInline
        onEnded={handleVideoEnded}
        muted // Ensure it can play without issues on mobile initially
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <button className={styles.tapButton} onClick={handleStart}>
              اضغط لفتح الدعوة
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRevealed && (
          <motion.div
            className={styles.revealOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.h1 
              className={styles.names}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 2, ease: "easeOut" }}
            >
              يوسف <span className={styles.ampersand}>&</span> مريم
            </motion.h1>
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              يدعوانكم لمشاركتهما فرحة العمر
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
