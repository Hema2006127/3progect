import React from 'react';
import { motion } from 'framer-motion';
import { Shirt } from 'lucide-react';
import styles from './DressCode.module.css';

export const DressCode: React.FC = () => {
  const colors = [
    { name: 'أسود', hex: '#1a1a1a' },
    { name: 'كحلي', hex: '#1c2841' },
    { name: 'عنابي', hex: '#5b1e31' },
    { name: 'ذهبي', hex: '#c5a059' },
  ];

  return (
    <motion.div 
      className={`glass-panel ${styles.dressCodeContainer}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={styles.header}>
        <Shirt size={32} className={styles.icon} />
        <h2 className={styles.title}>قواعد اللباس</h2>
      </div>
      
      <p className={styles.subtitle}>
        يسعدنا حضوركم بأبهى حلة. نرجو الالتزام بالملابس الرسمية (Formal)
        ويفضل اختيار ألوان تتناسب مع طابع الحفل.
      </p>

      <div className={styles.colorsGrid}>
        {colors.map((color, index) => (
          <motion.div 
            key={index}
            className={styles.colorCard}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div 
              className={styles.colorCircle} 
              style={{ backgroundColor: color.hex }}
            ></div>
            <span>{color.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
