import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import styles from './OurStory.module.css';

export const OurStory: React.FC = () => {
  return (
    <motion.div 
      className={`glass-panel ${styles.storyContainer}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={styles.header}>
        <Heart size={32} className={styles.icon} />
        <h2 className={styles.title}>قصتنا</h2>
      </div>
      
      <div className={styles.content}>
        <p>
          بدأت قصتنا بصدفة جميلة، وتطورت بمشاعر صادقة ومواقف لا تُنسى. 
          وجدنا في بعضنا الدعم، الحب، والرفيق الذي طالما بحثنا عنه.
        </p>
        <p>
          اليوم، نقف على أعتاب حياة جديدة، نكتب فيها فصلاً جديداً من قصتنا، 
          ونسعد بأن تكونوا جزءاً من بدايتنا.
        </p>
      </div>

      <div className={styles.timeline}>
        <motion.div 
          className={styles.timelineItem}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.dot}></div>
          <div className={styles.date}>أغسطس ٢٠٢٢</div>
          <h3>أول لقاء</h3>
          <p>حيث التقت العيون وبدأت القصة.</p>
        </motion.div>

        <motion.div 
          className={styles.timelineItem}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.dot}></div>
          <div className={styles.date}>ديسمبر ٢٠٢٣</div>
          <h3>الخطوبة</h3>
          <p>الوعد بالبقاء معاً للأبد.</p>
        </motion.div>

        <motion.div 
          className={styles.timelineItem}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className={styles.dot}></div>
          <div className={styles.date}>أكتوبر ٢٠٢٦</div>
          <h3>الزفاف</h3>
          <p>بداية حياتنا معاً.</p>
        </motion.div>
      </div>
    </motion.div>
  );
};
