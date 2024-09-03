export interface INavItem {
  label: string;
  leading: JSX.Element | null;
  path: string | null;
  children: INavItem[];
  isParent: boolean;
  callBack: () => void;
}

export interface INavbarProps {
  leading: JSX.Element;
  onClickLeading: () => void;
  actions: JSX.Element[];
  centerContent: JSX.Element;
  navItems: INavItem[];
}
