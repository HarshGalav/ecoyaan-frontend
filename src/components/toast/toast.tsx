import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/stores";
import { useEffect } from "react";
import { dequeue, peek } from "../../providers/toast/toastProvider";
import { ToastType } from "../../providers/toast/toastState";
import { Error, Warning } from "@mui/icons-material";
import { FaCheck, FaCheckCircle } from "react-icons/fa";

function Toaster() {
  const current = useSelector(
    (state: RootState) => state.toastProvider.current,
  );
  const toasts = useSelector((state: RootState) => state.toastProvider.toasts);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (current != null) {
        const timer = setTimeout(() => {
          dispatch(dequeue());
        }, 3000);
        return () => clearTimeout(timer);
      } else if (toasts.length > 0) {
        dispatch(peek());
      }
    }, 500);
  }, [toasts, current, dispatch]);

  function getTwTextClass(type: ToastType) {
    switch (type) {
      case ToastType.Success:
        return "text-primary";
      case ToastType.Error:
        return "text-red-600";
      case ToastType.Warning:
        return "text-orange-400";
      default:
        return "text-primary";
    }
  }

  function getTwBgClass(type: ToastType) {
    switch (type) {
      case ToastType.Success:
        return "bg-primary";
      case ToastType.Error:
        return "bg-red-600";
      case ToastType.Warning:
        return "bg-orange-400";
      default:
        return "bg-primary";
    }
  }

  function getIcon(type: ToastType) {
    switch (type) {
      case ToastType.Success:
        return <FaCheckCircle />;
      case ToastType.Warning:
        return <Warning />;
      case ToastType.Error:
        return <Error />;
      default:
        return <FaCheck />;
    }
  }

  return (
    <AnimatePresence initial={false} mode="wait" key={current?.id}>
    {current != null && (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        key={current?.id}
        className="z-[100000] text-primary-text toast-shadow px-5 py-3 bg-white fixed top-13 right-3 flex flex-col justify-start items-start gap-y-1 rounded-md"
      >
        <div className="flex justify-center items-center flex-row">
          <div
            className={`${getTwTextClass(current?.type)} text-xl mr-1`}
          >
            {getIcon(current?.type)}
          </div>
          <h2 className="text-base font-bold">{current?.title}</h2>
        </div>
        <p className="text-sm font-medium pt-1">{current?.message}</p>
        <div
          className={`${getTwBgClass(current.type)} absolute left-0 bottom-0 h-1 animate-width rounded-b-full overflow-clip`}
        ></div>
      </motion.div>
    )}
  </AnimatePresence>
  
  );
}

export default Toaster;
