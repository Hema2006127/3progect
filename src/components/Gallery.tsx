import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';
import styles from './Gallery.module.css';

const DUMMY_IMAGES = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Wedding rings
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Wedding couple
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Flowers
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Wedding cake
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Hands
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Celebration
];

export const Gallery: React.FC = () => {
  return (
    <motion.div 
      className={`glass-panel ${styles.galleryContainer}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={styles.header}>
        <ImageIcon size={32} className={styles.icon} />
        <h2 className={styles.title}>معرض الصور</h2>
      </div>
      <p className={styles.subtitle}>لحظاتنا السعيدة</p>
      
      <div className={styles.grid}>
        {DUMMY_IMAGES.map((src, index) => (
          <motion.div 
            key={index}
            className={styles.imageWrapper}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <img src={src} alt={`Wedding moment ${index + 1}`} className={styles.image} loading="lazy" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
