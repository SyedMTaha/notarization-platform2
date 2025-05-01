import React, { useRef } from "react";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import CustomPhoneInput from "@/components/CustomPhoneInput";
import { FormLabel } from "react-bootstrap";
import CountrySelect from "@/components/CountrySelect";
import useForm2store from "@/store/form2store";

const Form2step4 = ({ totalSteps }) => {
  const t = useTranslations();

  const { methods, getValidateStep } = useForm2store();

  const nextBtnRef = useRef(null);
  if (!methods) return;

  const {
    register,
    control,
    watch,
    getValues,
    formState: { errors },
  } = methods;
  const paymentMethod = watch("paymentMethod");

  const nextHandler = async () => {
    // Validate only step 2 fields
    const validateStep = await getValidateStep(4); // Use the custom validateStep
    const { isValid, data } = await validateStep();

    if (!isValid) return;
    
    console.log("validated data →", data);
    console.log("All data", getValues());

    // Proceed to next step
    nextBtnRef.current?.click();
  };

  return (
    <div className="multisteps-form__panel " data-animation="slideHorz">
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
        <div className="inner pb-100 clearfix">
          {/* ---------------------------------------------------------------- */}
          {/* Heading -------------------------------------------------------- */}
          <div className="wizard-title text-center">
            <h3>{t("form2_step4_title")}</h3>
            <p>{t("form2_step4_subtitle")}</p>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Payment method ------------------------------------------------- */}
          <div className="wizard-duration mb-60">
            <span className="wizard-sub-text">
              {t("form2_step4_payment_selection_text")}
            </span>

            <div className="col">
              {/* Credit Card option */}
              <div style={{ width: "100%", height: "50px" }}>
                <label
                  className="duration-option "
                  style={{ width: "100%", height: "50px" }}
                >
                  <input
                    type="radio"
                    value="CreditCard"
                    className="d-checkbox"
                    {...register("paymentMethod")}
                  />
                  <span
                    className="duration-box "
                    style={{
                      width: "100%",
                      height: "100px",
                      borderRadius: "10px",
                      display: "flex",
                      gap: "10px",
                      paddingLeft: "20px",
                    }}
                  >
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        marginTop: "-10px",
                      }}
                      src="/assets/images/Credit card.png"
                    />
                    <span style={{ fontSize: "25px" }}>
                      {t("form2_step4_credit_card")}
                    </span>
                  </span>
                </label>
              </div>

              {/* PayPal option */}
              <div style={{ width: "100%", height: "50px", marginTop: "70px" }}>
                <label
                  className="duration-option "
                  style={{ width: "100%", height: "50px" }}
                >
                  <input
                    type="radio"
                    value="PayPal"
                    className="d-checkbox"
                    {...register("paymentMethod")}
                  />
                  <span
                    className="duration-box "
                    style={{
                      width: "100%",
                      height: "100px",
                      borderRadius: "10px",
                      gap: "10px",
                      display: "flex",
                      paddingLeft: "20px",
                    }}
                  >
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        marginTop: "-10px",
                      }}
                      src="/assets/images/PayPal.png"
                    />
                    <span style={{ fontSize: "25px" }}>
                      {t("form2_step4_paypal")}
                    </span>
                  </span>
                </label>
              </div>
            </div>

            {errors.paymentMethod && (
              <p className="text-danger">{errors.paymentMethod.message}</p>
            )}
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Credit-card fields (shown only if selected) -------------------- */}
          {paymentMethod === "CreditCard" && (
            <>
              <span className="wizard-sub-text" style={{ marginTop: "80px" }}>
                {t("form2_step4_credit_card_details_text")}
              </span>

              <div className="wizard-form-input">
                <label className="wizard-sub-text">
                  {t("form2_step4_card_number")}
                </label>
                <input
                  style={{
                    border: "2px solid #ddeef9",
                    color: "#B4D4E4",
                  }}
                  type="text"
                  placeholder={t("form2_step4_card_number_placeholder")}
                  {...register("cardNumber")}
                />
                {errors.cardNumber && (
                  <p className="text-danger">{errors.cardNumber.message}</p>
                )}
              </div>

              <div className="wizard-form-input" style={{ marginTop: "20px" }}>
                <label className="wizard-sub-text">
                  {t("form2_step4_cardholder_name")}
                </label>
                <input
                  style={{
                    border: "2px solid #ddeef9",
                    color: "#B4D4E4",
                  }}
                  type="text"
                  placeholder={t("form2_step4_cardholder_name_placeholder")}
                  {...register("cardholderName")}
                />
                {errors.cardholderName && (
                  <p className="text-danger">{errors.cardholderName.message}</p>
                )}
              </div>

              <div className="d-flex" style={{ gap: "60px" }}>
                {/* Expiry */}
                <div
                  style={{ marginTop: "20px" }}
                  className="wizard-form-input"
                >
                  <label className="wizard-sub-text">
                    {t("form2_step4_expiry_date")}
                  </label>
                  <div className="d-flex gap-4">
                    <input
                      style={{
                        width: "70px",
                        border: "2px solid #ddeef9",
                        color: "#B4D4E4",
                        padding: "10px",
                      }}
                      type="number"
                      placeholder={"MM"}
                      {...register("expiryMonth")}
                    />
                    <h1>/</h1>
                    <input
                      style={{
                        width: "90px",
                        border: "2px solid #ddeef9",
                        color: "#B4D4E4",
                        padding: "10px",
                      }}
                      type="number"
                      placeholder="YY"
                      {...register("expiryYear")}
                    />
                  </div>
                  {(errors.expiryMonth || errors.expiryYear) && (
                    <p className="text-danger">
                      {t("form2_step4_invalid_expiry")}
                    </p>
                  )}
                </div>

                {/* CVV */}
                <div
                  style={{ marginTop: "20px" }}
                  className="wizard-form-input"
                >
                  <label className="wizard-sub-text">
                    {t("form2_step4_cvv")}
                  </label>
                  <div className="d-flex gap-4">
                    <input
                      style={{
                        width: "90px",
                        border: "2px solid #ddeef9",
                        color: "#B4D4E4",
                        padding: "10px",
                      }}
                      type="number"
                      {...register("cvv")}
                    />
                  </div>
                  {errors.cvv && (
                    <p className="text-danger">{errors.cvv.message}</p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* Personal information ----------------------------------------- */}
          <div className="d-flex" style={{ gap: "60px", marginTop: "80px" }}>
            {/* First name */}
            <div
              className="wizard-form-input"
              style={{ marginTop: "20px", flex: 1 }}
            >
              <label className="wizard-sub-text">
                {t("form2_step4_first_name")}
              </label>
              <input
                style={{ border: "2px solid #ddeef9", color: "#B4D4E4" }}
                type="text"
                placeholder={t("form2_step4_first_name_placeholder")}
                {...register("paymentFirstName")}
              />
              {errors.paymentFirstName && (
                <p className="text-danger">{errors.paymentFirstName.message}</p>
              )}
            </div>

            {/* Last name */}
            <div
              className="wizard-form-input"
              style={{ marginTop: "20px", flex: 1 }}
            >
              <label className="wizard-sub-text">
                {t("form2_step4_last_name")}
              </label>
              <input
                style={{ border: "2px solid #ddeef9", color: "#B4D4E4" }}
                type="text"
                placeholder={t("form2_step4_last_name_placeholder")}
                {...register("paymentLastName")}
              />
              {errors.paymentLastName && (
                <p className="text-danger">{errors.paymentLastName.message}</p>
              )}
            </div>
          </div>

          <div className="d-flex" style={{ gap: "60px" }}>
            {/* Email */}
            <div
              className="wizard-form-input"
              style={{ marginTop: "20px", flex: 1 }}
            >
              <label className="wizard-sub-text">
                {t("form2_step4_email_address")}
              </label>
              <input
                style={{ border: "2px solid #ddeef9", color: "#B4D4E4" }}
                placeholder={t("form2_step4_email_placeholder")}
                {...register("paymentEmail")}
              />
              {errors.paymentEmail && (
                <p className="text-danger">{errors.paymentEmail.message}</p>
              )}
            </div>

            {/* Phone (custom component) */}
            <div
              className="wizard-form-input"
              style={{ marginTop: "20px", flex: 1 }}
            >
              <FormLabel htmlFor="phone" className="wizard-sub-text">
                {t("form2_step4_phone")}
              </FormLabel>
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <CustomPhoneInput {...field} />
                    {fieldState.error?.message && (
                      <p className="text-danger">{fieldState.error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div className="d-flex" style={{ gap: "60px" }}>
            {/* Country */}
            <div
              className="wizard-form-input"
              style={{ marginTop: "20px", flex: 1 }}
            >
              <FormLabel htmlFor="phone" className="wizard-sub-text">
                {t("form2_step4_country")}
              </FormLabel>
              <Controller
                name="country"
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

            {/* Province */}
            <div
              className="wizard-form-input"
              style={{ marginTop: "20px", flex: 1 }}
            >
              <label className="wizard-sub-text">
                {t("form2_step4_province")}
              </label>
              <input
                style={{ border: "2px solid #ddeef9", color: "#B4D4E4" }}
                type="text"
                {...register("province")}
              />
              {errors.province && (
                <p className="text-danger">{errors.province.message}</p>
              )}
            </div>

            {/* Zip */}
            <div
              className="wizard-form-input"
              style={{ marginTop: "20px", flex: 1 }}
            >
              <label className="wizard-sub-text">{t("form2_step4_zip")}</label>
              <input
                style={{ border: "2px solid #ddeef9", color: "#B4D4E4" }}
                type="text"
                placeholder={t("form2_step4_zip_placeholder")}
                {...register("zip")}
              />
              {errors.zip && (
                <p className="text-danger">{errors.zip.message}</p>
              )}
            </div>
          </div>

          <div className="d-flex" style={{ gap: "60px" }}>
            {/* Address */}
            <div
              className="wizard-form-input"
              style={{ marginTop: "20px", flex: 1 }}
            >
              <label className="wizard-sub-text">
                {t("form2_step4_address")}
              </label>
              <input
                style={{ border: "2px solid #ddeef9", color: "#B4D4E4" }}
                type="text"
                placeholder={t("form2_step4_address_placeholder")}
                {...register("address")}
              />
              {errors.address && (
                <p className="text-danger">{errors.address.message}</p>
              )}
            </div>

            {/* City */}
            <div
              className="wizard-form-input"
              style={{ marginTop: "20px", flex: 1 }}
            >
              <label className="wizard-sub-text">{t("form2_step4_city")}</label>
              <input
                style={{ border: "2px solid #ddeef9", color: "#B4D4E4" }}
                type="text"
                placeholder={t("form2_step4_city_placeholder")}
                {...register("city")}
              />
              {errors.city && (
                <p className="text-danger">{errors.city.message}</p>
              )}
            </div>
          </div>

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
              <span className="js-btn-prev" title="BACK">
                <i className="fa fa-arrow-left"></i>{" "}
                {t("form2_step4_back_button")}
              </span>
            </li>
            <li>
              <span
                style={{ backgroundColor: "#09123A" }}
                title="NEXT"
                onClick={nextHandler}
              >
                {t("form2_step4_next_button")}{" "}
                <i className="fa fa-arrow-right"></i>
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

export default Form2step4;
