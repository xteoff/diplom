import Link from "next/link";

function MascaraPromo() {
    return (
        <div className="flex flex-col lg:flex-row justify-center text-black lg:h-[500px] xl:h-[600px] py-10 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-20">
            <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-full">
                <img 
                    src="/Mascara.PNG" 
                    className="w-full h-full object-cover rounded-t-xl lg:rounded-tr-none lg:rounded-l-xl" 
                    alt="Chocolate wonder-shop mascara" 
                />
            </div>
            
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center bg-red-100 
                          px-6 sm:px-10 md:px-16 lg:px-12 xl:px-16 
                          py-10 sm:py-12 md:py-16 lg:py-0
                          rounded-b-xl lg:rounded-bl-none lg:rounded-r-xl gap-4 sm:gap-5 md:gap-6">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-950">
                    Chocolate wonder-shop mascara
                </div>
                <div className="text-lg sm:text-xl font-extralight">
                    В подарок при покупке от<br />14 888р 
                </div>
                <div>
                    <Link 
                        href="/collections"
                        className="inline-block text-lg sm:text-xl border border-black rounded-full 
                                  px-4 py-2 sm:px-5 sm:py-3
                                  hover:bg-[rgb(135,61,61)] hover:border-transparent hover:text-black 
                                  transition-all duration-300 whitespace-nowrap"
                    >
                        Начать покупки
                    </Link>
                </div>
            </div>    
        </div>
    )
}

export default MascaraPromo;