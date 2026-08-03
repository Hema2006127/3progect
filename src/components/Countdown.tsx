import React, { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

interface CountdownProps {
  targetDate: string;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [
    { label: 'يوم', value: timeLeft.days },
    { label: 'ساعة', value: timeLeft.hours },
    { label: 'دقيقة', value: timeLeft.minutes },
    { label: 'ثانية', value: timeLeft.seconds }
  ];

  return (
    <div className={styles.countdownWrapper}>
      {timerComponents.map((item, index) => (
        <div key={index} className={styles.timeBox}>
          <span className={`${styles.timeValue} english-text`}>
            {String(item.value).padStart(2, '0')}
          </span>
          <span className={styles.timeLabel}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};
