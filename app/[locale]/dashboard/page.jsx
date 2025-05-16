"use client";
import { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Card } from 'react-bootstrap';
import { useTranslations } from 'next-intl';
import { auth, getUserData } from '@/firebase';
import { FiHome, FiUser, FiFileText, FiSettings, FiLogOut } from 'react-icons/fi';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const t = useTranslations('dashboard');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const { success, data } = await getUserData(user.uid);
        if (success) {
          setUserData(data);
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <Container fluid className='p-0'>
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
            <Nav className="flex-column">
              <Nav.Link href="/dashboard" className="text-white mb-3">
                <FiHome className="me-2" /> Dashboard
              </Nav.Link>
              <Nav.Link href="/dashboard/profile" className="text-white mb-3">
                <FiUser className="me-2" /> Profile
              </Nav.Link>
              <Nav.Link href="/dashboard/documents" className="text-white mb-3">
                <FiFileText className="me-2" /> Documents
              </Nav.Link>
              <Nav.Link href="/dashboard/settings" className="text-white mb-3">
                <FiSettings className="me-2" /> Settings
              </Nav.Link>
              <Nav.Link href="/auth/signin" className="text-white mt-5">
                <FiLogOut className="me-2" /> Logout
              </Nav.Link>
            </Nav>
          </div>
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4 bg-light" style= {{borderTopLeftRadius:'30px', borderBottomLeftRadius: '30px'}}>
          <div className="mb-4">
            <h2 style={{fontFamily: 'Poppins, sans-serif'}}>Welcome back, {userData?.name}</h2>
            <p className="text-muted">Here's your dashboard overview</p>
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

            <Col md={4}>
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
            </Col>

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