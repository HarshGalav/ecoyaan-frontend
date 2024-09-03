import { ReactNode } from "react";
import { ICustomClass } from "../../../../types/CustomClass";

export interface IScrollableCarousel extends ICustomClass {
  title?: string;
  actions?: ReactNode[];
  children: ICarouselItem[];
  showChevron?: boolean;
  chevronPosition?: string;
  scrollOffset:number
}

export interface ICarouselItem {
  child: ReactNode;
}
