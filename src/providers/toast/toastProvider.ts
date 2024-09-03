import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IToast, ToastState } from "./toastState";

const Provider = "ToastProvider";

export const ToastProvider = createSlice({
  name: Provider,
  initialState: ToastState,
  reducers: {
    enqueue: (state, action: PayloadAction<IToast>) => {
      if (state.current == null) {
        state.current = action.payload;
      } else {
        state.toasts.push(action.payload);
      }
    },
    dequeue: (state) => {
      state.current = null;
    },
    peek: (state) => {
      state.current = state.toasts.shift() || null;
    },
  },
});

export const { enqueue, peek, dequeue } = ToastProvider.actions;

export default ToastProvider.reducer;
