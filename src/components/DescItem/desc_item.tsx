"use client";
import { formatter } from "@/app/lib/formatter";
import { addProduct} from "@/store/slices/cart";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';

export default function DescCard({ product }: { product: Product }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        dispatch(addProduct(product));
    };

    const handleClick = () => {
            router.back(); 
        };

    return (

    <div className="min-h-screen bg-red-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
            <button className="ml-auto block mb-8 cursor-pointer" onClick={handleClick}>
                <img src="/close.svg" width={32} height={32} alt="Close" />
            </button>
    
            <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="w-full lg:w-1/2 aspect-square relative">
                    <Image
                        src={product.image}
                        width={100}
                        height={150}
                        className="w-full rounded-t-md h-[150px]"
                        alt={product.name}
                    />
                </div>
    
                <div className="w-full lg:w-1/2 space-y-6">
                    <h1 className="text-3xl font-bold">
                        <span>{product.name}</span>
                    </h1>
                    <p className="text-sm text-gray-700">
                        <span>Артикул: {product.id}</span>
                    </p>
    
                    <p className="text-xl">
                        <span>
                            {formatter.format(product.price)}
                        </span>
                    </p>
    
                    <button 
                        onClick={onClickHandler} 
                            className="w-full md:w-64 p-4 border border-black rounded-full hover:bg-[rgb(135,61,61)] hover:text-white transition duration-300"
                    >
                        Добавить в корзину
                    </button>
    
                    <div className="space-y-4 text-lg">
                        <span>{product.description}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
