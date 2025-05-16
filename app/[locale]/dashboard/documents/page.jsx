"use client";
import { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useTranslations } from 'next-intl';
import { auth, getUserData } from '@/firebase';
import { FiUpload, FiDownload, FiTrash2 } from 'react-icons/fi';

export default function Documents() {
  const [userData, setUserData] = useState(null);
  const t = useTranslations('dashboard');

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
    <div className="p-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <h2 className="mb-5 fw-semibold" style={{ fontSize: '1.8rem' }}>My Documents</h2>

      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <Card.Title className="mb-3 fw-bold d-flex justify-content-between align-items-center">
                Identification Document
              </Card.Title>
              <Card.Text className="mb-4 text-muted">
                Status: {userData?.identificationURL ? (
                  <span className="text-success fw-medium">Uploaded</span>
                ) : (
                  <span className="text-danger fw-medium">Not Uploaded</span>
                )}
              </Card.Text>
              <div className="d-flex flex-wrap gap-2">
                <Button variant="primary" className="d-flex align-items-center">
                  <FiUpload className="me-2" /> Upload New
                </Button>
                {userData?.identificationURL && (
                  <>
                    <Button variant="outline-success" className="d-flex align-items-center">
                      <FiDownload className="me-2" /> Download
                    </Button>
                    <Button variant="outline-danger" className="d-flex align-items-center">
                      <FiTrash2 className="me-2" /> Delete
                    </Button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <Card.Title className="mb-3 fw-bold d-flex justify-content-between align-items-center">
                Notary Certificate
              </Card.Title>
              <Card.Text className="mb-4 text-muted">
                Status: {userData?.notaryCertificateURL ? (
                  <span className="text-success fw-medium">Uploaded</span>
                ) : (
                  <span className="text-danger fw-medium">Not Uploaded</span>
                )}
              </Card.Text>
              <div className="d-flex flex-wrap gap-2">
                <Button variant="primary" className="d-flex align-items-center">
                  <FiUpload className="me-2" /> Upload New
                </Button>
                {userData?.notaryCertificateURL && (
                  <>
                    <Button variant="outline-success" className="d-flex align-items-center">
                      <FiDownload className="me-2" /> Download
                    </Button>
                    <Button variant="outline-danger" className="d-flex align-items-center">
                      <FiTrash2 className="me-2" /> Delete
                    </Button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
