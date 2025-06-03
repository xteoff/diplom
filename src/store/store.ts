import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./slices/cart";
import { popupSlice } from "./slices/popup";
// ...

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    popup: popupSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
