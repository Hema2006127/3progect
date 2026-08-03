import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, XCircle } from 'lucide-react';
import type { RSVPData } from './RSVP';
import styles from './Dashboard.module.css';

interface DashboardProps {
  rsvps: RSVPData[];
  onClose: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ rsvps, onClose }) => {
  const attendingCount = rsvps.filter(r => r.status === 'attending').length;
  const notAttendingCount = rsvps.filter(r => r.status === 'not_attending').length;
  
  return (
    <motion.div 
      className={styles.dashboardOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      dir="rtl"
    >
      <div className={`glass-panel ${styles.dashboardContainer}`}>
        <div className={styles.header}>
          <h2>لوحة التحكم - قائمة الحضور</h2>
          <button onClick={onClose} className="btn">إغلاق</button>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <Users size={32} className={styles.statIcon} style={{ color: 'var(--color-primary)' }} />
            <div className={styles.statInfo}>
              <h3>إجمالي الردود</h3>
              <p>{rsvps.length}</p>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <CheckCircle size={32} className={styles.statIcon} style={{ color: '#2e7d32' }} />
            <div className={styles.statInfo}>
              <h3>تأكيد حضور</h3>
              <p>{attendingCount}</p>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <XCircle size={32} className={styles.statIcon} style={{ color: '#c62828' }} />
            <div className={styles.statInfo}>
              <h3>اعتذار</h3>
              <p>{notAttendingCount}</p>
            </div>
          </div>
        </div>

        <div className={styles.listContainer}>
          <h3>سجل الردود</h3>
          {rsvps.length === 0 ? (
            <p className={styles.emptyState}>لا توجد ردود حتى الآن</p>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>الاسم</th>
                    <th>الحالة</th>
                    <th>وقت الرد</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((rsvp) => (
                    <tr key={rsvp.id}>
                      <td>{rsvp.name}</td>
                      <td>
                        <span className={`${styles.badge} ${rsvp.status === 'attending' ? styles.badgeSuccess : styles.badgeDanger}`}>
                          {rsvp.status === 'attending' ? 'حاضر' : 'معتذر'}
                        </span>
                      </td>
                      <td>
                        {new Intl.DateTimeFormat('ar-EG', {
                          month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
                        }).format(new Date(rsvp.timestamp))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
