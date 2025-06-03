import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Popup {
  id: number;
  title: string;
  data: string;
  type: "error" | "success";
}

// Define a type for the slice state
interface PopupSlice {
  value: Popup[];
}

// Define the initial state using that type
const initialState: PopupSlice = {
  value: [],
};

export const popupSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPopup: (
      state,
      action: PayloadAction<{
        title: string;
        type: "error" | "success";
        data: string;
      }>
    ) => {
      state.value.push({
        id: new Date().getTime(),
        title: action.payload.title,
        data: action.payload.data,
        type: action.payload.type,
      });
    },
    removePopup: (state, action: PayloadAction<Popup>) => {
      state.value = state.value.filter(
        (item: Popup) => item.id != action.payload.id
      );
    },
  },
});

export const { addPopup, removePopup } = popupSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.popup.value;

export default popupSlice.reducer;
