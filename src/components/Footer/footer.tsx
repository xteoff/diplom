'use client';
import Link from "next/link";

const links = [
  {
    href: "/",
    text: "Главная",
  },
  {
    href: "/shop",
    text: "Коллекции",
  },
  {
    href: "/promotions",
    text: "Акции",
  },
  {
    href: "/cart",
    text: "Корзина",
  },
  {
    href: "/auth/sign-in",
    text: "Вход",
  },
];

const sogl = [
  {
    href: "/law/confidentialy",
    text: "Политика конфиденциальности",
  },
  {
    href: "/law/conditions",
    text: "Условия",
  },
  {
    href: "/law/cookies",
    text: "Политика использования файлов cookie",
  },
];

function alr() {
  alert("Вы успешно подписались на информационную рассылку.");
}

function Footer() {
  const linksJsx = links.map((elem, i) => (
    <Link_to key={i} href={elem.href} text={elem.text} />
  )); 

  const soglJsx = sogl.map((elem, i) => (
    <Link_to key={i} href={elem.href} text={elem.text} />
  )); 

  return (
    <footer className="flex flex-col justify-center items-center bg-[rgb(217,217,217)] py-10 sm:py-14 md:py-16 px-4 sm:px-8 md:px-12 lg:px-20 gap-4 sm:gap-6 md:gap-8">
      <div className="w-full max-w-4xl">
        <div className="font-medium text-base sm:text-lg md:text-xl text-center mb-3 sm:mb-4">
          Подписаться на информационную рассылку:
        </div>
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 justify-center items-center">
          <input 
            type="email" 
            className="w-full md:w-96 p-3 sm:p-4 bg-white border border-solid border-black rounded-lg focus:outline-none focus:ring-1 focus:ring-black" 
            placeholder="Электронный адрес" 
          />
          <button 
            className="w-full md:w-auto px-6 py-3 sm:px-8 sm:py-4 border border-solid border-black rounded-lg hover:bg-white cursor-pointer transition-all duration-300 whitespace-nowrap"
            onClick={alr}
          >
            Отправить
          </button>
        </div>
      </div>

      {/* Основные ссылки */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 px-2 text-center">
        {linksJsx}
      </div>

      {/* Юридические ссылки  */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-center text-gray-700 px-2">
        {soglJsx}
      </div>

      <div className="text-xs sm:text-sm text-center text-gray-700">
        © 2025, все права защищены
      </div>
    </footer>
  )
}

function Link_to({ href, text }: { href: string, text: string }) {
  return (
    <Link 
      className="text-black hover:text-gray-600 hover:underline underline-offset-2 transition-colors duration-200 text-sm sm:text-base"
      href={href}
    >
      {text}
    </Link>
  );
}

export default Footer;