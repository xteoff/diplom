"use client";
import { formatter } from "@/app/lib/formatter";
import { Product } from "@/generated/prisma";
import { addProduct} from "@/store/slices/cart";
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
            <Link href = "/item" className="flex flex-col justify-center items-center cursor-pointer">
                <div className="w-full">
                    <Image
                    src={product.image}
                    width={1100}
                    height={1375}
                    className="w-full rounded-t-md h-[330px]"
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