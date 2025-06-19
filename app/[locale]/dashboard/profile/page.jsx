"use client";
import { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col, Nav } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { auth, getUserData } from "@/firebase";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUser, FiFileText, FiCalendar, FiSettings, FiLogOut } from "react-icons/fi";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const t = useTranslations("dashboard");
  const isNotary = userData?.signUpAs === "Notary";

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const { data } = await getUserData(user.uid);
        setUserData(data);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Sidebar */}
      <div className="d-none d-md-block position-fixed top-0 start-0" style={{ minWidth: 220, height: '100vh', backgroundColor: "#1C2434", color: "#fff", left: 0, zIndex: 1040 }}>
        <div className="p-4">
          <div className="text-center mb-4">
            <img
              src="/assets/images/logos/logo-white.png"
              alt="WiScribbles Logo"
              style={{ maxWidth: "100px", height: "auto" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", height: "80vh" }}>
            <Nav className="flex-column">
              <Nav.Link href="/dashboard" className="text-white mb-2 d-flex align-items-center">
                <LuLayoutDashboard className="me-2" style={{ fontSize: '20px' }} /> Dashboard
              </Nav.Link>
              <Nav.Link href="/dashboard/profile" className="text-white mb-2 d-flex align-items-center ">
                <FiUser className="me-2" style={{ fontSize: '20px' }} /> Profile
              </Nav.Link>
              {isNotary && (
                <Nav.Link href="/dashboard/document" className="text-white mb-2 d-flex align-items-center">
                  <FiFileText className="me-2" style={{ fontSize: '20px' }} /> Documents
                </Nav.Link>
              )}
              <Nav.Link href="/dashboard/calender" className="text-white mb-2 d-flex align-items-center">
                <FiCalendar className="me-2" style={{ fontSize: '20px' }} /> Calender
              </Nav.Link>
              <Nav.Link href="/dashboard/settings" className="text-white mb-2 d-flex align-items-center">
                <FiSettings className="me-2" style={{ fontSize: '20px' }} /> Settings
              </Nav.Link>
            </Nav>
            <div style={{ flexGrow: 1 }} />
            <Nav.Link href="/auth/signin" className="text-white mb-2 d-flex align-items-center">
              <FiLogOut className="me-2" style={{ fontSize: '20px' }} /> Logout
            </Nav.Link>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ fontFamily: "Poppins, sans-serif", minHeight: "100vh", marginLeft: 220 }}>
        <h2 className="mb-4" style={{ fontFamily: "Jost, sans-serif", fontWeight: 600, fontSize: "2rem", color: "#012E6D" }}>
          Profile Settings
        </h2>
        <Card className="shadow-sm border-0 rounded-4" style={{ maxWidth: "900px" }}>
          <Card.Body className="p-4">
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Full Name</Form.Label>
                    <Form.Control type="text" defaultValue={userData?.name} placeholder="Enter your full name" className="rounded-3" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control type="email" defaultValue={userData?.email} disabled className="rounded-3" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Phone Number</Form.Label>
                    <Form.Control type="tel" defaultValue={userData?.phone} placeholder="Enter your phone number" className="rounded-3" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">User Type</Form.Label>
                    <Form.Control type="text" defaultValue={userData?.signUpAs} disabled className="rounded-3" />
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit" className="px-4 py-2 rounded-pill shadow-sm">
                  Update Profile
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
