import { useEffect, useState } from 'react';
import { FiBell } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '@/firebase';

export default function NotificationBell() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [nextMeeting, setNextMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchNextMeeting = async () => {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }
      // Fetch meetings for this user, status pending, order by date
      const q = query(collection(db, 'formSubmissions'), where('step1.email', '==', user.email), where('status', '==', 'pending'));
      const querySnapshot = await getDocs(q);
      const meetings = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          meetingId: data.meetingId,
          title: `${data.step1?.firstName || ''} ${data.step1?.lastName || ''}`.trim() || 'User Meeting',
          time: data.meetingTime || '10:00 AM',
          date: data.meetingDate ? new Date(data.meetingDate) : new Date(),
          status: data.status || 'pending',
        };
      });
      // Find the next meeting (closest future date)
      const now = new Date();
      const futureMeetings = meetings.filter(m => m.date >= now);
      futureMeetings.sort((a, b) => a.date - b.date);
      setNextMeeting(futureMeetings[0] || null);
      setLoading(false);
    };
    fetchNextMeeting();
  }, []);

  return (
    <div className="position-relative" style={{marginTop:'30px'}}>
      <div style={{
        height:'50px',
        width:'50px',
        borderRadius: '15px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      }}>
        <FiBell 
          className="text-muted" 
          style={{ fontSize: '24px', cursor: 'pointer' }} 
          onClick={() => setShowDropdown(!showDropdown)}
        />
      </div>
      {nextMeeting && (
        <span className="position-absolute" style={{top: '5px', right: '8px', width: '11px', height: '11px', backgroundColor: '#dc3545', borderRadius: '50%', border: '2px solid white'}}>
          <span className="visually-hidden">New notifications</span>
        </span>
      )}
      {showDropdown && (
        <div className="position-absolute end-0 mt-2" style={{ width: '300px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', zIndex: 1000 }}>
          <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
            <h6 className="m-0" style={{fontFamily:'Jost, sans-serif', fontSize:'17px'}} >Next Meeting</h6>
          </div>
          <div className="notification-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {loading ? (
              <div className="p-3 text-center text-muted">Loading...</div>
            ) : nextMeeting ? (
              <div className="p-3 border-bottom">
                <p className="mb-1"><strong>{nextMeeting.title}</strong></p>
                <p className="mb-1">{nextMeeting.date.toLocaleString()} at {nextMeeting.time}</p>
                <button className="btn btn-primary btn-sm mt-2" onClick={() => router.push(`/video-call?meetingId=${nextMeeting.meetingId}`)}>
                  Join Meeting
                </button>
              </div>
            ) : (
              <div className="p-3 text-center text-muted">No upcoming meetings</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 