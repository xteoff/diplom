"use client";
import { formatter } from "../../../app/lib/formatter";
import { addProduct, CartProduct, removeProduct } from "../../../store/slices/cart";
import { Product } from "@prisma/client";
import Image from "next/image";
import { ButtonHTMLAttributes } from "react";
import { useDispatch } from "react-redux";

export default function CartCard({ product }: { product: CartProduct }) {
  const dispatch = useDispatch();

  const onAddHandler = () => {
    dispatch(addProduct(product.product));
  };
  const onRemoveHandler = () => {
    dispatch(removeProduct(product.product));
  };

  return (
    <div className="flex border-2 border-solid border-accent-500 rounded-md h-[150px] w-[320px]">
      <Image
        src={`/products/${product.product.id}.webp`}
        width={100}
        height={100}
        alt={product.product.name}
        className="w-[120px] rounded-l-md"
      />
      <div className="flex flex-col justify-between pl-3 py-5">
        <div className="flex flex-col gap-1">
          <p className="font-inter text-lg w-full text-left">
            {product.product.name}
          </p>
          <p className="font-inter text-[rgb(135,61,61)] font-medium text-xl">
            {formatter.format(product.product.price)}
          </p>
        </div>

        <div className="flex gap-3 items-center justify-self-end">
          <DispatchButton onClick={onRemoveHandler}>
            <p className="text-3xl font-bold">-</p>
          </DispatchButton>
          <span className="font-inter text-center text-xl">
            {product.amount}
          </span>
          <DispatchButton onClick={onAddHandler}>
            <p className="text-3xl font-bold">+</p>
          </DispatchButton>
        </div>
      </div>
    </div>
  );
}

function DispatchButton({
  children,
  ...props
}: { children: React.ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-5 h-5 rounded-md bg-accent-500 text-text-950 flex justify-center items-center cursor-pointer hover:bg-accent-400 active:bg-accent-300 shadow-accent-200 hover:shadow-sm transition-all text-sm"
    >
      {children}
    </button>
  );
}
