"use client";
import { InputBase } from "@/components/inputs/inputs";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

export default function SignInForm() {
  const router = useRouter();

  const [error, setError] = useState("");

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Поле должно содержать Email")
      .required("Это обязательное поле"),
    password: Yup.string()
      .min(4, "Пароль слишком короткий")
      .max(24, "Пароль слишком длинный!")
      .required("Это обязательное поле"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: async (values) => {
      await onSignInHandler(values);
    },
  });

  const onSignInHandler = async (values: {
    email: string;
    password: string;
  }) => {
    const formData = new FormData();

    formData.append("email", values.email);
    formData.append("password", values.password);

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.status === 401) {
      setError("Неверный логин или пароль");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-5 w-full max-w-[370px] px-5 py-3 border-[rgb(135,61,61)] border-solid border-2 rounded-md bg-white"
    >
        <h1 className="text-2xl text-center font-bold text-[rgb(135,61,61)]">
            ВХОД В АККАУНТ
        </h1>
      <InputBase
        label="Email"
        type="text"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <InputBase
        label="Пароль"
        type="password"
        name="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <div
        hidden={!error}
        className="w-full bg-red-500 px-3 py-2 rounded-md border-2 border-solid border-red-700"
      >
        <p className="font-light text-white text-center">{error}</p>
      </div>
      <button
        type="submit"
        className={'w-full py-2 px-4 border rounded-lg duration-300 hover:bg-[rgb(135,61,61)] hover:text-white hover:border-transparent transition-colors'}
        disabled={!formik.isValid && formik.values.password !== "admin"}
      >
        {" "}
        Войти{" "}
      </button>
      <p className="w-full font-light text-center">
        Ещё не создали аккаунт?{" "}
        <Link
          href="/auth/registration"
          className="text-[rgb(135,61,61)] hover:underline"
        >
          Создайте его!
        </Link>
      </p>
    </form>
  );
}
