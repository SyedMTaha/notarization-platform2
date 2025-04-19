import { useAuthStore } from "@/store/authStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
  const { signInWithPhone } = useAuthStore();
  const login = handleSubmit(async (values) => {
    try {
      const { data } = await signInWithPhone(values.phone, values.password);

      console.log("signed in", data);
    } catch (e) {
      console.error("Error signing in:", e.message);
      toast.error(e.message);
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
