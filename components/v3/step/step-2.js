import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomPhoneInput from "@/components/CustomPhoneInput"; // adjust path if needed
import { FormLabel } from "react-bootstrap";
import Link from "next/link";

const currentYY = new Date().getFullYear() % 100;
/* ------------------------------------------------------------------ */
/* Yup validation schema -------------------------------------------- */
export const schema = yup.object({
  /* ------------------------------------------------------------ */
  /* Payment method --------------------------------------------- */
  paymentMethod: yup
    .string()
    .oneOf(["CreditCard", "PayPal"], "Select Credit Card or PayPal")
    .required("Please select a payment method"),

  /* ------------------------------------------------------------ */
  /* Credit-card-only fields (validate only when CreditCard) ----- */
  cardNumber: yup.string().when("paymentMethod", {
    is: "CreditCard",
    then: (s) =>
      s
        .required("Card number is required")
        .matches(/^[0-9]{13,19}$/, "Card number must be 13–19 digits"),
  }),

  cardholderName: yup.string().when("paymentMethod", {
    is: "CreditCard",
    then: (s) => s.required("Cardholder name is required"),
  }),

  expiryMonth: yup.number().when("paymentMethod", {
    is: "CreditCard",
    then: (s) =>
      s
        .typeError("Expiry month is required")
        .required("Expiry month is required")
        .min(1, "Month must be between 1 and 12")
        .max(12, "Month must be between 1 and 12"),
  }),

  expiryYear: yup.number().when("paymentMethod", {
    is: "CreditCard",
    then: (s) =>
      s
        .typeError("Expiry year is required")
        .required("Expiry year is required")
        .min(currentYY, "Card has already expired"),
  }),

  cvv: yup.string().when("paymentMethod", {
    is: "CreditCard",
    then: (s) =>
      s
        .required("CVV is required")
        .matches(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits"),
  }),

  /* ------------------------------------------------------------ */
  /* Personal info ---------------------------------------------- */
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email address is required"),
  phone: yup.string().required("Phone number is required"),
  country: yup.string().required("Country is required"),
  province: yup.string().required("Province/state is required"),
  zip: yup.string().required("ZIP/postal code is required"),
  address: yup.string().required("Street address is required"),
  city: yup.string().required("City is required"),
});
/* ------------------------------------------------------------------ */
/* Component -------------------------------------------------------- */
const StepTwo = () => {
  const {
    register,
    control,
    trigger, // ← get manual validator
    getValues, // ← to read form data after validate
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { paymentMethod: "CreditCard" },
    mode: "onTouched",
    shouldUnregister: true,
  });
  const nextBtnRef = useRef(null);

  const paymentMethod = watch("paymentMethod");
  const nextHandler = async () => {
    const isValid = await trigger(); // validate everything
    if (!isValid) return; // show errors, stay on page

    // optional: access the validated data
    const data = getValues();
    console.log("validated data →", data);

    // advance the wizard
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
            <h3>Payment Details</h3>
            <p>Please Select Your preferred form of Payment</p>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Payment method ------------------------------------------------- */}
          <div className="wizard-duration mb-60">
            <span className="wizard-sub-text">
              Please Select your Preferred form of Payment
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
                    <span style={{ fontSize: "25px" }}>Credit Card</span>
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
                    <span style={{ fontSize: "25px" }}>PayPal</span>
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
                Enter your Credit Card Details
              </span>

              <div className="wizard-form-input">
                <label className="wizard-sub-text">Card Number</label>
                <input
                  style={{
                    border: "2px solid #ddeef9",
                    color: "#B4D4E4",
                    border: "2px solid #B4D4E4",
                  }}
                  type="text"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  {...register("cardNumber")}
                />
                {errors.cardNumber && (
                  <p className="text-danger">{errors.cardNumber.message}</p>
                )}
              </div>

              <div className="wizard-form-input" style={{ marginTop: "20px" }}>
                <label className="wizard-sub-text">Cardholder Name</label>
                <input
                  style={{
                    border: "2px solid #ddeef9",
                    color: "#B4D4E4",
                    border: "2px solid #B4D4E4",
                  }}
                  type="text"
                  placeholder="John Doe"
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
                  <label className="wizard-sub-text">Expiry Date</label>
                  <div className="d-flex gap-4">
                    <input
                      style={{
                        width: "70px",
                        border: "2px solid #ddeef9",
                        color: "#B4D4E4",
                        padding: "10px",
                        border: "2px solid #B4D4E4",
                      }}
                      type="number"
                      placeholder="MM"
                      min={1}
                      max={12}
                      {...register("expiryMonth")}
                    />
                    <h1>/</h1>
                    <input
                      style={{
                        width: "70px",
                        border: "2px solid #ddeef9",
                        color: "#B4D4E4",
                        padding: "10px",
                        border: "2px solid #B4D4E4",
                      }}
                      type="number"
                      placeholder="YY"
                      {...register("expiryYear")}
                    />
                  </div>
                  {(errors.expiryMonth || errors.expiryYear) && (
                    <p className="text-danger">Invalid expiry</p>
                  )}
                </div>

                {/* CVV */}
                <div
                  style={{ marginTop: "20px" }}
                  className="wizard-form-input"
                >
                  <label className="wizard-sub-text">CVV</label>
                  <div className="d-flex gap-4">
                    <input
                      style={{
                        width: "70px",
                        border: "2px solid #ddeef9",
                        color: "#B4D4E4",
                        padding: "10px",
                        border: "2px solid #B4D4E4",
                      }}
                      type="number"
                      placeholder="123"
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
          <div className="d-flex" style={{ gap: "60px" }}>
            {/* First name */}
            <div
              className="wizard-form-input"
              style={{ marginTop: "20px", flex: 1 }}
            >
              <label className="wizard-sub-text">First Name</label>
              <input
                style={{
                  border: "2px solid #ddeef9",
                  color: "#B4D4E4",
                  border: "2px solid #B4D4E4",
                }}
                type="text"
                placeholder="John"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-danger">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last name */}
            <div
              className="wizard-form-input"
              style={{ marginTop: "20px", flex: 1 }}
            >
              <label className="wizard-sub-text">Last Name</label>
              <input
                style={{
                  border: "2px solid #ddeef9",
                  color: "#B4D4E4",
                  border: "2px solid #B4D4E4",
                }}
                type="text"
                placeholder="Doe"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-danger">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="d-flex" style={{ gap: "60px" }}>
            {/* Email */}
            <div
              className="wizard-form-input"
              style={{ marginTop: "20px", flex: 1 }}
            >
              <label className="wizard-sub-text">Email Address</label>
              <input
                style={{
                  border: "2px solid #ddeef9",
                  color: "#B4D4E4",
                  border: "2px solid #B4D4E4",
                }}
                type="email"
                placeholder="john@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>

            {/* Phone (custom component) */}
            <div
              className="wizard-form-input"
              style={{ marginTop: "20px", flex: 1 }}
            >
              <FormLabel htmlFor="phone" className="wizard-sub-text">
                Phone
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
              <label className="wizard-sub-text">Country</label>
              <input
                style={{
                  border: "2px solid #ddeef9",
                  color: "#B4D4E4",
                  border: "2px solid #B4D4E4",
                }}
                type="text"
                placeholder="Country"
                {...register("country")}
              />
              {errors.country && (
                <p className="text-danger">{errors.country.message}</p>
              )}
            </div>

            {/* Province */}
            <div
              className="wizard-form-input"
              style={{ marginTop: "20px", flex: 1 }}
            >
              <label className="wizard-sub-text">Province</label>
              <input
                style={{
                  border: "2px solid #ddeef9",
                  color: "#B4D4E4",
                  border: "2px solid #B4D4E4",
                }}
                type="text"
                placeholder="Province"
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
              <label className="wizard-sub-text">Zip</label>
              <input
                style={{
                  border: "2px solid #ddeef9",
                  color: "#B4D4E4",
                  border: "2px solid #B4D4E4",
                }}
                type="text"
                placeholder="Zip"
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
              <label className="wizard-sub-text">Address</label>
              <input
                style={{
                  border: "2px solid #ddeef9",
                  color: "#B4D4E4",
                  border: "2px solid #B4D4E4",
                }}
                type="text"
                placeholder="123 Street"
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
              <label className="wizard-sub-text">City</label>
              <input
                style={{
                  border: "2px solid #ddeef9",
                  color: "#B4D4E4",
                  border: "2px solid #B4D4E4",
                }}
                type="text"
                placeholder="City"
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
            <span>2 to 5 step</span>
            <h3>38% to complete</h3>
            <div className="progress">
              <div className="progress-bar" style={{ width: "38%" }}></div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* NEXT button (validates & submits) ------------------------------ */}
        <div className="actions">
          <ul>
            <li>
              <span className="js-btn-prev" title="BACK">
                <i className="fa fa-arrow-left"></i> BACK{" "}
              </span>
            </li>
            <li>
              <span
                style={{ backgroundColor: "#09123A" }}
                title="NEXT"
                onClick={nextHandler}
              >
                NEXT <i className="fa fa-arrow-right"></i>
                {/* ///simulates click on below hidden button if fields are valid */}
              </span>
            </li>
            <button
              ref={nextBtnRef} // <- attach the ref
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

export default StepTwo;
