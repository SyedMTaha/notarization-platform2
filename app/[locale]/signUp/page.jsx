"use client";
import { Row, Col, Container } from "react-bootstrap";
import "react-phone-input-2/lib/bootstrap.css";
import Link from "next/link";
import { useTranslations } from "next-intl";
import SignUpForm from "@/components/SignUpForm2";

const SignUp = () => {
  const st = useTranslations("sign-up");
  const t = useTranslations();

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Fixed Header */}
      <header style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        padding: "1rem",
        backgroundColor: "white"
      }}>
        <Link href="/">
          <img
            src="/assets/images/logos/logo.png"
            alt={t("logo_alt")}
            title={t("logo_alt")}
            style={{ maxWidth: "100px" }}
          />
        </Link>
      </header>

      {/* Main Content */}
      <div style={{ 
        display: "flex", 
        flex: 1, 
        marginTop: "80px" // Add margin to account for fixed header
      }}>
        {/* Left Container - Fixed Image */}
        <div style={{ 
          width: "50%", 
          height: "calc(100vh - 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          left: 0
        }}>
          <img
            src="/assets/images/background/signup.png"
            alt="Signup Illustration"
            className="img-fluid"
            style={{
              maxHeight: "800px",
              maxWidth: "100%",
              marginRight: "65px",
            }}
          />
        </div>

        {/* Right Container - Scrollable Form */}
        <div style={{ 
          width: "50%", 
          marginLeft: "55%",
          padding: "2rem",
          overflowY: "auto",
          height: "calc(100vh - 80px)"
        }}>
          <div className="signin-form-container">
            <h2 style={{ fontFamily: "Jost" }}>{st("title")}</h2>
            <p>{st("subtitle")}</p>
            <SignUpForm />
            <Row className="mt-3 mb-3 w-100">
              <Col>
                <p style={{textAlign:"left"}}>
                  {st("already_have_account")}{" "}
                  <Link href={"/signIn"} className="text-black-50 ms-1">
                    <span
                      style={{
                        color: "#0C1134",
                        textDecoration: "underline",
                        textAlign:"left"
                      }}
                    >
                      {st("sign_in")}
                    </span>
                  </Link>
                </p>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
