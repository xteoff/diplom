import Link from "next/link";

function MascaraPromo(){
    return(
        <div className="flex flex-col lg:flex-row justify-center text-black lg:h-[600px] py-20 px-5 lg:px-20">
            <div className="w-full">
                <img src="/Mascara.PNG" className="w-full h-full object-cover rounded-t-xl lg:rounded-tr-none lg:rounded-l-xl" alt="" />
            </div>
            <div className="w-full gap-4 items-center flex justify-center flex-col text-center bg-red-100 px-16 
            rounded-b-xl lg:rounded-bl-none lg:rounded-r-xl py-16">
                <div className="text-4xl font-bold text-stone-950">
                    Chocolate wonder-shop mascara
                </div>
                <div className="text-xl font-extralight">
                    В подарок при покупке от<br/>14 888р 
                </div>
                <div className="flex text-xl">
                    <button className="flex p-4 border border-solid border-black rounded-full px-4 py-3
                        hover:bg-[rgb(135,61,61)] hover:ease-in-out duration-300 hover:border-transparent hover:text-black">
                        <Link href="/collections">
                            Начать покупки
                        </Link>
                    </button>
                </div>
            </div>    
        </div>
    )
}

export default MascaraPromo;