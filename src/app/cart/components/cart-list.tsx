"use client";
import { RootState, store } from "../../../store/store";
import { Product } from "@prisma/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import CartCard from "./cart-card";
import { CartProduct, setCart } from "../../../store/slices/cart";
import { useEffect, useState } from "react";
import { InputBase } from "@/components/inputs/inputs";
import { createOrder } from "../actions";
import { SessionProvider, useSession } from "next-auth/react";
import Form from "next/form";
import { formatter } from "../../../app/lib/formatter";
import { addPopup } from "../../../store/slices/popup";

export default function CartList() {
  return (
    <SessionProvider>
      <Provider store={store}>
        <CartListInner />
      </Provider>
    </SessionProvider>
  );
}

function CartListInner() {
  const cart = useSelector((state: RootState) => state.cart.value);
  const [sum, setSum] = useState(0);

  const session = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    let newSumm = 0;
    cart.forEach((item: CartProduct) => {
      newSumm = newSumm + item.amount * item.product.price;
    });

    setSum(newSumm);
  }, [cart]);

  const onClearHandler = () => {
    dispatch(setCart([]));
  };

  const onOrderHandler = async (formData: FormData) => {
    if (!session.data) return;

    formData.append("userID", session.data.user.id);
    formData.append("products", JSON.stringify(cart));

    const result = await createOrder(formData);

    if (!result) {
      dispatch(
        addPopup({
          title: "Ошибка",
          data: "Что-то пошло не так при создании заказа. Попробуйте позже",
          type: "error",
        })
      );
      return;
    }
    dispatch(
      addPopup({
        title: "Заказ успешно создан",
        data: "Вы можете отслеживать его в личном кабинете",
        type: "success",
      })
    );

    onClearHandler();
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-center items-center lg:items-start gap-5 lg:gap-20 w-full px-5">
      <div className="flex flex-col gap-5  lg:w-[660px]  w-full">
        <h3 className="text-2xl font-light w-full text-center">
          Список товаров
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:w-[660px] w-full  ">
          {cart.map((product: CartProduct) => {
            return <CartCard product={product} key={product.product.id} />;
          })}
        </div>
      </div>

      <Form
        action={onOrderHandler}
        className="lg:max-w-[425px] w-full border-l-2 border-primary-500 h-fit flex flex-col items-start gap-5 justify-center px-5 py-3"
      >
        <h3 className="text-2xl font-light w-full text-left">
          Корзина
        </h3>
        <div className="flex flex-col gap-1">
          {cart.map((item: CartProduct) => {
            return <SideCartText product={item} key={item.product.id} />;
          })}
        </div>

        <span className="text-black font-light text-lg">
          Итого:{" "}
          <span className="text-[rgb(135,61,61)] font-light">
            {formatter.format(sum)}{" "}
          </span>{" "}
        </span>
        <InputBase label="Адрес доставки" name="adress" />
        <p className="font-light text-xs text-neutral-700 flex gap-1 items-center justify-center">
           Оплата заказа производится наличными курьеру
        </p>
        <div className="flex gap-5 flex-wrap">
          <button className="bg-primary-500 px-5 py-3 rounded-md text-[16px] whitespace-nowrap font-light text-black hover:bg-primary-400 hover:-translate-y-0.5 active:scale-95 active:bg-primary-300 transition-all cursor-pointer border-2 border-solid border-primary-500 hover:border-primary-400 active:border-primary-300  shadow-primary-200 hover:shadow-md select-none disabled:bg-gray-500 disabled:border-gray-500 disabled:shadow-none disabled:hover:translate-y-0 disabled:active:scale-100 disabled:cursor-not-allowed">Заказать</button>
          <button className=" bg-white-900 px-5 py-3 rounded-md text-[16px] font-light whitespace-nowrap text-black hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer shadow-primary-800 hover:shadow-md border-2 border-solid border-primary-500 select-none" type="button" onClick={onClearHandler}>
            Очистить корзину
          </button>
        </div>
      </Form>
    </div>
  );
}

function SideCartText({ product }: { product: CartProduct }) {
  return (
    <div>
      <p className="font-inter font-light">
        {product.product.name} ({product.amount}):{" "}
        <span className="font-medium underline">
          {formatter.format(product.amount * product.product.price)}
        </span>{" "}
      </p>
    </div>
  );
}
