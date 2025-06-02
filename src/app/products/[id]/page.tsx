'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  article: string;
  images: string[];
  collectionID: string;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(''); 
  const [activeButton, setActiveButton] = useState<number>(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        const data = await response.json();
        setProduct(data);
        if (data.images.length > 0) {
          setActiveImage(data.images[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const handleBack = () => router.back();

  if (loading) {
    return <div className="min-h-screen bg-red-50 flex items-center justify-center">Загрузка...</div>;
  }

  if (!product) {
    return <div className="min-h-screen bg-red-50 flex items-center justify-center">Товар не найден</div>;
  }

  return (
    <div className="min-h-screen bg-red-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button className="ml-auto block mb-8 cursor-pointer" onClick={handleBack}>
          <img src="/close.svg" width={32} height={32} alt="Close" />
        </button>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Блок с изображением */}
          <div className="w-full lg:w-1/2 aspect-square relative">
            {activeImage && (
              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </div>

          {/* Блок с информацией */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-sm text-gray-700">Артикул: {product.article}</p>

            {product.images.length > 1 && (
              <div className="flex justify-left mt-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveButton(index);
                      setActiveImage(image);
                    }}
                    className={`px-4 py-2 rounded-lg transition-colors duration-300 border border-[rgb(135,61,61)] ${
                      activeButton === index
                        ? 'bg-[rgb(135,61,61)] text-white'
                        : 'bg-transparent text-black hover:bg-[rgb(135,61,61)] hover:text-white'
                    }`}
                  >
                    {`0${index + 1}`}
                  </button>
                ))}
              </div>
            )}

            <p className="text-xl">
              <span>{product.price} р.</span>
            </p>

            <button 
              onClick={openModal} 
              className="w-full md:w-64 p-4 border border-black rounded-full hover:bg-[rgb(135,61,61)] hover:text-white transition duration-300"
            >
              Добавить в корзину
            </button>

            <div className="space-y-4 text-lg">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50" onClick={closeModal}>
          <div className="bg-red-50 rounded-xl p-8 md:p-16 relative max-w-md w-full">
            <button 
              className="absolute top-4 right-4 p-2 cursor-pointer"
              onClick={closeModal}
            >
              <img src="/close.svg" width={32} height={32} alt="Close" />
            </button>
            <div className="flex flex-col gap-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-black">
                Товар успешно добавлен в корзину!
              </h2>
              <Link 
                href="/shopping_card" 
                onClick={closeModal}
                className="w-full p-4 border border-black rounded-full hover:bg-[rgb(135,61,61)] hover:text-white transition duration-300"
              >
                Перейти в корзину
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}