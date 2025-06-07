'use client'
import { useRouter } from 'next/navigation'
import { useFormik } from "formik"
import * as Yup from "yup"

export default function CreateUser() {
  const router = useRouter()

  const CreateUserSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Слишком короткое!")
      .max(50, "Слишком длинное!")
      .matches(
        /^[А-ЯЁа-яё]+\s+[А-ЯЁа-яё]+(\s+[А-ЯЁа-яё]+)?$/,
        "Введите имя в формате: Фамилия Имя Отчество"
      )
      .required("Это обязательное поле"),
    email: Yup.string()
      .email("Поле должно содержать Email")
      .required("Это обязательное поле"),
    password: Yup.string()
      .min(8, "Пароль слишком короткий")
      .max(24, "Пароль слишком длинный!")
      .required("Это обязательное поле"),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: CreateUserSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus('')
      
      try {
        const formDataToSend = new FormData()
        formDataToSend.append('name', values.name)
        formDataToSend.append('email', values.email)
        formDataToSend.append('password', values.password)

        const res = await fetch('/api/auth/create_user', {
          method: 'POST',
          body: formDataToSend,
        })

        if (res.ok) {
          router.push('/admin/users')
        } else {
          const data = await res.json()
          setStatus(data.message || 'Добавить пользователя не удалось')
        }
      } catch (err) {
        setStatus('Возникла ошибка во время создания')
        console.error('Creation error:', err)
      } finally {
        setSubmitting(false)
      }
    }
  })

  return (
    <div className="flex flex-col justify-center items-center py-28 px-4 sm:px-20 gap-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-[rgb(135,61,61)] text-center font-bold text-2xl">
            Добавление нового пользователя
          </h1>
        </div>
        
        {formik.status && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{formik.status}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Имя</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={`appearance-none relative block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(135,61,61)] focus:border-transparent ${
                  formik.errors.name && formik.touched.name 
                    ? 'border-red-400' 
                    : 'border-gray-300'
                }`}
                placeholder="Фамилия Имя Отчество"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`appearance-none relative block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(135,61,61)] focus:border-transparent ${
                  formik.errors.email && formik.touched.email 
                    ? 'border-red-400' 
                    : 'border-gray-300'
                }`}
                placeholder="Электронный адрес"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">Пароль</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`appearance-none relative block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(135,61,61)] focus:border-transparent ${
                  formik.errors.password && formik.touched.password 
                    ? 'border-red-400' 
                    : 'border-gray-300'
                }`}
                placeholder="Пароль"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-black rounded-lg 
                  hover:bg-[rgb(135,61,61)] hover:text-white hover:border-transparent transition-colors duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? 'Создание...' : 'Добавить пользователя'}
          </button>
        </form>
      </div>
    </div>
  )
}
