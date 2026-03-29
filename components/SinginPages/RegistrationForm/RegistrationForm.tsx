"use client";
import { useState } from "react";
import css from "./RegistrationForm.module.css";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegistrationFormData,
  registrationSchema,
} from "@/validation/auth.schema";

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });

  const onSubmit = (data: RegistrationFormData) => {
    console.log(data.username);
    console.log(data.email);
    console.log(data.password);
  };

  return (
    <div className={css.loginForm}>
      <button className={css.closeBtn} onClick={() => router.back()}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <path
            d="M24 8L8 24"
            stroke="#191A15"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
          <path
            d="M8 8L24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
        </svg>
      </button>
      <h1 className={css.title}>Registration</h1>
      <p className={css.text}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <input
          {...register("username")}
          className={css.input}
          type="username"
          placeholder="Name"
        />{" "}
        {errors.username && (
          <p className={css.errorText}>{errors.username.message}</p>
        )}
        <input
          {...register("email")}
          className={css.input}
          type="email"
          placeholder="Email"
        />{" "}
        {errors.email && (
          <p className={css.errorText}>{errors.email.message}</p>
        )}
        <div className={css.passwordWrapper}>
          <input
            {...register("password")}
            className={css.input}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <button
            type="button"
            className={css.eyeBtn}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className={css.errorText}>{errors.password.message}</p>
        )}
        <button disabled={!isValid} className={css.loginBtn} type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}
