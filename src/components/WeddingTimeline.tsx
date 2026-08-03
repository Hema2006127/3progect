import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Camera, Utensils, Music, GlassWater } from 'lucide-react';
import styles from './WeddingTimeline.module.css';

export const WeddingTimeline: React.FC = () => {
  const events = [
    { time: '١٩:٠٠', title: 'استقبال الضيوف', icon: <GlassWater size={24} />, delay: 0 },
    { time: '٢٠:٠٠', title: 'دخول العرسان', icon: <Music size={24} />, delay: 0.2 },
    { time: '٢١:٣٠', title: 'التقاط الصور', icon: <Camera size={24} />, delay: 0.4 },
    { time: '٢٢:٣٠', title: 'طعام العشاء', icon: <Utensils size={24} />, delay: 0.6 },
  ];

  return (
    <motion.div 
      className={`glass-panel ${styles.timelineContainer}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={styles.header}>
        <Clock size={32} className={styles.icon} />
        <h2 className={styles.title}>برنامج الحفل</h2>
      </div>
      
      <div className={styles.eventsGrid}>
        {events.map((event, index) => (
          <motion.div 
            key={index}
            className={styles.eventCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: event.delay }}
          >
            <div className={styles.eventIcon}>{event.icon}</div>
            <div className={styles.eventTime}>{event.time}</div>
            <div className={styles.eventTitle}>{event.title}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
