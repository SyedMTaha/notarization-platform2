import React, { useRef } from "react";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

import useForm2store from "@/store/form2store";

const Form2step2 = ({ totalSteps }) => {
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

  const services = [
    { name: t("service_power_of_attorney"), imgUrl: "/assets/images/ws1.png" },
    {
      name: t("service_last_will_testament"),
      imgUrl: "/assets/images/ws2.png",
    },
    { name: t("service_agreement_of_sale"), imgUrl: "/assets/images/ws3.png" },
    { name: t("service_lease_agreement"), imgUrl: "/assets/images/ws4.png" },
    { name: t("service_promissory_note"), imgUrl: "/assets/images/ws5.png" },
    {
      name: t("service_passport_application"),
      imgUrl: "/assets/images/ws6.png",
    },
    {
      name: t("service_affidavit_of_identity"),
      imgUrl: "/assets/images/ws7.png",
    },
    {
      name: t("service_property_management_agreement"),
      imgUrl: "/assets/images/ws8.png",
    },
    {
      name: t("service_upload_your_own_document"),
      imgUrl: "/assets/images/ws9.png",
    },
  ];

  const nextHandler = async () => {
    // Validate only step 2 fields
    const validateStep = await getValidateStep(2); // Use the custom validateStep
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
            <h3>{t("form2_step2_title")}</h3>
            <p>{t("form2_step2_subtitle")}</p>
          </div>

          <div
            id="slider-service"
            className="wizard-service-slide  text-center"
          >
            <Controller
              control={control}
              name="documentType"
              render={({ field, fieldState }) => (
                <>
                  {services.map((service, index) => (
                    <label className="services-box-item" key={index}>
                      <input
                        type="radio"
                        name={field.name}
                        value={service.name}
                        checked={field.value === service.name}
                        onChange={field.onChange}
                        className="service-checkbox"
                      />
                      <span
                        className="w-service-box text-center d-flex flex-column align-items-center justify-content-center position-relative "
                        style={{ border: "2px solid #B4D4E4" }}
                      >
                        <span
                          className="tooltip-info"
                          data-toggle="tooltip"
                          data-placement="top"
                        ></span>
                        <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                          <span className="service-icon">
                            <img src={service.imgUrl} alt={service.name} />
                          </span>
                          <span
                            className="service-text mb-4"
                            style={{ fontSize: "18px" }}
                          >
                            {service.name}
                          </span>
                        </div>
                        <span className="option-seclect">
                          <span>{t("form2_step2_option_selected")}</span>
                        </span>
                      </span>
                    </label>
                  ))}
                  {fieldState.error?.message && (
                    <p className="text-danger">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
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
                {t("form2_step2_back_button")}
              </span>
            </li>
            <li>
              <span
                style={{ backgroundColor: "#09123A" }}
                title="NEXT"
                onClick={nextHandler}
              >
                {t("form2_step2_next_button")}{" "}
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

export default Form2step2;
