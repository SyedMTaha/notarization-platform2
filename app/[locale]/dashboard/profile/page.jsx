"use client";
import { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { auth, getUserData } from "@/firebase";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const t = useTranslations("dashboard");

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
    <div className="p-4" style={{ fontFamily: "Poppins, sans-serif", backgroundColor: "#f8f9fa", minHeight: "100vh", minWidth: "100vh" }}>
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
  );
}
