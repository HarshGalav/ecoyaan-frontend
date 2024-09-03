import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "../spinner/Spinner";
import { Close } from "@mui/icons-material";

interface DialogProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
  title: string;
  loading?: boolean;
}

export const Dialog = ({
  show,
  setShow,
  children,
  loading,
  title,
}: DialogProps) => {
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
    exit: { opacity: 0 },
  };
  const dia = {
    visible: { y: "-10vh" },
    hidden: { y: "-100vh" },
    exit: { y: "100vh" },
  };

  return (
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      {show && (
        <motion.div
          variants={variants}
          animate="visible"
          initial="hidden"
          exit="exit"
        >
          <div
            className="bg-black/20 fixed top-0   w-full h-full flex  left-0 z-20 items-center justify-center  "
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick={(e) => {
              setShow(false);
            }}
          >
            <motion.div
              variants={dia}
              animate="visible"
              exit="exit"
              initial="hidden"
            >
              <div
                className="bg-white p-4 max-w-[90%] rounded-[24px] w-[400px] mx-auto z-[15] "
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {!children && (
                  <div className="flex justify-end">
                    <Close
                      className="cursor-pointer hover:bg-black/10 rounded-full    "
                      onClick={() => {
                        setShow(false);
                      }}
                    />
                  </div>
                )}
                <p className="text-center text-xl mb-4 ">{title}</p>
                {
                  <div className="flex justify-around">
                    {loading ? <Spinner /> : children}
                  </div>
                }
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
