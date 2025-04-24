import React, { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function StepThree() {
  const t = useTranslations("step3");
  const [method, setMethod] = useState("download");
  const [email, setEmail] = useState("");

  const cardStyle = (active) => ({
    width: 120,
    height: 120,
    borderRadius: 8,
    border: "2px solid #B4D4E4",
    backgroundColor: active ? "#D0E3ED" : "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all .2s",
  });

  const iconImgStyle = { width: 40, height: 40, objectFit: "contain" };
  const labelStyle = (active) => ({
    marginTop: 8,
    fontSize: 14,
    fontWeight: 400,
    color: "#000",
    userSelect: "none",
  });

  const handleAction = () => {
    if (method === "download") {
      console.log("download document");
    } else {
      console.log("send to", email);
    }
  };

  return (
    <div className="multisteps-form__panel" data-animation="slideHorz">
      <Link legacyBehavior href="/">
        <a>
          <img
            src="/assets/images/logos/logo.png"
            style={{ marginLeft: "20px", marginTop: "20px" }}
            alt="Logo"
            title="Logo"
          />
        </a>
      </Link>

      <div className="wizard-forms">
        <div className="inner pb-100 clearfix">
          {/* Header */}
          <div className="wizard-title text-center">
            <h3 style={{ color: "#5856D6", fontWeight: 700 }}>{t("header.title")}</h3>
            <p style={{ color: "#5856D6" }}>{t("header.description")}</p>
          </div>

          {/* Subtitle */}
          <div className="text-center mb-3">
            <p style={{ color: "#333333" }}>{t("subtitle")}</p>
          </div>

          {/* Cards */}
          <div className="d-flex justify-content-center mb-4" style={{ gap: 16 }}>
            <div style={cardStyle(method === "download")} onClick={() => setMethod("download")}>
              <img src="/icons/download.svg" alt={t("cards.download")} style={iconImgStyle} />
              <span style={labelStyle(method === "download")}>{t("cards.download")}</span>
            </div>

            <div style={cardStyle(method === "email")} onClick={() => setMethod("email")}>
              <img src="/icons/email.svg" alt={t("cards.email")} style={iconImgStyle} />
              <span style={labelStyle(method === "email")}>{t("cards.email")}</span>
            </div>
          </div>

          {/* Email field */}
          {method === "email" && (
            <div className="wizard-form-input mb-4">
              <label htmlFor="email" className="form-label" style={{ fontWeight: 500 }}>
                {t("form.emailLabel")}
              </label>
              <input
                id="email"
                type="email"
                className="form-control form-control-lg"
                placeholder={t("form.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          {/* Action button */}
          <div className="d-flex justify-content-end">
            <button
              onClick={handleAction}
              style={{
                backgroundColor: "#274171",
                color: "#fff",
                padding: "14px 26px",
                fontSize: "19px",
                fontWeight: 700,
              }}
            >
              {method === "download" ? t("cards.download") : t("cards.email")}{" "}
              <i className="fa fa-arrow-right"></i>
            </button>
          </div>
        </div>

        {/* Decorative image */}
        <div className="vector-img-one">
          <img src="/assets/v3/img/vb3.png" alt="" />
        </div>

        {/* Back/Next nav */}
        <div className="actions">
          <ul>
            <li>
              <span className="js-btn-prev" title={t("buttons.back")}>
                <i className="fa fa-arrow-left"></i> {t("buttons.back")}
              </span>
            </li>
            <li>
              <span className="js-btn-next" title={t("buttons.next")}>
                {t("buttons.next")} <i className="fa fa-arrow-right"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
