import Link from "next/link";

function GalleryCollections(){
    return(
        <div className="flex flex-col justify-center items-center pb-8 px-20 gap-5">
            <div className="text-center font-extralight text-4xl pb-5">
                Коллекции
            </div>
            <div className="flex flex-col md:flex-row gap-3"> 
                <div className="relative group">
                    <img src="/Coll1.svg" className="h-fit rounded-2xl opacity-100 group-hover:opacity-0 transition-all" alt="" />
                    <img src="/Coll1_dop.svg" className="h-fit rounded-2xl object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all" alt="" />
                </div>
                <div className="relative group">
                    <img src="/Coll2.svg" className="h-fit rounded-2xl opacity-100 group-hover:opacity-0 transition-all" alt="" />
                    <img src="/Coll2_dop.svg" className="h-fit rounded-2xl object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all" alt="" />
                </div>
                <div className="relative group">
                    <img src="/Coll3.svg" className="h-fit rounded-2xl opacity-100 group-hover:opacity-0 transition-all" alt="" />
                    <img src="/Coll3_dop.svg" className="h-fit rounded-2xl object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all" alt="" />
                </div>
            </div>
            <div>
                <button className="flex font-extralight text-2xl p-4 border border-solid border-black rounded-full px-5 py-3
                hover:bg-[rgb(135,61,61)] hover:border-[rgb(135,61,61)] hover:ease-in-out duration-300 hover:text-black">
                    <Link href="/collections">
                        Начать покупки
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default GalleryCollections;