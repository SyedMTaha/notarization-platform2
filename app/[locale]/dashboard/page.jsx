"use client";
import { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Card } from 'react-bootstrap';
import { useTranslations } from 'next-intl';
import { auth, getUserData } from '@/firebase';
import { FiHome, FiUser, FiFileText, FiSettings, FiLogOut, FiBell, FiCalendar } from 'react-icons/fi';
import { LuLayoutDashboard } from "react-icons/lu";
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const t = useTranslations('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your ID verification is pending", time: "2 hours ago" },
    { id: 2, message: "Please complete your profile", time: "1 day ago" },
  ]);

  const markAllAsRead = () => {
    setNotifications([]);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const { success, data } = await getUserData(user.uid);
        if (success) {
          console.log('User Data:', data);
          setUserData(data);
        }
      }
    };
    fetchUserData();
  }, []);

  // Function to check if user is a notary - case insensitive comparison
  const isNotary = userData?.signUpAs?.toLowerCase() === 'notary';
  console.log('Is Notary:', isNotary);
  console.log('SignUpAs Value:', userData?.signUpAs);

  return (
    <Container fluid className={`p-0 ${poppins.className}`} style={{backgroundColor:'#1c2434'}} >
      <Row>
        {/* Sidebar */}
        <Col md={2} className="text-white min-vh-100 p-0 " style={{backgroundColor:"#1C2434"}}> 
          <div className="p-4">
          <div className="text-center mb-4">
              <img
                src="/assets/images/logos/logo-white.png"
                alt="WiScribbles Logo"
                style={{ maxWidth: "100px", height: "auto" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
              <Nav className="flex-column">
                <Nav.Link href="/dashboard" className="text-white mb-2 d-flex align-items-center">
                  <LuLayoutDashboard  className="me-2"style={{ fontSize: '20px' }}  /> Dashboard
                </Nav.Link>
                <Nav.Link href="/dashboard/profile" className="text-white mb-2 d-flex align-items-center ">
                  <FiUser className="me-2" style={{ fontSize: '20px' }} /> Profile
                </Nav.Link>
                {/* Only show Documents link for notary users */}
                {isNotary && (
                  <Nav.Link href="/dashboard/document" className="text-white mb-2 d-flex align-items-center">
                    <FiFileText className="me-2" style={{ fontSize: '20px' }} /> Documents
                  </Nav.Link>
                )}
                <Nav.Link href="/dashboard/calender" className="text-white mb-2 d-flex align-items-center">
                  <FiCalendar className="me-2" style={{ fontSize: '20px' }} /> Calender
                </Nav.Link>
                <Nav.Link href="/dashboard/settings" className="text-white mb-2d-flex align-items-center">
                  <FiSettings className="me-2" style={{ fontSize: '20px' }} /> Settings
                </Nav.Link>
              </Nav>
              <div style={{ flexGrow: 1 }} />
              <Nav.Link href="/auth/signin" className="text-white">
                <FiLogOut className="me-2" style={{ fontSize: '20px' }} /> Logout
              </Nav.Link>
            </div>
          </div>
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4"  style= {{borderTopLeftRadius:'20px', borderBottomLeftRadius: '20px',
        backgroundColor:'#ffffff',
        }}>
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <div >
            <h2 style={{fontFamily: 'Poppins, sans-serif'}}>Welcome back, {userData?.name}</h2>
            <p className="text-muted">Here's your dashboard overview</p>
          </div>
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
                  onClick={() => setShowNotifications(!showNotifications)}
                />
              </div>
      {notifications.length > 0 && (
        <span className="position-absolute" style={{top: '5px',
          right: '8px',
          width: '11px',
          height: '11px',
          backgroundColor: '#dc3545',
          borderRadius: '50%',
          border: '2px solid white'}}>
          <span className="visually-hidden">New notifications</span>
        </span>
      )}
      
      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="position-absolute end-0 mt-2" style={{
          width: '300px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
          <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
            <h6 className="m-0"style={{fontFamily:'Jost, sans-serif', fontSize:'17px'}} >Notifications</h6>
            <button 
              className="btn btn-link btn-sm text-decoration-none" style={{fontFamily:'Jost, sans-serif' , fontSize:'15px'}}
              onClick={markAllAsRead}
            >
              Mark all as read
            </button>
          </div>
          <div className="notification-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div key={notification.id} className="p-3 border-bottom">
                  <p className="mb-1">{notification.message}</p>
                  <small className="text-muted">{notification.time}</small>
                </div>
              ))
            ) : (
              <div className="p-3 text-center text-muted">
                No new notifications
              </div>
            )}
          </div>
        </div>
      )}
            </div>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm" style={{borderRadius:'15px'}}>
                <Card.Body>
                  <Card.Title className="d-flex align-items-center mb-3" style={{fontFamily:'Jost, sans-serif'}} >
                    <FiUser className="me-2 text-primary" />
                    Profile Status
                  </Card.Title>
                  <Card.Text>
                    <strong>Type:</strong> {userData?.signUpAs}<br />
                    <strong>Email:</strong> {userData?.email}<br />
                    <strong>Phone:</strong> {userData?.phone}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* <Col md={4}>
              <Card className="h-100 shadow-sm" style={{borderRadius:'15px'}}>
                <Card.Body>
                  <Card.Title className="d-flex align-items-center mb-3" style={{fontFamily:'Jost, sans-serif'}}>
                    <FiFileText className="me-2 text-success" />
                    Documents
                  </Card.Title>
                  <Card.Text>
                    <div className="mb-2">
                      <strong>ID Status:</strong>{' '}
                      <span className={userData?.identificationURL ? "text-success" : "text-danger"}>
                        {userData?.identificationURL ? "✓ Uploaded" : "✗ Missing"}
                      </span>
                    </div>
                    <div>
                      <strong>Certificate Status:</strong>{' '}
                      <span className={userData?.notaryCertificateURL ? "text-success" : "text-danger"}>
                        {userData?.notaryCertificateURL ? "✓ Uploaded" : "✗ Missing"}
                      </span>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col> */}

            <Col md={4}>
              <Card className="h-100 shadow-sm"style={{borderRadius:'15px'}}>
                <Card.Body>
                  <Card.Title className="d-flex align-items-center mb-3"style={{fontFamily:'Jost, sans-serif'}}>
                    <FiSettings className="me-2 text-warning" />
                    Account Status
                  </Card.Title>
                  <Card.Text>
                    <strong>Member Since:</strong><br />
                    {new Date(userData?.createdAt).toLocaleDateString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}