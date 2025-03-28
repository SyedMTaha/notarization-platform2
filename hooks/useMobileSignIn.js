import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const useMobileSignIn = () => {
  const [loading, setLoading] = useState(false);
  const loginFormSchema = yup.object({
    password: yup.string().required("Please enter your password"),
    phone: yup
      .string()
      .matches(/^\d{10,15}$/, "Please enter a valid phone number")
      .required("Please enter your phone number"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
    mode: "onBlur",
    defaultValues: {
      email: "jonas_kahnwald@gmail.com",
      password: "",
    },
  });

  const login = handleSubmit(async (values) => {
    try {
      /// implement login
      console.log(values);
    } catch (e) {
      if (e.response?.data?.error) {
        control.setError("password", {
          type: "custom",
          message: e.response?.data?.error,
        });
        control.setError("phone", {
          type: "custom",
          message: e.response?.data?.error,
        });
      }
    } finally {
      setLoading(false);
    }
  });
  return {
    loading,
    login,
    control,
    errors,
  };
};
export default useMobileSignIn;
