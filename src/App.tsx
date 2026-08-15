import { useState, useEffect } from 'react';
import { IntroScreen } from './components/IntroScreen';
import { Invitation } from './components/Invitation';
import { Dashboard } from './components/Dashboard';
import type { RSVPData } from './components/RSVP';
import type { GuestMessage } from './components/Guestbook';
import { Lock } from 'lucide-react';
import { MusicPlayer } from './components/MusicPlayer';

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  
  // State for mocked backend
  const [rsvps, setRsvps] = useState<RSVPData[]>([]);
  const [messages, setMessages] = useState<GuestMessage[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const savedRsvps = localStorage.getItem('wedding_rsvps');
    if (savedRsvps) setRsvps(JSON.parse(savedRsvps));

    const savedMessages = localStorage.getItem('wedding_messages');
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, []);

  const handleRSVP = (data: RSVPData) => {
    const updated = [...rsvps, data];
    setRsvps(updated);
    localStorage.setItem('wedding_rsvps', JSON.stringify(updated));
  };

  const handleAddMessage = (data: GuestMessage) => {
    const updated = [data, ...messages]; // Newest first
    setMessages(updated);
    localStorage.setItem('wedding_messages', JSON.stringify(updated));
  };

  // Set the dummy data based on user request
  const dummyNames = "محمد & ريم";
  // Wedding date in a month
  const targetDateObj = new Date();
  targetDateObj.setMonth(targetDateObj.getMonth() + 1);
  const dummyDate = targetDateObj.toISOString();
  
  const dummyAddress = "قاعة فندق الماسة، مدينة نصر، القاهرة";
  const dummyMapLink = "https://maps.app.goo.gl/dummyLinkHere";

  return (
    <div className="app-container">
      {!introComplete ? (
        <IntroScreen onComplete={() => setIntroComplete(true)} />
      ) : (
        <>
          <MusicPlayer />
          
          <Invitation 
            names={dummyNames}
            date={dummyDate}
            address={dummyAddress}
            mapLink={dummyMapLink}
            messages={messages}
            onRSVPSubmit={handleRSVP}
            onAddMessage={handleAddMessage}
          />

          {/* Hidden Admin Button */}
          <button 
            onClick={() => setShowDashboard(true)}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              background: 'transparent',
              border: 'none',
              color: 'rgba(0,0,0,0.15)',
              cursor: 'pointer',
              zIndex: 50
            }}
            title="Dashboard"
          >
            <Lock size={20} />
          </button>
        </>
      )}

      {showDashboard && (
        <Dashboard rsvps={rsvps} onClose={() => setShowDashboard(false)} />
      )}
    </div>
  );
}

export default App;
