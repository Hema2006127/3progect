import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareHeart, Send } from 'lucide-react';
import styles from './Guestbook.module.css';

export interface GuestMessage {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

interface GuestbookProps {
  messages: GuestMessage[];
  onAddMessage: (message: GuestMessage) => void;
}

export const Guestbook: React.FC<GuestbookProps> = ({ messages, onAddMessage }) => {
  const [name, setName] = useState('');
  const [messageText, setMessageText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && messageText.trim()) {
      onAddMessage({
        id: crypto.randomUUID(),
        name: name.trim(),
        message: messageText.trim(),
        timestamp: new Date().toISOString()
      });
      setName('');
      setMessageText('');
    }
  };

  const formatDate = (isoString: string) => {
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(isoString));
  };

  return (
    <motion.div 
      className={`glass-panel ${styles.guestbookContainer}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={styles.header}>
        <MessageSquareHeart size={36} className={styles.icon} />
        <h2 className={styles.title}>جدار التهاني</h2>
      </div>
      <p className={styles.subtitle}>اترك لنا ذكرى جميلة تسعدنا</p>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="الاسم الكريم"
          required
          className={styles.input}
        />
        <textarea 
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="اكتب تهنئتك هنا..."
          required
          className={styles.textarea}
          rows={3}
        />
        <button 
          type="submit" 
          className={`btn btn-primary ${styles.submitBtn}`}
          disabled={!name.trim() || !messageText.trim()}
        >
          <Send size={18} />
          إرسال
        </button>
      </form>

      <div className={styles.messagesList}>
        {messages.length === 0 ? (
          <p className={styles.emptyState}>كن أول من يترك رسالة للعروسين!</p>
        ) : (
          messages.map((msg) => (
            <motion.div 
              key={msg.id} 
              className={styles.messageCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className={styles.messageHeader}>
                <strong>{msg.name}</strong>
                <span className={styles.date}>{formatDate(msg.timestamp)}</span>
              </div>
              <p className={styles.messageText}>{msg.message}</p>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};
