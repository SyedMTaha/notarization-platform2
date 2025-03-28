"use client";
import { Row, Col, Container } from "react-bootstrap";
import "react-phone-input-2/lib/bootstrap.css";
import Nav from "react-bootstrap/Nav";

// components

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import SignInMobileForm from "@/components/SignInMobileForm";
import SignInEmailForm from "@/components/SignInEmailForm";

const Login = () => {
  const t = useTranslations();
  const [formType, setFormType] = useState("mobile");
  return (
    <>
      <Container
        fluid
        className="d-flex align-items-center w-100 justify-content-center p-0"
      >
        <Row className="w-100">
          {/* Left Side - Form Section */}
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
              <h2 style={{ fontFamily: "Jost" }}>{t("sign_in_heading")}</h2>
              <p>{t("please_signin")}</p>
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
                <SignInMobileForm />
              ) : (
                <SignInEmailForm />
              )}
              <Row className="mt-3">
                <Col className="text-center ">
                  <p>
                    <Link
                      href={"/auth/forgot-password"}
                      className="text-black-50 ms-1"
                    >
                      {t("forgot_pass")}
                    </Link>
                  </p>
                  <p>
                    {t("need_account")}{" "}
                    <Link href={"/auth/signup"} className="text-black-50 ms-1">
                      <span
                        style={{
                          color: "#0C1134",
                          textDecoration: "underline",
                        }}
                      >
                        {t("create_one")}
                      </span>
                    </Link>
                  </p>
                </Col>
              </Row>
            </div>
          </Col>

          {/* Right Side - Image Section */}
          <Col
            md={6}
            className="d-flex vh-100 justify-content-center align-items-center "
          >
            <img
              src="/assets/images/background/signin.png"
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
export default Login;
