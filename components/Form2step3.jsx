"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import useForm2store from "@/store/form2store";

export default function Form2step3({ totalSteps }) {
  const t = useTranslations();

  const { methods, getValidateStep } = useForm2store();
  const nextBtnRef = useRef(null);
  const [signatureImage, setSignatureImage] = useState(null);
  if (!methods) return;

  const {
    register,
    control,
    setError,
    getValues,
    watch,
    formState: { errors },
    setValue,
  } = methods;
  const selectedMethod = watch("signatureMethod");
  const nextHandler = async () => {
    // Validate only step 3 fields
    const validateStep = await getValidateStep(3); // Use the custom validateStep
    const { isValid, data } = await validateStep();
    if (!isValid) return;
    if (!signatureImage) {
      setError("signatureImage", {
        type: "manual",
        message: t("form2_step3_error_message"),
      });
      return;
    }
    ///upload image
    const imgUrl = "abc";
    const payload = {
      ...data,
      signatureImage: imgUrl,
    };

    console.log("validated data →", payload);
    console.log("All data", getValues());
    // Proceed to next step
    nextBtnRef.current?.click();
  };

  // Handle selecting delivery method
  const handleMethodSelect = (method) => {
    setSignatureImage(null);
    setValue("signatureMethod", method);
  };
  const readURL = (event, id) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Perform actions with the selected file
      // Create a FileReader to read the file
      const reader = new FileReader();

      // Define the onload event for the reader
      reader.onload = () => {
        // Set the result as the source URL
        setSignatureImage(selectedFile);

        document.getElementById(id).setAttribute("src", reader.result);
      };

      // Read the file as a data URL
      reader.readAsDataURL(selectedFile);
    }
  };

  const cardStyle = (active) => ({
    width: 170,
    height: 170,
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

  const iconImgStyle = { width: 60, height: 60, objectFit: "contain" };

  const labelStyle = (active) => ({
    marginTop: 8,
    fontSize: 14,
    fontWeight: 400,
    color: "#000",
    userSelect: "none",
    fontWeight: "bold",
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
              {t("form2_step3_signature_notarization_title")}
            </h3>
            <p className="mt-2" style={{ color: "#5856D6" }}>
              {t("form2_step3_choose_signature_method")}
            </p>
          </div>

          {/* Subtitle */}
          <div className="text-center mb-3">
            <p style={{ color: "#333333", fontSize: 20, fontWeight: "bold" }}>
              {t("form2_step3_e_sign_or_notary")}
            </p>
          </div>

          {/* Cards */}
          <div
            className="d-flex justify-content-center mb-4 "
            style={{ gap: 16 }}
          >
            <div
              style={cardStyle(selectedMethod === "E-Sign")}
              onClick={() => handleMethodSelect("E-Sign")}
            >
              <input
                type="radio"
                id="method-download"
                value="download"
                style={{ display: "none" }}
                {...register("signatureMethod")}
              />
              <img
                src="/assets/images/e-sign.png"
                className="w-10"
                style={iconImgStyle}
              />
              <span style={labelStyle(selectedMethod === "E-Sign")}>
                {t("form2_step3_e_sign")}
              </span>
            </div>

            <div
              style={cardStyle(selectedMethod === "Notary")}
              onClick={() => handleMethodSelect("Notary")}
            >
              <input
                type="radio"
                id="method-email"
                value="email"
                style={{ display: "none" }}
                {...register("signatureMethod")}
              />
              <img
                src="/assets/images/connect_to_notary.png"
                style={iconImgStyle}
              />
              <span style={labelStyle(selectedMethod === "Notary")}>
                {t("form2_step3_connect_notary")}
              </span>
            </div>
          </div>
          {/* Signature Image upload */}
          <h4>{t("form2_step3_sign_to_continue")}</h4>
          <div
            style={{
              width: "100%",
            }}
            className="p-2  "
          >
            <label
              htmlFor="signatureImage"
              className="text-center rounded  d-flex flex-column align-items-center justify-content-center"
              style={{
                width: "100%",
                minHeight: "600px",
                borderRadius: 8,
                border: "2px solid #B4D4E4",
                backgroundColor:
                  selectedMethod === "E-Sign"
                    ? "#FFFFFF"
                    : signatureImage
                    ? "#FFFFFF"
                    : "gray",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all .2s",
              }}
            >
              <input
                id="signatureImage"
                {...register("signatureImage")}
                onChange={(e) => readURL(e, "signatureImage_identification")}
                type="file"
                style={{ display: "none" }}
              />
              <div
                className="display-img text-center "
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              >
                <img
                  id="signatureImage_identification"
                  style={{
                    width: signatureImage ? "300px" : "auto",
                  }}
                  src={
                    selectedMethod === "E-Sign"
                      ? "/assets/images/upload_doc.png"
                      : "/assets/images/camera_icon.png"
                  }
                  alt="your image"
                />
                <p className="mt-2">
                  {signatureImage
                    ? ""
                    : selectedMethod === "E-Sign"
                    ? t("form2_step3_upload_image")
                    : ""}
                </p>
              </div>
            </label>
          </div>
          {errors.signatureImage && (
            <p className="text-danger">{errors.signatureImage.message}</p>
          )}

          {/* Progress (added to match StepTwo) */}
          <div className="wizard-v3-progress">
            <span>
              3 {t("progress_step_text1")} {totalSteps}{" "}
              {t("progress_step_text2")}
            </span>
            <h3>
              {totalSteps == 3 ? "66%" : "40%"} {t("progress_step_text3")}
            </h3>
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: totalSteps == 3 ? "66%" : "40%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Decorative image */}
        <div className="vector-img-one">
          <img
            src="/assets/v3/img/vb3.png"
            alt=""
            style={{ marginBottom: "-100px" }}
          />
        </div>

        {/* Back/Next nav */}
        <div className="actions">
          <ul>
            <li>
              <span className="js-btn-prev" title="BACK">
                <i className="fa fa-arrow-left"></i> {t("step2_back_button")}
              </span>
            </li>
            <li>
              <span
                style={{ backgroundColor: "#09123A" }}
                title="NEXT"
                onClick={nextHandler}
              >
                {t("step2_next_button")} <i className="fa fa-arrow-right"></i>
              </span>
            </li>
            <button
              ref={nextBtnRef}
              className="js-btn-next"
              style={{ display: "none" }}
              type="button"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
