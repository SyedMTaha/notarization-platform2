'use client';

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Col, FormLabel, Row } from "react-bootstrap";
import CountrySelect from "@/components/CountrySelect";
import useForm2store from "@/store/form2store";
import { useFormSteps } from "@/hooks/useFormSteps";

import FormProgressSidebar from './FormProgressSidebar';

const identificationOptions = [
  { value: "", label: "form2_select_identification_type" },
  { value: "passport", label: "form2_passport" },
  { value: "driverLicense", label: "form2_drivers_license" },
  { value: "nationalId", label: "form2_national_id" },
];

const Form2step1 = ({ totalSteps }) => {
  const router = useRouter();
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [identificationImage, setIdentificationImage] = useState(null);

  // Initialize form steps
  useFormSteps();

  const { methods, getValidateStep } = useForm2store();
  const nextBtnRef = useRef(null);
  if (!methods) return null;

  const {
    register,
    control,
    setError,
    trigger,
    getValues,
    formState: { errors },
  } = methods;

  const nextHandler = async () => {
    const validateStep = await getValidateStep(1);
    const { isValid, data } = await validateStep();
    if (!isValid) return;

    if (!identificationImage) {
      setError("identificationImage", {
        type: "manual",
        message: t("form2_please_upload_identification_image"),
      });
      return;
    }

    const imgUrl = "abc";
    const payload = {
      ...data,
      identificationImage: imgUrl,
    };

    console.log("validated data →", payload);
    console.log("All data", getValues());
    router.push('/form2-page2');
  };

  const readURL = (event, id) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setIdentificationImage(selectedFile);
        document.getElementById(id).setAttribute("src", reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="d-flex">
      <div className="flex-grow-1" style={{ marginRight: '320px' }}>
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="multisteps-form__panel js-active" data-animation="slideHorz">
                <Link legacyBehavior href="/">
                  <a>
                    <img
                      src="/assets/images/logos/logo.png"
                      style={{ height: '70px' }}
                      alt="Logo"
                      title="Logo"
                    />
                  </a>
                </Link>
                <div className="wizard-forms section-padding" style={{ marginTop: "-100px" }}>
                  <div className="inner pb-100 clearfix d-flex flex-column gap-4">
                    <div className="wizard-title text-center">
                      <h3>{t("form2_heading_title")}</h3>
                      <p className="mt-2">{t("form2_heading_subtitle")}</p>
                    </div>

                    <div className="d-flex" style={{ gap: "60px" }}>
                      <div
                        className="wizard-form-input d-flex align-items-baseline gap-4"
                        style={{ marginTop: "20px", flex: 1 }}
                      >
                        <label
                          className="wizard-sub-text"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {t("form2_first_name")}
                        </label>
                        <div style={{ width: "100%" }}>
                          <input
                            style={{ border: "2px solid #ddeef9", color: "#333333" }}
                            type="text"
                            {...register("firstName")}
                          />
                          {errors.firstName && (
                            <p className="text-danger">{errors.firstName.message}</p>
                          )}
                        </div>
                      </div>

                      <div
                        className="wizard-form-input d-flex align-items-baseline gap-4"
                        style={{ marginTop: "20px", flex: 1 }}
                      >
                        <label
                          className="wizard-sub-text"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {t("form2_middle_name")}
                        </label>
                        <div style={{ width: "100%" }}>
                          <input
                            style={{ border: "2px solid #ddeef9", color: "#333333" }}
                            type="text"
                            {...register("middleName")}
                          />
                          {errors.middleName && (
                            <p className="text-danger">{errors.middleName.message}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className="wizard-form-input d-flex align-items-baseline gap-4"
                      style={{ marginTop: "20px" }}
                    >
                      <label className="wizard-sub-text" style={{ whiteSpace: "nowrap" }}>
                        {t("form2_last_name")}
                      </label>
                      <div style={{ width: "100%" }}>
                        <input
                          style={{ border: "2px solid #ddeef9", color: "#333333" }}
                          type="text"
                          {...register("lastName")}
                        />
                        {errors.lastName && (
                          <p className="text-danger">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div
                      className="wizard-form-input d-flex align-items-baseline gap-4"
                      style={{ marginTop: "20px" }}
                    >
                      <label className="wizard-sub-text" style={{ whiteSpace: "nowrap" }}>
                        {t("form2_date_of_birth")}
                      </label>
                      <div style={{ width: "100%" }}>
                        <input
                          style={{ border: "2px solid #ddeef9", color: "#333333" }}
                          type="date"
                          {...register("dateOfBirth")}
                        />
                        {errors.dateOfBirth && (
                          <p className="text-danger">{errors.dateOfBirth.message}</p>
                        )}
                      </div>
                    </div>

                    <div
                      className="wizard-form-input d-flex align-items-baseline gap-4"
                      style={{ marginTop: "20px", flex: 1 }}
                    >
                      <FormLabel className="wizard-sub-text">
                        {t("form2_country_of_residence")}
                      </FormLabel>
                      <div style={{ width: "100%" }}>
                        <Controller
                          name="countryOfResidence"
                          control={control}
                          render={({ field, fieldState }) => (
                            <>
                              <CountrySelect {...field} />
                              {fieldState.error?.message && (
                                <p className="text-danger">{fieldState.error.message}</p>
                              )}
                            </>
                          )}
                        />
                      </div>
                    </div>

                    <div
                      className="wizard-form-input d-flex align-items-baseline gap-4"
                      style={{ marginTop: "20px", flex: 1 }}
                    >
                      <label className="wizard-sub-text" style={{ whiteSpace: "nowrap" }}>
                        {t("form2_email_address")}
                      </label>
                      <div style={{ width: "100%" }}>
                        <input
                          style={{ border: "2px solid #ddeef9", color: "#333333" }}
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-danger">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div
                      className="wizard-form-input d-flex align-items-baseline gap-4"
                      style={{ marginTop: "20px", flex: 1 }}
                    >
                      <label className="wizard-sub-text">
                        {t("form2_identification_type_label")}
                      </label>
                      <div style={{ width: "100%", position: "relative" }}>
                        <Controller
                          name="identificationType"
                          control={control}
                          render={({ field, fieldState }) => (
                            <div style={{ position: "relative" }}>
                              <div
                                onClick={() => setIsOpen(!isOpen)}
                                style={{
                                  border: "2px solid #ddeef9",
                                  backgroundColor: "#fff",
                                  height: "60px",
                                  padding: "10px 20px",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  color: "#333333",
                                }}
                              >
                                <span>
                                  {t(
                                    identificationOptions.find(
                                      (opt) => opt.value === field.value
                                    )?.label || "form2_select_identification_type"
                                  )}
                                </span>
                                <i
                                  className={`fa fa-chevron-down ${
                                    isOpen ? "rotate-icon" : ""
                                  }`}
                                  style={{ transition: "transform 0.3s ease" }}
                                />
                              </div>
                              {isOpen && (
                                <div
                                  style={{
                                    border: "1px solid #ddeef9",
                                    position: "absolute",
                                    backgroundColor: "#fff",
                                    width: "100%",
                                    zIndex: 10,
                                  }}
                                >
                                  {identificationOptions.map((option) => (
                                    <div
                                      key={option.value}
                                      onClick={() => {
                                        field.onChange(option.value);
                                        setIsOpen(false);
                                        trigger("identificationType");
                                      }}
                                      style={{
                                        padding: "10px 20px",
                                        cursor: "pointer",
                                        backgroundColor:
                                          field.value === option.value
                                            ? "#ddeef9"
                                            : "#fff",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "#cce0f5";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                          field.value === option.value
                                            ? "#333333"
                                            : "#fff";
                                      }}
                                    >
                                      {t(option.label)}
                                    </div>
                                  ))}
                                </div>
                              )}
                              {fieldState.error?.message && (
                                <p className="text-danger">{fieldState.error.message}</p>
                              )}
                            </div>
                          )}
                        />
                      </div>
                    </div>

                    <div className="d-flex" style={{ gap: "60px" }}>
                      <div
                        className="wizard-form-input d-flex align-items-baseline gap-4"
                        style={{ marginTop: "20px", flex: 1 }}
                      >
                        <label
                          className="wizard-sub-text"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {t("form2_date_of_issue")}
                        </label>
                        <div style={{ width: "100%", position: "relative" }}>
                          <input
                            style={{
                              border: "2px solid #ddeef9",
                              color: "#333333",
                              width: "100%",
                              paddingRight: "30px",
                            }}
                            type="date"
                            {...register("dateOfIssue")}
                            className="custom-date-input"
                          />
                          <img
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "35%",
                              transform: "translateY(-50%)",
                              pointerEvents: "none",
                              color: "#B4D4E4",
                            }}
                            src="/assets/images/calendar.png"
                            alt=""
                          />
                          {errors.dateOfIssue && (
                            <p className="text-danger">{errors.dateOfIssue.message}</p>
                          )}
                        </div>
                        <style>{`
                          .custom-date-input::-webkit-calendar-picker-indicator {
                            opacity: 0;
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            cursor: pointer;
                          }
                        `}</style>
                      </div>

                      <div
                        className="wizard-form-input d-flex align-items-center gap-4"
                        style={{ marginTop: "20px", flex: 1 }}
                      >
                        <label className="wizard-sub-text">{t("form2_license_id")}</label>
                        <div style={{ width: "100%" }}>
                          <input
                            style={{ border: "2px solid #ddeef9", color: "#333333" }}
                            type="text"
                            {...register("licenseIdNumber")}
                          />
                          {errors.licenseIdNumber && (
                            <p className="text-danger">
                              {errors.licenseIdNumber.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className="wizard-form-input d-flex align-items-baseline gap-4"
                      style={{ marginTop: "20px", flex: 1 }}
                    >
                      <FormLabel className="wizard-sub-text">
                        {t("form2_jurisdiction")}
                      </FormLabel>
                      <div style={{ width: "100%" }}>
                        <Controller
                          name="jurisdictionOfDocumentUse"
                          control={control}
                          render={({ field, fieldState }) => (
                            <>
                              <CountrySelect {...field} />
                              {fieldState.error?.message && (
                                <p className="text-danger">{fieldState.error.message}</p>
                              )}
                              <p className="my-4">{t("form2_jurisdiction_note")}</p>
                            </>
                          )}
                        />
                      </div>
                    </div>

                    <Row className="mb-3 flex-nowrap">
                      <Col className="col-3">
                        <FormLabel className="wizard-sub-text">
                          {t("form2_upload_image")}
                        </FormLabel>
                      </Col>

                      <Col className="col-6">
                        <div
                          style={{
                            border: "1px solid black",
                            maxWidth: "100%",
                            height: "auto",
                          }}
                          className="wizard-photo-upload position-relative p-2"
                        >
                          <label
                            htmlFor="identification_image"
                            className="text-center rounded"
                            style={{
                              fontSize: "10px",
                              position: identificationImage ? "relative" : "block",
                            }}
                          >
                            {t("form2_upload_identification")}
                          </label>
                          <input
                            id="identification_image"
                            {...register("identificationImage")}
                            onChange={(e) => readURL(e, "form2_identification")}
                            type="file"
                            style={{ display: "none" }}
                          />
                          <div
                            className="display-img text-center"
                            style={{ maxWidth: "100%", height: "auto" }}
                          >
                            <img
                              id="form2_identification"
                              src={"/assets/v3/img/pf1.png"}
                              alt="your image"
                              style={{ maxWidth: "100%", height: "auto" }}
                            />
                          </div>
                        </div>
                        {errors.identificationImage && (
                          <p className="text-danger">
                            {errors.identificationImage.message}
                          </p>
                        )}
                      </Col>
                    </Row>

                  </div>

                  <div className="actions">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link href="/" className="text-decoration-none">
                        <span
                          className="btn"
                          style={{ 
                            backgroundColor: "#274171",
                            color: 'white',
                            padding: '10px 30px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginRight: '465px'
                          }}
                        >
                          <i className="fa fa-arrow-left"></i> Back
                        </span>
                      </Link>
                      <Link href="/form2-page2" className="text-decoration-none">
                        <span
                          className="btn"
                          style={{ 
                            backgroundColor: "#274171",
                            color: 'white',
                            padding: '10px 30px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                          onClick={nextHandler}
                        >
                          Next <i className="fa fa-arrow-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ 
        width: '300px', 
        position: 'fixed', 
        right: 0, 
        top: 0, 
        height: '100vh',
        borderLeft: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: '#091534'
      }}>
        <FormProgressSidebar currentStep={1} />
      </div>
    </div>
  );
};

export default Form2step1;
