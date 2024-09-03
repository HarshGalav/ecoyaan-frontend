export interface IToast {
  id: string;
  message: string;
  title: string;
  type: ToastType;
}

export enum ToastType {
  Success,
  Warning,
  Error,
}

export interface IToastState {
  current: IToast | null;
  toasts: IToast[];
}

export const ToastState: IToastState = {
  current: null,
  toasts: [],
};
