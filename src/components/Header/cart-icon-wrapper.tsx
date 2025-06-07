"use client";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import CartIcon from "./cart-icon";

interface CartIconWrapperProps {
  className?: string;
  size?: number;
  onClick?: () => void;
}

export default function CartIconWrapper({ className, size, onClick }: CartIconWrapperProps) {
  return (
    <Provider store={store}>
      <CartIcon className={className} size={size} onClick={onClick} />
    </Provider>
  );
}
