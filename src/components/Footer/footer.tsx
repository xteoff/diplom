'use client';
import Link from "next/link";

const links = [
  {
      href: "/",
      text: "Главная",
  },
  {
      href: "/collections",
      text: "Колекции",
  },
  {
      href: "/promotions",
      text: "Акции",
  },
  {
      href: "/enter",
      text: "Вход",
  },
  {
      href: "/shopping_card",
      text: "Корзина",
  },
];

const sogl = [
  {
      href: "/zatrolen_loh",
      text: "Политика конфиденциальности",
  },
  {
      href: "/zatrolen_loh",
      text: "Условия",
  },
  {
      href: "/zatrolen_loh",
      text: "Политика использования файлов cookie",
  },
];

function alr(){
  alert("Вы успешно подписались на информационную рассылку.");
}

function Footer() {
  const linksJsx = links.map(
    (elem, i) => {
        return (<Link_to key={i} href={elem.href} text={elem.text} />)
    }
  ); 

  const soglJsx = sogl.map(
    (elem, i) => {
        return (<Link_to key={i} href={elem.href} text={elem.text} />)
    }
  ); 

  return(
    <footer className="flex gap-3 flex-col justify-center items-center bg-[rgb(217,217,217)] h-72 px-20">
        <div>
          <div className="font-medium text-lg">
            Подписаться на рассылку:
          </div>
          <div className="flex flex-col md:flex-row gap-4"> 
            <input type="email" className="p-4 w-96 bg-white border border-solid border-black rounded-lg" placeholder="Электронный адрес" />
            <button className="p-4 border border-solid border-black rounded-lg hover:bg-white cursor-pointer hover:ease-in-out duration-300" onClick={alr}>Отправить</button>
          </div>
        </div>
        <div className="flex gap-8 text-center">
          {linksJsx}
        </div>
        <div className="flex gap-8 text-xs text-center">
          {soglJsx}
        </div>
        <div className="text-xs text-center">
          © 2025, все права защищенны
        </div>
    </footer>
  )
}

function Link_to({ href, text }:{href:string,text:string}) {
  return (
      <Link className="flex text-black hover:text-gray-600 hover:underline underline-offset-2" href={href}>{text}</Link>
  );
}

export default Footer;