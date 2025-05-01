"use client";
import Step1 from "../../../components/v3/step/step-1";
import Step2 from "../../../components/v3/step/step-2";
import Step3 from "../../../components/v3/step/step-3";

import Layout from "@/layout/Layout";
import useForm1store from "@/store/form1store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function V3() {
  const { createSchema, setMethods } = useForm1store();
  const t = useTranslations();
  const methods = useForm({
    resolver: yupResolver(createSchema(t)),
    mode: "onTouched",
    shouldUnregister: false,
    defaultValues: {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1, // JavaScript months are 0-indexed
      year: new Date().getFullYear(),
      paymentMethod: "CreditCard",
      method: "download",
    },
  });

  useEffect(() => {
    setMethods(methods);
  }, [methods]);
  return (
    <>
      <Layout footer={3} login={true}>
        <div style={{ marginTop: "150px" }}>
          <div
            style={{ minHeight: "190vh" }}
            className="wrapper wizard d-flex clearfix multisteps-form position-relative "
          >
            {/* for rtl */}
            {/* <div className="wrapper wizard d-flex clearfix multisteps-form position-relative" dir='rtl'> */}
            <div
              className="steps order-2 position-relative w-25 "
              style={{ backgroundColor: "#09123A", backgroundImage: "none" }}
            >
              <div className="multisteps-form__progress ">
                <span
                  className="multisteps-form__progress-btn js-active"
                  title="Application data"
                >
                  <i className="far fa-user"></i>
                  <span>Authentication</span>
                </span>
                <span
                  className="multisteps-form__progress-btn"
                  title="Tax residency"
                >
                  <i className="far fa-user"></i>
                  <span>Payment Details</span>
                </span>
                <span
                  className="multisteps-form__progress-btn"
                  title="Indentity documents"
                >
                  <i className="far fa-user"></i>
                  <span>Document Download</span>
                </span>
              </div>
            </div>
            <form
              className="multisteps-form__form w-75 order-1"
              action="#"
              id="wizard"
            >
              <div className="form-area position-relative">
                <Step1 totalSteps={3} />
                <Step2 totalSteps={3} />
                <Step3 totalSteps={3} />
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
