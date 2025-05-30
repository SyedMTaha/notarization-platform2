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
      <Form2step1/>
      {/* <Form2step2/> */}
    </>
  );
}
