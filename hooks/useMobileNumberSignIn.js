import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const useMobileNumberSignIn = () => {
  const [loading, setLoading] = useState(false);
  const loginFormSchema = yup.object({
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^\+?[1-9]\d{1,14}$/, "Phone number is not valid"),
    password: yup.string().required("Please enter your password"),
    keepMeLoggedIn: yup.bool().oneOf([true, false], "Invalid choice"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
    mode: "onBlur",
    defaultValues: {
      phone: "",
      password: "",
      keepMeLoggedIn: false,
    },
  });

  const login = handleSubmit(async (values) => {
    try {
      /// implement login
      console.log(values);
    } catch (e) {
      if (e.response?.data?.error) {
        control.setError("email", {
          type: "custom",
          message: e.response?.data?.error,
        });
        control.setError("password", {
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
export default useMobileNumberSignIn;
