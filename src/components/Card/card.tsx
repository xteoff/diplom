"use client";
import { formatter } from "@/app/lib/formatter";
import { addProduct} from "@/store/slices/cart";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";
import { useDispatch } from "react-redux";

function Card({ product }: { product: Product }) {
    const dispatch = useDispatch();

    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        dispatch(addProduct(product));
    };
    return(
        <div className="flex w-fit">
            <Link href = "/item" className="flex flex-col justify-center items-center cursor-pointer w-60 ">
                <div className="w-full">
                    <Image
                    src={`/products/${product.id}.webp`}
                    width={100}
                    height={110}
                    className="w-full rounded-t-md h-[280px]"
                    alt={product.name}
                    />
                </div>
                <div className=" h-28 w-full gap-2 items-center flex justify-center flex-col text-center bg-[rgb(252,218,218)] px-7 rounded-b-xl">
                    <div className="flex flex-col">
                        <span className="font-inter text-lg">{product.name}</span>
                        <span className="font-inter text-primary-500 font-medium">
                            {formatter.format(product.price)}
                        </span>
                        </div>
                    <button
                        onClick={onClickHandler}
                        className="flex text-xs font-inter hover:text-[rgb(135,61,61)] cursor-pointer w-full justify-center"
                        >
                        Добавить в корзину
                    </button>
                </div>
            </Link>
        </div>
    )
}

export default Card;