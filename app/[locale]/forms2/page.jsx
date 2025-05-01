"use client";

import Layout from "@/layout/Layout";
import Form2step1 from "../../../components/Form2step1";
import Form2step2 from "../../../components/Form2step2";
import Form2step3 from "../../../components/Form2step3";
import Form2step4 from "../../../components/Form2step4";
import Form2step5 from "../../../components/Form2step5";
import useForm2store from "@/store/form2store";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function V3() {
  const { createSchema, setMethods } = useForm2store();
  const t = useTranslations();
  const methods = useForm({
    resolver: yupResolver(createSchema(t)),
    mode: "onTouched",
    shouldUnregister: false,
    defaultValues: {
      // Default values for step 1
      day: new Date().getDate(),
      month: new Date().getMonth() + 1, // JavaScript months are 0-indexed
      year: new Date().getFullYear(),
      // Default values for step 2
      paymentMethod: "CreditCard",
      // Default values for step 3
      method: "download",
      signatureMethod: "E-Sign",
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
            style={{ minHeight: "200vh" }}
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
                  <span>Personal information</span>
                </span>
                <span
                  className="multisteps-form__progress-btn"
                  title="Tax residency"
                >
                  <i className="far fa-user"></i>
                  <span>Document Selection</span>
                </span>
                <span
                  className="multisteps-form__progress-btn"
                  title="Indentity documents"
                >
                  <i className="far fa-user"></i>
                  <span>Signature & Notarization</span>
                </span>
                <span
                  className="multisteps-form__progress-btn"
                  title="Indentity documents"
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
                <Form2step1 totalSteps={5} />
                <Form2step2 totalSteps={5} />
                <Form2step3 totalSteps={5} />
                <Form2step4 totalSteps={5} />
                <Form2step5 totalSteps={5} />
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
