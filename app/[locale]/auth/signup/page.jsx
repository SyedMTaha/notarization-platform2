"use client";
import { Row, Col, Container } from "react-bootstrap";
import "react-phone-input-2/lib/bootstrap.css";

// components
import Link from "next/link";
import { useTranslations } from "next-intl";
import SignUpForm from "@/components/SignUpForm";

const SignUp = () => {
  const st = useTranslations("sign-up");
  const t = useTranslations();
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
            className="d-flex mx-auto justify-content-center position-relative align-items-center"
          >
            <img
              src="/assets/images/logos/logo.png"
              alt={t("logo_alt")}
              title={t("logo_alt")}
              className="position-absolute top-0 start-0 mt-4 ms-4"
            />
            <div className="signin-form-container">
              <h2 style={{ fontFamily: "Jost" }}>{st("title")}</h2>
              <p>{st("subtitle")}</p>
              <SignUpForm />
              <Row className="mt-3" style={{ width: "100%" }}>
                <Col className="text-center">
                  <p>
                    {st("already_have_account")}{" "}
                    <Link href={"/auth/signin"} className="text-black-50 ms-1">
                      <span
                        style={{
                          color: "#0C1134",
                          textDecoration: "underline",
                        }}
                      >
                        {st("sign_in")}
                      </span>
                    </Link>
                  </p>
                </Col>
              </Row>
            </div>
          </Col>

          {/* Left Side - Image Section */}
          <Col
            md={6}
            className="d-flex vh-100 justify-content-center align-items-center"
          >
            <img
              src="/assets/images/background/signup.png"
              alt="Signup Illustration"
              className="img-fluid rounded"
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
export default SignUp;