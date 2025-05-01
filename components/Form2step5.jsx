"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import useForm2store from "@/store/form2store";

export default function Form2step5({ totalSteps }) {
  const t = useTranslations();

  const { methods, getValidateStep } = useForm2store();

  if (!methods) return;
  const {
    register,
    control,
    getValues,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
  } = methods;

  const selectedMethod = watch("method");

  // Handle email field clearing when switching to download method

  const nextHandler = async () => {
    // Validate only step 3 fields
    const validateStep = await getValidateStep(5); // Use the custom validateStep
    const { isValid, data } = await validateStep();

    if (!isValid) return;

    console.log("validated data →", data);
    console.log("All data", getValues());

    // perform submission
  };

  // Handle selecting delivery method
  const handleMethodSelect = (method) => {
    setValue("method", method);
  };

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
            <h3 style={{ color: "#5856D6", fontWeight: 700 }}>
              {t("form2_step5_header_title")}
            </h3>
            <p style={{ color: "#5856D6" }}>
              {t("form2_step5_header_description")}
            </p>
          </div>

          {/* Subtitle */}
          <div className="text-center mb-3">
            <p style={{ color: "#333333" }}>{t("form2_step5_subtitle")}</p>
          </div>

          {/* Cards */}
          <div
            className="d-flex justify-content-center mb-4"
            style={{ gap: 16 }}
          >
            <div
              style={cardStyle(selectedMethod === "download")}
              onClick={() => handleMethodSelect("download")}
            >
              <input
                type="radio"
                id="method-download"
                value="download"
                style={{ display: "none" }}
                {...register("method")}
              />
              <img
                src="/icons/download.svg"
                alt={t("form2_step5_cards_download")}
                style={iconImgStyle}
              />
              <span style={labelStyle(selectedMethod === "download")}>
                {t("form2_step5_cards_download")}
              </span>
            </div>

            <div
              style={cardStyle(selectedMethod === "email")}
              onClick={() => handleMethodSelect("email")}
            >
              <input
                type="radio"
                id="method-email"
                value="email"
                style={{ display: "none" }}
                {...register("method")}
              />
              <img
                src="/icons/email.svg"
                alt={t("form2_step5_cards_email")}
                style={iconImgStyle}
              />
              <span style={labelStyle(selectedMethod === "email")}>
                {t("form2_step5_cards_email")}
              </span>
            </div>
          </div>

          {/* Email field */}
          {selectedMethod === "email" && (
            <div className="wizard-form-input mb-4">
              <label
                htmlFor="emailContact"
                className="form-label"
                style={{ fontWeight: 500 }}
              >
                {t("form2_step5_form_email_label")}
              </label>
              <Controller
                name="emailContact"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="emailContact"
                    type="email"
                    className="form-control form-control-lg"
                    placeholder={t("form2_step5_form_email_placeholder")}
                  />
                )}
              />
              {errors.emailContact && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {errors.emailContact.message}
                </p>
              )}
            </div>
          )}

          {/* Progress (added to match StepTwo) */}
          <div className="wizard-v3-progress">
            <span>
              3 {t("progress_step_text1")} {totalSteps}{" "}
              {t("progress_step_text2")}
            </span>
            <h3>
              {totalSteps == 3 ? "100%" : "60%"} {t("progress_step_text3")}
            </h3>
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: totalSteps == 3 ? "100%" : "60%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Decorative image */}
        <div className="vector-img-one " style={{ marginBottom: "-100px" }}>
          <img src="/assets/v3/img/vb3.png" alt="" />
        </div>

        {/* Back/Next nav */}
        <div className="actions">
          <ul>
            <li>
              <span
                className="js-btn-prev"
                title={t("form2_step5_buttons_back")}
              >
                <i className="fa fa-arrow-left"></i>{" "}
                {t("form2_step5_buttons_back")}
              </span>
            </li>
            <li>
              <span
                title={t("form2_step5_buttons_next")}
                style={{ backgroundColor: "#09123A" }}
                onClick={nextHandler}
              >
                {selectedMethod === "download"
                  ? t("form2_step5_cards_download")
                  : t("form2_step5_cards_email")}{" "}
                <i className="fa fa-arrow-right"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
