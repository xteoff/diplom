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

    return(
        <div className="relative flex justify-center items-center h-fit w-full">
            <img src="/piccc.PNG" alt="" className="flex justify-center items-center h-fit w-full"/>
            <div className="absolute top-14 flex gap-9 bg-cover flex-col justify-center items-center text-black py-20 px-20">
                <div className="text-4xl text-center font-bold px-6">
                    Эксклюзивная программа лояльности
                </div>
                <div className="flex text-2xl text-center font-ligth lg:px-24">
                    Оформите подписку и получайте набор косметики каждый месяц. 
                    Наполнение и количeство продуктов зависит от колличества и общей суммы ваших совершенных заказов за год. 
                </div>
                <div>
                    <button onClick={openModal}
                    className="flex text-2xl p-4 border border-solid border-black rounded-full px-5 py-4
                        hover:bg-[rgb(135,61,61)] hover:border-[rgb(135,61,61)] hover:ease-in-out duration-300 hover:text-black">
                        Присоединиться сейчас
                    </button>
                </div>
            </div>
            {modalIsOpen && modalContent}
        </div>
    )
}

export default PromotionPromo;