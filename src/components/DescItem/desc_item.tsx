'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';

function DescItem() {
    const router = useRouter();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [activeImage, setActiveImage] = useState('/Angels/paletka1.webp'); 

    const images = {
        image1: '/Angels/paletka1.webp',
        image2: '/Angels/paletka2.webp'
    };

    const openModal = () => {
        setModalIsOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setModalIsOpen(false)
        document.body.style.overflow = "scroll";
    };

    const handleClick = () => {
        router.back(); 
    };

    const [activeButton, setActiveButton] = useState<number>(1); 

    const buttons = [
        { id: 1, label: '01 Edens Angel', image: images.image1 },
        { id: 2, label: '02 Weeping Angel', image: images.image2 }
    ];

    const handleButtonClick = (id: number, image: string) => {
        setActiveButton(id);
        setActiveImage(image);
    };

    const modalContent = (
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
    );

    return (
        <div className="min-h-screen bg-red-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <button className="ml-auto block mb-8 cursor-pointer" onClick={handleClick}>
                    <img src="/close.svg" width={32} height={32} alt="Close" />
                </button>

                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    {/* Блок с изображением */}
                    <div className="w-full lg:w-1/2 aspect-square relative">
                        <Image
                            src={activeImage}
                            alt="Палетка теней Little Angel"
                            fill
                            className="object-contain"
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>

                    {/* Блок с информацией */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <h1 className="text-3xl font-bold">
                            Палетка теней Little Angel 9-Color Eyeshadow Palette
                        </h1>
                        <p className="text-sm text-gray-700">
                            Артикул: 43565545455778
                        </p>

                        <div className="flex justify-left mt-4 gap-4">
                            {buttons.map((button) => (
                                <button
                                    key={button.id}
                                    onClick={() => handleButtonClick(button.id, button.image)}
                                    className={`px-4 py-2 rounded-lg transition-colors duration-300 border border-[rgb(135,61,61)] ${
                                        activeButton === button.id
                                            ? 'bg-[rgb(135,61,61)] text-white'
                                            : 'bg-transparent text-black hover:bg-[rgb(135,61,61)] hover:text-white'
                                    }`}
                                >
                                    {button.label}
                                </button>
                            ))}
                        </div>

                        <p className="text-xl">
                            <span>4 150 р.</span>
                            <span className="ml-2 line-through text-gray-600">6 500 р.</span>
                        </p>

                        <button 
                            onClick={openModal} 
                            className="w-full md:w-64 p-4 border border-black rounded-full hover:bg-[rgb(135,61,61)] hover:text-white transition duration-300"
                        >
                            Добавить в корзину
                        </button>

                        <div className="space-y-4 text-lg">
                            <p>
                                Вдохновленная средневековой готической архитектурой, упаковка отражает то, как солнечный свет проникает 
                                сквозь окно, выражая славу и священность.
                            </p>
                            <p>
                                Эта палитра имеет стойкую, удобную в нанесении порошковую формулу. Благодаря высокой пигментации и универсальному 
                                выбору цветов он незаменим в различных случаях.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {modalIsOpen && modalContent}
        </div>
    );
}

export default DescItem;