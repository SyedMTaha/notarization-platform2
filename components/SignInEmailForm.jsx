"use client";
import {
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
} from "react-bootstrap";

// components

import useEmailSignIn from "@/hooks/useEmailSignIn.js";
import { Controller } from "react-hook-form";
import Feedback from "react-bootstrap/esm/Feedback";
import { forwardRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { useTranslations } from "next-intl";

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

const SignInEmailForm = () => {
  const t = useTranslations();
  
  const { login, control, errors } = useEmailSignIn();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <form onSubmit={login}>
        <div className="my-4">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <FormGroup>
                <FormLabel htmlFor="email">{t("email_label")}</FormLabel>
                <FormControl
                  size="sm"
                  style={{ padding: "10px" }}
                  id="email"
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
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <FormGroup>
                <FormLabel htmlFor="password">{t("password_label")}</FormLabel>

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
            name="keepMeLoggedIn"
            control={control}
            render={({ field }) => (
              <CustomCheckbox {...field} label={t("keep_me_logged_in")} />
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
            {t("sign_in_heading")}
          </Button>
        </div>
      </form>
    </>
  );
};
export default SignInEmailForm;
