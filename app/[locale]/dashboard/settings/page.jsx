"use client";
import { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { FiBell, FiLock, FiCreditCard } from "react-icons/fi";

export default function Settings() {
  const t = useTranslations("dashboard");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  });

  return (
    <div
      className="p-4"
      style={{ fontFamily: "Poppins, sans-serif", backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <h2
        className="mb-4"
        style={{ fontFamily: "Jost, sans-serif", fontWeight: 600, fontSize: "2rem", color: "#012E6D" }}
      >
        Account Settings
      </h2>
      <Row className="g-4">
        {/* Notification Preferences */}
        <Col md={6}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">
              <Card.Title
                className="d-flex align-items-center mb-4"
                style={{ fontFamily: "Jost, sans-serif", fontWeight: 500, fontSize: "1.25rem" }}
              >
                <FiBell className="me-2" /> Notification Preferences
              </Card.Title>
              <Form>
                <Form.Check
                  type="switch"
                  id="email-notifications"
                  label="Email Notifications"
                  checked={notifications.email}
                  onChange={(e) =>
                    setNotifications({ ...notifications, email: e.target.checked })
                  }
                  className="mb-3"
                />
                <Form.Check
                  type="switch"
                  id="push-notifications"
                  label="Push Notifications"
                  checked={notifications.push}
                  onChange={(e) =>
                    setNotifications({ ...notifications, push: e.target.checked })
                  }
                  className="mb-3"
                />
                <Form.Check
                  type="switch"
                  id="sms-notifications"
                  label="SMS Notifications"
                  checked={notifications.sms}
                  onChange={(e) =>
                    setNotifications({ ...notifications, sms: e.target.checked })
                  }
                  className="mb-4"
                />
                <Button variant="primary" className="px-4 py-2 rounded-pill shadow-sm">
                  Save Preferences
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Security & Payment Settings */}
        <Col md={6}>
          {/* Security */}
          <Card className="shadow-sm border-0 rounded-4 mb-4">
            <Card.Body className="p-4">
              <Card.Title
                className="d-flex align-items-center mb-4"
                style={{ fontFamily: "Jost, sans-serif", fontWeight: 500, fontSize: "1.25rem" }}
              >
                <FiLock className="me-2" /> Security Settings
              </Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control type="password" className="rounded-3" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type="password" className="rounded-3" />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control type="password" className="rounded-3" />
                </Form.Group>
                <Button variant="primary" className="px-4 py-2 rounded-pill shadow-sm">
                  Update Password
                </Button>
              </Form>
            </Card.Body>
          </Card>

          {/* Payment */}
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">
              <Card.Title
                className="d-flex align-items-center mb-4"
                style={{ fontFamily: "Jost, sans-serif", fontWeight: 500, fontSize: "1.25rem" }}
              >
                <FiCreditCard className="me-2" /> Payment Settings
              </Card.Title>
              <div className="mb-3">
                <strong>Current Payment Method:</strong> Credit Card ending in ****
              </div>
              <Button variant="outline-primary" className="rounded-pill px-4">
                Update Payment Method
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
