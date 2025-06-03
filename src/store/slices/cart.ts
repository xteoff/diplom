import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "@/generated/prisma";


export interface CartProduct {
  product: Product;
  amount: number;
}

// Define a type for the slice state
interface CartSlice {
  value: CartProduct[];
}

// Define the initial state using that type
const initialState: CartSlice = {
  value: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const id = state.value.findIndex(
        (item: CartProduct) => item.product.id == action.payload.id
      );

      if (id != -1) {
        ++state.value[id].amount;
        return;
      }

      state.value.push({ product: action.payload, amount: 1 });
    },
    removeProduct: (state, action: PayloadAction<Product>) => {
      const id = state.value.findIndex(
        (item: CartProduct) => item.product.id == action.payload.id
      );

      if (state.value[id].amount - 1 <= 0) {
        state.value = state.value.filter((item: CartProduct) => {
          return item.product.id != action.payload.id;
        });
      } else {
        state.value[id].amount = state.value[id].amount - 1;
      }
    },
    setCart: (state, action: PayloadAction<CartProduct[]>) => {
      state.value = action.payload;
    },
  },
});

export const { addProduct, removeProduct, setCart } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.cart.value;

export default cartSlice.reducer;
