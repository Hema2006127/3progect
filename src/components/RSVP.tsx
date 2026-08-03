import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import styles from './RSVP.module.css';

export interface RSVPData {
  id: string;
  name: string;
  status: 'attending' | 'not_attending';
  timestamp: string;
}

interface RSVPProps {
  onRSVPSubmit: (data: RSVPData) => void;
}

export const RSVP: React.FC<RSVPProps> = ({ onRSVPSubmit }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'attending' | 'not_attending' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && status) {
      onRSVPSubmit({
        id: crypto.randomUUID(),
        name: name.trim(),
        status,
        timestamp: new Date().toISOString()
      });
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        className={`glass-panel ${styles.rsvpContainer}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className={styles.successMessage}>
          <CheckCircle2 size={48} className={styles.successIcon} />
          <h3>شكراً لتأكيدك!</h3>
          <p>{status === 'attending' ? 'ننتظرك بكل حب' : 'نفتقدك، شكراً لذوقك'}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`glass-panel ${styles.rsvpContainer}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className={styles.title}>تأكيد الحضور</h2>
      <p className={styles.subtitle}>نرجو تأكيد حضوركم قبل موعد الحفل بأسبوع</p>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">الاسم الكريم</label>
          <input 
            type="text" 
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اكتب اسمك هنا..."
            required
            className={styles.input}
          />
        </div>

        <div className={styles.statusButtons}>
          <button 
            type="button"
            className={`${styles.statusBtn} ${status === 'attending' ? styles.activeAttending : ''}`}
            onClick={() => setStatus('attending')}
          >
            <CheckCircle2 size={20} />
            تأكيد الحضور
          </button>
          
          <button 
            type="button"
            className={`${styles.statusBtn} ${status === 'not_attending' ? styles.activeNotAttending : ''}`}
            onClick={() => setStatus('not_attending')}
          >
            <XCircle size={20} />
            أعتذر عن الحضور
          </button>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={!name.trim() || !status}
          style={{ width: '100%', marginTop: '1rem' }}
        >
          إرسال
        </button>
      </form>
    </motion.div>
  );
};
