import Link from "next/link";

function LoyalPromo() {
    return (
        <div className="flex flex-col-reverse lg:flex-row justify-center text-black lg:h-[500px] xl:h-[600px] py-10 sm:py-14 lg:py-16 px-4 sm:px-8 lg:px-20">
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center bg-[rgb(81,53,42)] 
                          px-6 sm:px-10 md:px-12 lg:px-12 xl:px-16 
                          py-10 sm:py-12 md:py-14 lg:py-0
                          rounded-b-2xl lg:rounded-br-none lg:rounded-l-2xl gap-4 sm:gap-5">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[rgb(237,230,221)] px-2 sm:px-4 md:px-6">
                    Поучаствуйте в нашей программе лояльности
                </div>
                <div className="text-lg sm:text-xl text-[rgb(237,230,221)] font-extralight max-w-[500px]">
                    Оформите подписку и получайте каждый месяц эксклюзивный набор косметики 
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
                    <Link 
                        href="/promotions"
                        className="inline-flex justify-center items-center text-lg sm:text-xl bg-[rgb(237,230,221)] rounded-full 
                                  px-4 py-2 sm:px-5 sm:py-3
                                  hover:bg-transparent hover:border-[rgb(237,230,221)] hover:text-[rgb(237,230,221)] 
                                  border border-transparent transition-all duration-300 whitespace-nowrap"
                    >
                        Оформить
                    </Link>
                    <Link 
                        href="/promotions"
                        className="inline-flex justify-center items-center text-lg sm:text-xl border border-[rgb(237,230,221)] text-[rgb(237,230,221)] rounded-full 
                                  px-4 py-2 sm:px-5 sm:py-3
                                  hover:bg-[rgb(237,230,221)] hover:text-black 
                                  transition-all duration-300 whitespace-nowrap"
                    >
                        Узнать больше
                    </Link>
                </div>
            </div>
            
            <div className="w-full lg:w-1/2 h-[300px] sm:h-[350px] md:h-[400px] lg:h-full">
                <img 
                    src="/promo_loyal.svg" 
                    className="w-full h-full object-top object-cover rounded-t-2xl lg:rounded-tl-none lg:rounded-r-2xl" 
                    alt="Программа лояльности" 
                />
            </div>
        </div>
    )
}

export default LoyalPromo;