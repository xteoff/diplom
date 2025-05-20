import Link from "next/link";

function ProductCard({ img1, img2, price, text }:{img1:string, img2:string, price:string, text:string}) {
    return(
        <div className="flex w-fit">
            <Link href = "/item" className="flex flex-col justify-center items-center cursor-pointer w-60 ">
                <div className="relative group">
                    <img src={img1} className="w-full h-full object-cover rounded-t-xl opacity-100 group-hover:opacity-0 transition-all" alt="" />
                    <img src={img2} className="w-full h-full border border-[rgb(189,155,139)] absolute top-0 left-0 rounded-t-xl opacity-0 group-hover:opacity-100 transition-all" alt="" />
                </div>
                <div className=" h-20 gap-2 items-center flex justify-center flex-col text-center border border-[rgb(189,155,139)] bg-[rgb(252,218,218)] px-7 rounded-b-xl">
                    <div>
                        {text} 
                    </div>
                    <div>
                        {price}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProductCard;