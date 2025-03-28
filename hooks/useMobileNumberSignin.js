import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const loginFormSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
    keepMeLoggedIn: yup.bool().oneOf([true, false], "Invalid choice"),
  });
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      mobile: "user@demo.com",
      password: "123456",
      keepMeLoggedIn: false,
    },
  });

  const login = handleSubmit(async (values) => {
    try {
      /// implement login
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
  };
};
export default useLogin;
