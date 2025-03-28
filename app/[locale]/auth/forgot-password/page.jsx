"use client";
import { Row, Col, Container } from "react-bootstrap";
import "react-phone-input-2/lib/bootstrap.css";
import Nav from "react-bootstrap/Nav";

// components

import { useTranslations } from "next-intl";
import { useState } from "react";
import ForgotPasswordMobileNumberForm from "@/components/ForgotPasswordMobileNumberForm";
import ForgotPasswordEmailForm from "@/components/ForgotPasswordEmailForm";

const ForgotPassword = () => {
  const t = useTranslations();
  const [formType, setFormType] = useState("mobile");
  return (
    <>
      <Container
        fluid
        className="d-flex align-items-center w-100 justify-content-center p-0"
      >
        <Row className="w-100 flex-row-reverse">
          {/* Right Side - Form Section */}

          <Col
            md={6}
            className="d-flex mx-auto justify-content-center position-relative vh-100 align-items-center"
          >
            <img
              src="/assets/images/logos/logo.png"
              alt={t("logo_alt")}
              title={t("logo_title")}
              className="position-absolute top-0 start-0 mt-4 ms-4"
            />
            <div className=" signin-form-container">
              <h2 style={{ fontFamily: "Jost" }}>{t("forgot_pass_heading")}</h2>
              <p>{t("forgot_pass_we_got_you")}</p>
              <p className="mt-20">{t("send_me_on")}</p>
              <div className="border p-2" style={{ borderColor: "#0C1134" }}>
                <Nav
                  fill
                  variant="pills"
                  defaultActiveKey="mobile"
                  className="gap-2 custom-tab flex-nowrap"
                >
                  <Nav.Item>
                    <Nav.Link
                      eventKey="mobile"
                      onClick={() => setFormType("mobile")}
                    >
                      {t("mobile_number_tab")}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="email"
                      onClick={() => setFormType("email")}
                    >
                      {t("email_tab")}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              {formType === "mobile" ? (
                <ForgotPasswordMobileNumberForm />
              ) : (
                <ForgotPasswordEmailForm />
              )}
            </div>
          </Col>
          {/* Left Side - Image Section */}

          <Col
            md={6}
            className="d-flex vh-100 justify-content-center align-items-center "
          >
            <img
              src="/assets/images/background/forgot-password.png"
              alt="Login Illustration"
              className="img-fluid rounded "
              style={{
                maxHeight: "95%",
                maxWidth: "100%",
              }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ForgotPassword;
