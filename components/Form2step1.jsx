import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import CountrySelect from "@/components/CountrySelect";
import useMultistepForm2 from "@/hooks/useMultistepForm2";

const options = ["Option 1", "Option 2", "Option 3"];

const Form2step1 = ({ totalSteps }) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [identificationImage, setIdentificationImage] = useState(null);

  // Initialize form without providing initial value for identificationType
  const {
    register,
    control,
    watch,
    setValue,
    setError,
    formState: { errors },
    validateStep,
  } = useMultistepForm2(1);

  const nextBtnRef = useRef(null);
  const identificationType = watch("identificationType");

  // Log identification type changes for debugging
  useEffect(() => {
    console.log("identificationType changed to:", identificationType);
  }, [identificationType]);

  const nextHandler = async () => {
    // Log current values before validation
    console.log(
      "Current identification type before validation:",
      identificationType
    );

    // Validate only step 2 fields
    const { isValid, data } = await validateStep();

    if (!isValid) return;

    if (!identificationImage) {
      setError("identificationImage", {
        type: "manual",
        message: "Please upload your identification image",
      });
      return;
    }

    const payload = {
      ...data,
      identificationImage,
      identificationType: identificationType || "Option 3", // Ensure we get the latest value
    };

    console.log("validated data →", payload);

    // Proceed to next step
    // nextBtnRef.current?.click();
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
        setIdentificationImage(selectedFile);

        document.getElementById(id).setAttribute("src", reader.result);
      };

      // Read the file as a data URL
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div
      className="multisteps-form__panel js-active"
      data-animation="slideHorz"
    >
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
      <div
        className="wizard-forms section-padding"
        style={{ marginTop: "-100px" }}
      >
        <div className="inner pb-100 clearfix d-flex flex-column gap-4">
          {/* ---------------------------------------------------------------- */}
          {/* Heading -------------------------------------------------------- */}
          <div className="wizard-title text-center">
            <h3>Please, enter your personal information</h3>
            <p>Enter Your Details to Proceed with Notarisation</p>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Personal information ----------------------------------------- */}
          <div className="d-flex" style={{ gap: "60px" }}>
            {/* First name */}
            <div
              className="wizard-form-input d-flex align-items-baseline gap-4"
              style={{ marginTop: "20px", flex: 1 }}
            >
              <label
                className="wizard-sub-text "
                style={{ whiteSpace: "nowrap" }}
              >
                {t("step2_first_name")}
              </label>
              <div style={{ width: "100%" }}>
                <input
                  style={{ border: "2px solid #ddeef9", color: "#B4D4E4" }}
                  type="text"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-danger">{errors.firstName.message}</p>
                )}
              </div>
            </div>

            {/* Middle name */}
            <div
              className="wizard-form-input d-flex align-items-baseline gap-4"
              style={{ marginTop: "20px", flex: 1 }}
            >
              <label
                className="wizard-sub-text"
                style={{ whiteSpace: "nowrap" }}
              >
                Middle Name
              </label>
              <div style={{ width: "100%" }}>
                <input
                  style={{ border: "2px solid #ddeef9", color: "#B4D4E4" }}
                  type="text"
                  {...register("middleName")}
                />
                {errors.middleName && (
                  <p className="text-danger">{errors.middleName.message}</p>
                )}
              </div>
            </div>
          </div>
          {/* Last name */}
          <div
            className="wizard-form-input d-flex align-items-baseline gap-4"
            style={{ marginTop: "20px" }}
          >
            <label className="wizard-sub-text" style={{ whiteSpace: "nowrap" }}>
              {t("step2_last_name")}
            </label>
            <div style={{ width: "100%" }}>
              <input
                style={{
                  border: "2px solid #ddeef9",
                  color: "#B4D4E4",
                }}
                type="text"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-danger">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          {/* DOB */}
          <div
            className="wizard-form-input d-flex align-items-baseline gap-4"
            style={{ marginTop: "20px" }}
          >
            <label className="wizard-sub-text" style={{ whiteSpace: "nowrap" }}>
              Date of Birth
            </label>
            <div style={{ width: "100%" }}>
              <input
                style={{
                  border: "2px solid #ddeef9",
                  color: "#B4D4E4",
                }}
                type="date"
                {...register("dateOfBirth")}
              />
              {errors.dateOfBirth && (
                <p className="text-danger">{errors.dateOfBirth.message}</p>
              )}
            </div>
          </div>
          {/* Country */}
          <div
            className="wizard-form-input d-flex align-items-baseline gap-4"
            style={{ marginTop: "20px", flex: 1 }}
          >
            <FormLabel className="wizard-sub-text">
              {t("step2_country")}
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
          {/* email */}
          <div
            className="wizard-form-input  d-flex align-items-baseline gap-4"
            style={{ marginTop: "20px", flex: 1 }}
          >
            <label className="wizard-sub-text" style={{ whiteSpace: "nowrap" }}>
              {t("step2_email_address")}
            </label>
            <div style={{ width: "100%" }}>
              <input
                style={{ border: "2px solid #ddeef9", color: "#B4D4E4" }}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>
          </div>
          {/* IdentificationType */}
          <div
            className="wizard-form-input d-flex align-items-center gap-4"
            style={{ marginTop: "20px", flex: 1 }}
          >
            <label className="wizard-sub-text">Select an Option</label>
            <div style={{ width: "100%" }}>
              <Controller
                name="identificationType"
                control={control}
                render={({ field: { onChange, value, name, ref } }) => (
                  <div className="relative">
                    <select
                      name={name}
                      ref={ref}
                      value={value || "Option 3"}
                      onChange={(e) => {
                        console.log("Select changed to:", e.target.value);
                        onChange(e.target.value);
                      }}
                      className="w-full appearance-none bg-white border border-gray-300 p-3 pr-10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ border: "2px solid #ddeef9", color: "#333" }}
                    >
                      {options.map((opt, index) => (
                        <option key={index} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              />
              {errors.identificationType && (
                <p className="text-danger">
                  {errors.identificationType.message}
                </p>
              )}
            </div>
          </div>

          <div className="d-flex" style={{ gap: "60px" }}>
            {/* date of issue */}
            <div
              className="wizard-form-input d-flex align-items-baseline gap-4"
              style={{ marginTop: "20px", flex: 1 }}
            >
              <label
                className="wizard-sub-text"
                style={{ whiteSpace: "nowrap" }}
              >
                Date of Issue
              </label>
              <div style={{ width: "100%", position: "relative" }}>
                <input
                  style={{
                    border: "2px solid #ddeef9",
                    color: "#B4D4E4",
                    width: "100%",
                    paddingRight: "30px", // Make room for custom icon
                  }}
                  type="date"
                  {...register("dateOfIssue")}
                  className="custom-date-input"
                />
                {/* Custom calendar icon */}
                <img
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "35%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none", // So it doesn't interfere with clicking the input
                    color: "#B4D4E4",
                  }}
                  src="/assets/images/calendar.png"
                  alt=""
                />
                {errors.dateOfIssue && (
                  <p className="text-danger">{errors.dateOfIssue.message}</p>
                )}
              </div>

              {/* CSS to hide default calendar icon */}
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

            {/* license id */}
            <div
              className="wizard-form-input  d-flex align-items-center gap-4"
              style={{ marginTop: "20px", flex: 1 }}
            >
              <label className="wizard-sub-text">License ID/TIN Number</label>
              <div style={{ width: "100%" }}>
                <input
                  style={{ border: "2px solid #ddeef9", color: "#B4D4E4" }}
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
          {/* Jurisdiction Country */}
          <div
            className="wizard-form-input d-flex align-items-baseline gap-4"
            style={{ marginTop: "20px", flex: 1 }}
          >
            <FormLabel className="wizard-sub-text">
              Jurisdiction of Document Use
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
                    <p className="my-4">
                      The jurisdiction for document use refers to the legal
                      authority or region where a notarized document is valid
                      and enforceable.
                    </p>
                  </>
                )}
              />
            </div>
          </div>

          <Row className="mb-3 flex-nowrap">
            <Col className="col-3">
              <FormLabel className="wizard-sub-text">Upload Image</FormLabel>
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
                  Upload Identification
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
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                >
                  <img
                    id="form2_identification"
                    src={"/assets/v3/img/pf1.png"}
                    alt="your image"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
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
          {/* ---------------------------------------------------------------- */}
          {/* Progress (unchanged) ------------------------------------------ */}
          <div className="wizard-v3-progress">
            <span>
              2 {t("progress_step_text1")} {totalSteps}{" "}
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

        {/* ---------------------------------------------------------------- */}
        {/* NEXT button (validates & submits) ------------------------------ */}
        <div className="actions">
          <ul>
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
};

export default Form2step1;
