'use client'
import { useState, ChangeEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('password', formData.password)

      const res = await fetch('/api/auth/create_user', {
        method: 'POST',
        body: formDataToSend,
      })

      if (res.ok) {
        router.push('/admin/users')
      } else {
        const data = await res.json()
        setError(data.message || 'Добавить пользователя не удалось')
      }
    } catch (err) {
      setError('Возникла ошибка во время создания')
      console.error('Creation error:', err)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center py-28 px-4 sm:px-20 gap-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-[rgb(135,61,61)] text-center font-bold text-2xl">
            Добавление нового пользователя
          </h1>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Имя</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(135,61,61)] focus:border-transparent"
                placeholder="Имя"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(135,61,61)] focus:border-transparent"
                placeholder="Электронный адрес"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">Пароль</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(135,61,61)] focus:border-transparent"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-black rounded-lg 
                  hover:bg-[rgb(135,61,61)] hover:text-white hover:border-transparent transition-colors duration-300"
          >
            Добавить пользователя
          </button>
        </form>
      </div>
    </div>
  )
}