"use client";
import {
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
} from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

// components
import { Controller, useForm } from "react-hook-form";
import Feedback from "react-bootstrap/esm/Feedback";
import { forwardRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const CustomPhoneInput = forwardRef(({ value, onChange, onBlur }, ref) => (
  <PhoneInput
    country={"us"}
    inputStyle={{ width: "100%", paddingTop: "10px", paddingBottom: "10px", paddingRight: "5px" }}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    inputProps={{
      ref: ref, // Forward the ref to the input element
    }}
  />
));

const CustomCheckbox = forwardRef(
  ({ label, name, onChange, onBlur, checked }, ref) => (
    <FormGroup controlId={name}>
      <FormCheck
        label={label}
        name={name}
        ref={ref}
        onChange={onChange}
        className="gap-2"
        onBlur={onBlur}
        checked={checked}
      />
    </FormGroup>
  )
);

const SignUpForm = () => {
  const t = useTranslations("sign-up");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Define validation schema
  const schema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    phone: yup
      .string()
      .required("Mobile number is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    termsAgreed: yup
      .boolean()
      .oneOf([true], "You must agree to the terms and conditions")
      .required("You must agree to the terms and conditions")
  });

  // Initialize form with validation
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      termsAgreed: false
    }
  });

  const onSubmit = (data) => {
    // Handle sign up logic here
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <FormGroup>
                <FormLabel htmlFor="email">{t("email")}</FormLabel>
                <FormControl
                  size="sm"
                  style={{ padding: "10px" }}
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  {...field}
                  isInvalid={Boolean(fieldState.error?.message)}
                />
                {fieldState.error?.message && (
                  <Feedback type="invalid" className="text-danger">
                    {fieldState.error?.message}
                  </Feedback>
                )}
              </FormGroup>
            )}
          />
        </div>

        <div className="mb-3">
          <FormLabel htmlFor="phone">{t("mobile_number")}</FormLabel>
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <CustomPhoneInput {...field} />
                {fieldState.error?.message && (
                  <p className="text-danger">{fieldState.error?.message}</p>
                )}
              </>
            )}
          />
        </div>

        <div className="mb-3">
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <FormGroup>
                <FormLabel htmlFor="password">{t("password")}</FormLabel>

                <div className="position-relative">
                  <FormControl
                    size="sm"
                    style={{ padding: "10px" }}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                    isInvalid={Boolean(fieldState.error?.message)}
                  />
                  {fieldState.error?.message && (
                    <Feedback type="invalid" className="text-danger">
                      {fieldState.error?.message}
                    </Feedback>
                  )}
                  <span
                    className="d-flex position-absolute top-50 end-0 translate-middle-y p-0 pe-2 me-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!fieldState.error &&
                      (showPassword ? (
                        <FiEye
                          height={18}
                          width={18}
                          className="cursor-pointer"
                        />
                      ) : (
                        <FiEyeOff
                          height={18}
                          width={18}
                          className="cursor-pointer"
                        />
                      ))}
                  </span>
                </div>
              </FormGroup>
            )}
          />
        </div>

        <div className="mb-3">
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState }) => (
              <FormGroup>
                <FormLabel htmlFor="confirmPassword">{t("confirm_password")}</FormLabel>

                <div className="position-relative">
                  <FormControl
                    size="sm"
                    style={{ padding: "10px" }}
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...field}
                    isInvalid={Boolean(fieldState.error?.message)}
                  />
                  {fieldState.error?.message && (
                    <Feedback type="invalid" className="text-danger">
                      {fieldState.error?.message}
                    </Feedback>
                  )}
                  <span
                    className="d-flex position-absolute top-50 end-0 translate-middle-y p-0 pe-2 me-2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {!fieldState.error &&
                      (showConfirmPassword ? (
                        <FiEye
                          height={18}
                          width={18}
                          className="cursor-pointer"
                        />
                      ) : (
                        <FiEyeOff
                          height={18}
                          width={18}
                          className="cursor-pointer"
                        />
                      ))}
                  </span>
                </div>
              </FormGroup>
            )}
          />
        </div>

        <div className="mb-3">
          <Controller
            name="termsAgreed"
            control={control}
            render={({ field, fieldState }) => (
              <FormGroup>
                <div className="d-flex align-items-center">
                  <FormCheck
                    id="termsAgreed"
                    isInvalid={Boolean(fieldState.error?.message)}
                    className="me-2 d-flex align-items-center"
                    {...field}
                  />
                  <label htmlFor="termsAgreed" className="form-check-label">
                    <span>
                      {t("terms_agreement")}{" "}
                      <Link href="/terms" className="text-decoration-none" style={{ color: "#0C1134" }}>
                        {t("terms_conditions")}
                      </Link>{" "}
                      &{" "}
                      <Link href="/privacy" className="text-decoration-none" style={{ color: "#0C1134" }}>
                        {t("privacy_policy")}
                      </Link>
                    </span>
                  </label>
                </div>
                {fieldState.error?.message && (
                  <div className="text-danger small">{fieldState.error.message}</div>
                )}
              </FormGroup>
            )}
          />
        </div>

        <div className="text-center d-grid">
          <Button
            style={{
              backgroundColor: "#0C1134",
            }}
            type="submit"
          >
            {t("sign_up_button")}
          </Button>
        </div>
      </form>
    </>
  );
};
export default SignUpForm;