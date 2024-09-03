import { MenuOpenOutlined, MenuOpenSharp } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { INavItem } from "./navbarProps";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

interface IDrawerProps {
  leading: JSX.Element;
  onClickLeading: () => void;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  navItems: INavItem[] | [];
}

export const Drawer = ({
  leading,
  show,
  setShow,
  navItems,
  onClickLeading,
}: IDrawerProps) => {
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
    exit: { opacity: 0 },
  };

  const sidebar = {
    visible: { x: "0" },
    hidden: { x: "-100vw" },
    exit: { x: "-100vw" },
  };

  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          key={"kdbkjd.kdj"}
          variants={variants}
          animate="visible"
          transition={{ duration: 0.2 }}
          exit="exit"
          initial="hidden"
        >
          <div
            onClick={() => {
              setShow(false);
            }}
            className="bg-black/20 fixed top-0 left-0 w-full h-screen bottom-0 z-20"
          >
            <motion.div
              key={"dhjbuk"}
              variants={sidebar}
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              initial="hidden"
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="bg-white h-screen py-4 min-w-68 max-w-64"
              >
                <div className="flex flex-row justify-between items-center mb-6 px-6">
                  <span onClick={() => onClickLeading()}>{leading}</span>
                  <span
                    className="align-middle md:hidden ml-4"
                    onClick={() => setShow(!show)}
                  >
                    <MenuOpenOutlined fontSize="small"/>
                  </span>
                </div>

                <div className="px-2 pr-5">
                  <NavItems items={navItems} callBack={() => setShow(false)} />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface IRootNavItemsProps {
  items: INavItem[];
  callBack: () => void;
}

function NavItems({ items, callBack }: IRootNavItemsProps) {
  return (
    <ul className="flex flex-col justify-start items-start space-y-1 gap-y-2 text-sm w-full">
      {items.map((n) => (
        <ViewNavItem
          key={n.label}
          label={n.label}
          leading={n.leading}
          path={n.path}
          children={n.children}
          isParent={true}
          callBack={callBack}
        />
      ))}
    </ul>
  );
}

function ViewNavItem({ label, leading, path, children, callBack }: INavItem) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (children.length > 0) {
      children.forEach((e) => {
        if (e.path && location.pathname.includes(e.path!)) {
          setIsVisible(true);
        }
      });
    }
  }, []);

  return (
    <li className="w-full flex flex-col gap-y-2 justify-start items-start">
      <p
        className={`flex flex-row justify-center items-center w-full
        cursor-pointer text-sm rounded-lg px-4 py-3
        text-primary-text hover:bg-gray-100
        ${
          path != null &&
          location.pathname.includes(path) &&
          children.length == 0 &&
          "border-primary border text-black hover:bg-primary"
        }`}
        onClick={() => {
          if (path != null) {
            navigate(path);
            callBack();
          } else {
            setIsVisible((prev) => !prev);
          }
        }}
      >
        {leading && <span>{leading}</span>}
        <span>{label}</span>
        <span className=" ml-auto">
          {children.length > 0 &&
            (isVisible ? (
              <FaChevronDown size={10} />
            ) : (
              <FaChevronRight size={10} />
            ))}
        </span>
      </p>

      {children.length > 0 && isVisible && (
        <div className="pl-5 w-full">
          <NavItems items={children} callBack={callBack} />
        </div>
      )}
    </li>
  );
}
