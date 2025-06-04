'use client';
import React, { useState } from 'react';
import Link from "next/link";

function PromotionPromo(){
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setModalIsOpen(false)
        document.body.style.overflow = "scroll";
    };

    const modalContent = (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50" onClick={closeModal}>
            <div className="bg-red-50 rounded-xl p-8 md:p-16 relative max-w-md w-full">
                <button className="absolute top-4 right-4 p-2 cursor-pointer" onClick={closeModal}>
                    <img src="/close.svg" width={32} height={32} alt="Close" />
                </button>
                <div className="flex flex-col gap-8 text-center">
                    <div className="text-[rgb(135,61,61)] text-center font-bold text-2xl">
                        РЕГИСТРАЦИЯ НА <br/>ПРОГРАММУ ЛОЯЛЬНОСТИ
                    </div>
                    <div className="gap-6">
                        <form className="flex items-center justify-center flex-col gap-2">
                            <div className="flex flex-row gap-2">
                                <input type="text" className="p-4 w-[188px] border bg-white rounded-lg" placeholder="Имя" />
                                <input type="text" className="p-4 w-[188px] border bg-white rounded-lg" placeholder="Фамилия" />
                            </div>
                            <input type="email" className="p-4 w-96 border bg-white rounded-lg" placeholder="Электронный адрес" />
                            <input type="tel" className="p-4 w-96 border bg-white rounded-lg" placeholder="Номер телефона"
                                pattern="(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?" required></input>
                        </form>
                    </div>
                    <div className="flex flex-col justify-center items-center text-xs pl-1 text-[rgb(40,41,44)]">
                        Регистрируясь, Вы соглашаетесь с
                        <div className="flex flex-row gap-2">
                            <input type="checkbox" className="p-4" placeholder="Условиями и Политикой конфиденциальности"/>
                                <Link href="/zatrolen_loh">Условиями и политикой конфиденциальности</Link>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="w-64 p-4 border border-solid border-black rounded-lg 
                            hover:bg-[rgb(135,61,61)] hover:text-white hover:border-transparent hover:ease-in-out duration-300">
                            <Link href="/promotions" onClick={closeModal}>
                                Зарегистрироваться
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
    <div className="relative overflow-hidden">
        <div className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] w-full">
            <img 
                src="/piccc.PNG" 
                alt="" 
                className="w-full h-full object-cover object-center"
            />
        </div>

        <div className="absolute top-[10%] sm:top-[15%] lg:top-[20%] left-0 w-full px-4 sm:px-10 md:px-20">
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 text-black items-center text-center">
                
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
                    Эксклюзивная программа лояльности
                </div>
                
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-2xl">
                    Оформите подписку и получайте набор косметики каждый месяц. 
                    Наполнение и количество продуктов зависит от количества и общей суммы ваших совершенных заказов за год.
                </div>
                
                <div className="mt-2 sm:mt-4 md:mt-6">
                    <button 
                        onClick={openModal}
                        className="text-base sm:text-lg md:text-xl border border-black rounded-full px-5 py-2 sm:px-6 sm:py-3
                        hover:bg-[rgb(135,61,61)] hover:border-[rgb(135,61,61)] hover:text-black 
                        transition-all duration-300 whitespace-nowrap"
                    >
                        Присоединиться сейчас
                    </button>
                </div>
            </div>
        </div>
        {modalIsOpen && modalContent}
    </div>
)
}

export default PromotionPromo;