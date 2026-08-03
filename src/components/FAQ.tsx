import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import styles from './FAQ.module.css';

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "هل يمكن اصطحاب الأطفال؟",
      answer: "نتمنى للأطفال نوماً هنيئاً، الحفل مخصص للبالغين فقط لنتمكن جميعاً من الاستمتاع بوقتنا. شكراً لتفهمكم."
    },
    {
      question: "هل تتوفر مواقف للسيارات؟",
      answer: "نعم، تتوفر مواقف مجانية للسيارات في قبو الفندق ومحيط القاعة لجميع الضيوف."
    },
    {
      question: "هل يوجد مصلى في القاعة؟",
      answer: "نعم، يوجد مصلى مخصص للرجال وآخر للنساء داخل مبنى القاعة."
    },
    {
      question: "متى يجب تأكيد الحضور؟",
      answer: "نرجو منكم تأكيد الحضور قبل موعد الحفل بأسبوع على الأقل ليتسنى لنا ترتيب الأماكن."
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.div 
      className={`glass-panel ${styles.faqContainer}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={styles.header}>
        <HelpCircle size={32} className={styles.icon} />
        <h2 className={styles.title}>الأسئلة الشائعة</h2>
      </div>

      <div className={styles.accordion}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.accordionItem}>
            <button 
              className={styles.accordionHeader} 
              onClick={() => toggleAccordion(index)}
            >
              <h3>{faq.question}</h3>
              <ChevronDown 
                size={20} 
                className={`${styles.chevron} ${activeIndex === index ? styles.rotated : ''}`} 
              />
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div 
                  className={styles.accordionContent}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
