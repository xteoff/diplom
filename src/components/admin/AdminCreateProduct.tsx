'use client'
import { useState, ChangeEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Collection {
  id: string;
  name: string;
}

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    collectionID: ''
  })
  const [image, setImage] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [collections, setCollections] = useState<Collection[]>([])
  const [loadingCollections, setLoadingCollections] = useState(true)
  const router = useRouter()

  // Загрузка коллекций при монтировании компонента
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('/api/auth/collections')
        const data = await response.json()
        setCollections(data)
      } catch (err) {
        console.error('Ошибка при загрузке коллекций:', err)
        setError('Не удалось загрузить коллекции')
      } finally {
        setLoadingCollections(false)
      }
    }
    
    fetchCollections()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('price', formData.price)
      formDataToSend.append('collectionID', formData.collectionID)
      
      if (image) {
        formDataToSend.append('image', image)
      }

      const res = await fetch('/api/auth/create_product', {
        method: 'POST',
        body: formDataToSend,
      })

      if (res.ok) {
        router.push('/admin/products')
      } else {
        const data = await res.json()
        setError(data.message || 'Добавить товар не удалось')
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
            Добавление нового товара
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
              <label htmlFor="name" className="sr-only">Название</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(135,61,61)] focus:border-transparent"
                placeholder="Название товара"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="description" className="sr-only">Описание</label>
              <input
                id="description"
                name="description"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(135,61,61)] focus:border-transparent"
                placeholder="Описание товара"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="price" className="sr-only">Цена</label>
              <input
                id="price"
                name="price"
                type="number"
                required
                className="appearance-none relative block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(135,61,61)] focus:border-transparent"
                placeholder="Цена товара"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="collectionID" className="sr-only">Коллекция</label>
              <select
                id="collectionID"
                name="collectionID"
                required
                className="appearance-none relative block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(135,61,61)] focus:border-transparent"
                value={formData.collectionID}
                onChange={handleChange}
                disabled={loadingCollections}
              >
                <option value="">{loadingCollections ? 'Загрузка коллекций...' : 'Выберите коллекцию'}</option>
                {collections.map(collection => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="image" className="sr-only">Картинка</label>
              <input
                id="image"
                name="image"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-2 border border-gray-300 rounded-lg hover::outline-none hover:ring-2 hover:ring-[rgb(135,61,61)] hover:border-transparent"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-black rounded-lg 
                  hover:bg-[rgb(135,61,61)] hover:text-white hover:border-transparent transition-colors duration-300"
            disabled={loadingCollections}
          >
            Добавить товар
          </button>
        </form>
      </div>
    </div>
  )
}