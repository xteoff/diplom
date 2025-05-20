'use client';
import Link from "next/link";

function Registration(){
    return(
        <div className="flex flex-col justify-center items-center py-16 px-20 gap-4">
            <div className="text-[rgb(135,61,61)] font-bold text-2xl">
                РЕГИСТРАЦИЯ
            </div>
            <div className="gap-6">
                <form className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <input type="text" className="p-4 w-[188px] border bg-white rounded-lg" placeholder="Имя" />
                        <input type="text" className="p-4 w-[188px] border bg-white rounded-lg" placeholder="Фамилия" />
                    </div>
                    <input type="email" className="p-4 w-96 border bg-white rounded-lg" placeholder="Электронный адрес" />
                    <input type="password" className="p-4 w-96 border bg-white rounded-lg" placeholder="Пароль" />
                        <div className="flex justify-start text-xs pl-1 text-[rgb(40,41,44)] ">
                            Пароль должен состоять хотя бы из 6 символов
                        </div>
                    <input type="password" className="p-4 w-96 border bg-white rounded-lg" placeholder="Повторите пароль" />
                        <div className="flex justify-start text-xs pl-1 text-[rgb(40,41,44)]">
                            Пароль должен состоять хотя бы из 6 символов
                        </div>
                </form>
            </div>
            <div className="flex flex-col justify-center items-center text-xs pl-1 text-[rgb(40,41,44)]">
                Регистрируясь, Вы соглашаетесь с
                <div className="flex flex-row gap-2">
                    <input type="checkbox" className="p-4" placeholder="Условиями и Политикой конфиденциальности"/>
                        <Link href="/zatrolen_loh">Условиями</Link>и<Link href="/zatrolen_loh">Политикой конфиденциальности</Link>
                </div>
            </div>
            <div className="flex justify-center">
                <button className="w-64 p-4 border border-solid border-black rounded-lg 
                    hover:bg-[rgb(135,61,61)] hover:text-white hover:border-transparent hover:ease-in-out duration-300">
                    <Link href="/">
                        Зарегистрироваться
                    </Link>
                </button>
            </div>
            <div className="flex flex-col justify-center items-center">
                Уже зарегистрированны?
                <div className="text-[rgb(135,61,61)] underline underline-offset-2 cursor-pointer">
                    <Link href="/enter">
                        Войти
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Registration;