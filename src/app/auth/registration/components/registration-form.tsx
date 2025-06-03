"use client";
import { InputBase } from "@/components/inputs/inputs";
import Link from "next/link";
import { registrate } from "../actions";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function RegistrationForm() {
  const router = useRouter();

  const onRegistrationFormHandler = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);

    console.log("formData", values);

    const response = await registrate(formData);

    if (response == formData.get("email")) {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
      });

      router.push("/dashboard");
    }
  };

  const RegistrationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Слишком короткое!")
      .max(16, "Слишком длинное!")
      .required("Это обязательное поле"),
    email: Yup.string()
      .email("Поле должно содержать Email")
      .required("Это обязательное поле"),
    password: Yup.string()
      .min(8, "Пароль слишком короткий")
      .max(24, "Пароль слишком длинный!")
      .required("Это обязательное поле"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: RegistrationSchema,
    onSubmit: async (values) => {
      await onRegistrationFormHandler(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-5 w-full max-w-[370px] px-5 py-3 border-[rgb(135,61,61)] border-solid border-2 rounded-md bg-white"
    >
        <h1 className="text-[rgb(135,61,61)] text-center font-bold text-2xl">
            РЕГИСТРАЦИЯ
        </h1>
      <InputBase
        label="Имя"
        required
        placeholder="Введите ваше имя"
        name="name"
        autoComplete="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <InputBase
        label="Email"
        placeholder="Введите ваш Email"
        required
        name="email"
        autoComplete="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <InputBase
        label="Пароль"
        placeholder="Придумайте пароль"
        type="password"
        required
        name="password"
        autoComplete="new-password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <button type="submit"
            className="w-full flex justify-center py-2 px-4 border border-black rounded-lg 
                  hover:bg-[rgb(135,61,61)] hover:text-white hover:border-transparent transition-colors duration-300"
        disabled={!formik.isValid}> Создать аккаунт </button>
      <p className="w-full font-light text-center">
        Уже есть аккаунт?{" "}
        <Link
          href="/auth/sign-in"
          className="text-[rgb(135,61,61)] hover:text-[rgb(165,81,81)] text-sm font-medium transition-colors"
        >
          Войдите в него!
        </Link>
      </p>
    </form>
  );
}
