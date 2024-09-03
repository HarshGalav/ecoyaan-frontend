import { motion } from "framer-motion";
import { IScrollableCarousel } from "./scrollableCarouselInterfaces";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { useRef } from "react";

export function ScrollableCarousel({
  title,
  actions,
  children,
  showChevron = false,
  chevronPosition = "top-1/2",
  scrollOffset = 50,
}: IScrollableCarousel) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative flex flex-col justify-start items-start gap-y-3">
      <div className="flex flex-row justify-between items-center w-full">
        {title && <h5 className="font-bold">{title}</h5>}
        <div className="flex flex-row justify-center items-center gap-x-2">
          {actions && actions.map((action) => <div>{action}</div>)}
        </div>
      </div>

      {showChevron && (
        <div className="z-30">
          <div
            onClick={() => scroll(-scrollOffset)}
            className={twMerge(
              "absolute left-0 cursor-pointer",
              chevronPosition,
            )}
          >
            <FaChevronLeft />
          </div>
          <div
            onClick={() => scroll(scrollOffset)}
            className={twMerge(
              "absolute right-0 cursor-pointer",
              chevronPosition,
            )}
          >
            <FaChevronRight />
          </div>
        </div>
      )}

      <div
        ref={ref}
        className={`relative ${showChevron ? "px-8" : "px-0"} flex flex-row justify-start items-start overflow-x-scroll gap-x-4 sm:gap-x-5 md:gap-x-6 lg:gap-x-7 xl:gap-x-8 w-full scroll-smooth`}
      >
        {children.map((item) => (
          <motion.div>{item.child}</motion.div>
        ))}
      </div>
    </div>
  );
}
