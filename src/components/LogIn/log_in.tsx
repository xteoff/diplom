'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from "next-auth/react";
import Form from "next/form";
import { useState } from 'react';

export default function Login() {
  const router = useRouter()
  const [error, setError] = useState("")

  const onSignInHandler = async (formData: FormData) => {
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false, 
    });

    if (result?.error) {
      setError(
        "Данные аккаунта не совпадают, попробуйте еще раз"
      )
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[rgb(135,61,61)]">
            ВХОД
          </h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <Form className="space-y-4" action={onSignInHandler}>
          <div className="space-y-3">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(135,61,61)] focus:border-transparent"
                placeholder="Электронный адрес"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">Пароль</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(135,61,61)] focus:border-transparent"
                placeholder="Пароль"
              />
            </div>
          </div>
          
            <button
              type="submit"
              className={'w-full py-2 px-4 border rounded-lg duration-300 hover:bg-[rgb(135,61,61)] hover:text-white hover:border-transparent transition-colors'}
            >
              Войти
            </button>

        </Form>
        
        <div className="text-center text-sm">
          <Link 
            href="/register" 
            className="text-[rgb(135,61,61)] hover:underline font-medium"
          >
            Нет аккаунта? Зарегистрируйтесь
          </Link>
        </div>
      </div>
    </div>
  )
}