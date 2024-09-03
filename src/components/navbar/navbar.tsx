import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import { INavbarProps, INavItem } from "./navbarProps";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
// import "./navbar.css";
import { Drawer } from "./drawer";
import DeliveryLoc from "../../features/home/features/DeliveryLoc";

function Navbar({
  leading: Leading,
  onClickLeading,
  actions: Actions,
  centerContent: Content,
  navItems,
}: INavbarProps) {
  const [showSideNav, setShowSideNav] = useState<boolean>(false);
  const [isAddressLoading, setIsAddressLoading] = useState(false);


  return (
    <nav
      className="flex flex-row justify-between items-center pagePadding bg-[#dff4f9] !px-5 md:!px-5 lg:!px-12 xl:!px-5 2xl:!px-14
      fixed top-0 w-full h-[55px] md:h-[70px] shadow-md gap-x-2 z-10"
    >
      {/* Drawer */}
      <Drawer
        leading={Leading}
        onClickLeading={onClickLeading}
        show={showSideNav}
        setShow={setShowSideNav}
        navItems={navItems}
      />

      <div className="flex flex-row cursor-pointer justify-center items-center">
        {/* MENU */}
        {navItems.length > 0 && (
          <div
            className="md:hidden mr-2"
            onClick={(e) => {
              e.preventDefault();
              setShowSideNav(!showSideNav);
            }}
          >
            <Menu />
          </div>
        )}
        {/* LEADING */}
        <div onClick={() => onClickLeading()}></div>
        {Leading}
      </div>

        <div className="hidden xl:flex">
          <DeliveryLoc isLoading={isAddressLoading} />
        </div>
      {/* NAVITEMS */}
      <div className="hidden md:block">
        <NavItems items={navItems} />
      </div>

      <div className="">{Content}</div>

      {/* ACTIONS */}
      <div className="flex flex-row justify-center items-center xs:space-x-4 lg:space-x-3 2xl:space-x-6">
        {Actions}
      </div>
    </nav>
  );
}

export default Navbar;

interface IRootNavItemsProps {
  items: INavItem[];
}

function NavItems({ items }: IRootNavItemsProps) {
  return (
    <ul className="flex flex-row justify-start items-start text-sm">
      {items.map((n) => (
        <ViewNavItem
          key={n.label}
          label={n.label}
          leading={n.leading}
          path={n.path}
          children={n.children}
          isParent={true}
          callBack={() => {}}
        />
      ))}
    </ul>
  );
}

function ViewNavItem({ label, leading, path, children, isParent }: INavItem) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <li
      className={`bg-inherit relative rounded-lg text-sm`}
      onMouseEnter={() => setIsVisible((x) => true)}
      onMouseLeave={() => setIsVisible((x) => false)}
    >
      <p
        onClick={() => path && navigate(path)}
        className={`cursor-pointer rounded-lg 
          flex flex-row justify-start items-center md:space-x-2 2xl:space-x-4 p-4`}
      >
        {leading && <span>{leading}</span>}

        <span className="text-nowrap" onClick={() => path && navigate(path)}>{label}</span>

        <span className="justify-self-end">
          {children.length > 0 &&
            (isParent ? (
              <FaChevronDown size={10} />
            ) : (
              <FaChevronRight size={10} />
            ))}
        </span>
      </p>

      <ul
        className={`bg-white shadow-lg z-20 absolute rounded-lg 
          ${isParent ? "top-full left-0" : "left-full top-0"} 
          ${isVisible ? "visible" : "hidden"}`}
      >
        {children.map((n) => (
          <ViewNavItem
            key={n.label}
            label={n.label}
            leading={n.leading}
            path={n.path}
            children={n.children}
            isParent={false}
            callBack={() => {}}
          />
        ))}
      </ul>
    </li>
  );
}
