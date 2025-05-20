import Link from "next/link";

function LoyalPromo(){
    return(
        <div className="flex flex-col-reverse lg:flex-row  justify-center text-black lg:h-[600px] py-16 px-5 lg:px-20">
            <div className="w-full gap-5 items-center flex justify-center flex-col text-center bg-[rgb(81,53,42)] px-16 py-16 
                rounded-b-2xl lg:rounded-br-none lg:rounded-l-2xl">
                <div className="text-4xl font-bold text-[rgb(237,230,221)] px-6">
                    Поучаствуйте в нашей программе лояльности
                </div>
                <div className="text-xl text-[rgb(237,230,221)] font-extralight">
                    Оформите подписку и получайте каждый месяц эксклюзивный набор косметики 
                </div>
                <div className="flex flex-col sm:flex-row gap-3 text-xl">
                    <button className="flex place-content-center p-4 border bg-[rgb(237,230,221)] rounded-full px-5 py-4
                        hover:bg-transparent hover:ease-in-out duration-300 hover:border-[rgb(237,230,221)] hover:text-[rgb(237,230,221)]">
                        <Link href = "/promotions">
                            Оформить
                        </Link>
                    </button>
                    <button className="flex place-content-center p-4 border border-solid border-[rgb(237,230,221)] text-[rgb(237,230,221)] rounded-full px-5 py-4
                        hover:bg-[rgb(237,230,221)] hover:ease-in-out duration-300 hover:text-black">
                        <Link href = "/promotions">
                            Узнать больше
                        </Link>
                    </button>
                </div>
            </div>    
            <div className="w-full">
                <img src="/promo_loyal.svg" className="w-full h-full object-top object-cover rounded-t-2xl lg:rounded-tl-none lg:rounded-r-2xl" alt="" />
            </div>
        </div>
    )
}

export default LoyalPromo;