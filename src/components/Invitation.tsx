import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CalendarPlus, Share2 } from 'lucide-react';
import { Countdown } from './Countdown';
import { OurStory } from './OurStory';
import { Gallery } from './Gallery';
import { WeddingTimeline } from './WeddingTimeline';
import { DressCode } from './DressCode';
import { FAQ } from './FAQ';
import { RSVP } from './RSVP';
import { Guestbook } from './Guestbook';
import type { RSVPData } from './RSVP';
import type { GuestMessage } from './Guestbook';
import styles from './Invitation.module.css';

interface InvitationProps {
  names: string;
  date: string;
  address: string;
  mapLink: string;
  messages: GuestMessage[];
  onRSVPSubmit: (data: RSVPData) => void;
  onAddMessage: (data: GuestMessage) => void;
}

export const Invitation: React.FC<InvitationProps> = ({ 
  names, date, address, mapLink, messages, onRSVPSubmit, onAddMessage 
}) => {
  const weddingDate = new Date(date);
  
  const formatDateAr = (d: Date) => {
    return new Intl.DateTimeFormat('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(d);
  };

  const handleAddToCalendar = () => {
    const eventTitle = `حفل زفاف ${names}`;
    const eventLocation = address;
    const startDate = weddingDate.toISOString().replace(/-|:|\.\d+/g, '');
    const endDateObj = new Date(weddingDate.getTime() + 4 * 60 * 60 * 1000); 
    const endDate = endDateObj.toISOString().replace(/-|:|\.\d+/g, '');

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&location=${encodeURIComponent(eventLocation)}&sf=true&output=xml`;
    window.open(googleCalendarUrl, '_blank');
  };

  const handleShareWhatsapp = () => {
    const message = `نتشرف بدعوتكم لحضور حفل زفافنا\n\n${names}\n\nيوم ${formatDateAr(weddingDate)}\n\nفي: ${address}\n\nننتظركم بكل حب! ❤️\n\n${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div 
      className={styles.invitationContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      dir="rtl"
    >
      <div className={styles.content}>
        
        {/* Main Invitation Section */}
        <motion.div 
          className="glass-panel"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className={styles.header}>
            <p className={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
            <h1 className={styles.title}>{names}</h1>
            <p className={styles.subtitle}>يتشرفان بدعوتكم لحضور حفل زفافهما وتناول طعام العشاء</p>
          </div>

          <div className={styles.details}>
            <h2 className={styles.dateLabel}>{formatDateAr(weddingDate)}</h2>
            <Countdown targetDate={date} />
          </div>

          <div className={styles.locationSection}>
            <MapPin className={styles.icon} size={28} />
            <h3>موقع الحفل</h3>
            <p>{address}</p>
            
            <div className={styles.mapContainer}>
              <iframe
                title="موقع القاعة"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.61185042898!2d31.176062164391694!3d30.05961134336044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1716314841961!5m2!1sen!2seg"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            
            <a href={mapLink} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              فتح في خرائط جوجل
            </a>
          </div>

          <div className={styles.actionsSection}>
            <button className="btn" onClick={handleAddToCalendar}>
              <CalendarPlus size={20} />
              إضافة للتقويم
            </button>
            <button className="btn" onClick={handleShareWhatsapp}>
              <Share2 size={20} />
              مشاركة عبر واتساب
            </button>
          </div>
        </motion.div>

        {/* New Sections */}
        <OurStory />
        
        <Gallery />
        
        <WeddingTimeline />
        
        <DressCode />
        
        <RSVP onRSVPSubmit={onRSVPSubmit} />
        
        <Guestbook messages={messages} onAddMessage={onAddMessage} />
        
        <FAQ />

        <div style={{ textAlign: 'center', margin: '4rem 0 2rem 0', color: 'var(--color-text-light)' }}>
          <p>صُنع بكل حب ❤️</p>
        </div>

      </div>
    </motion.div>
  );
};
