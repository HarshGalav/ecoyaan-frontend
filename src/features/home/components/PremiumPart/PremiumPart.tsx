import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Premium from "../../../../config/PremiumPart.json";
import { ICustomClass } from "../../../../types/CustomClass";
import { twMerge } from "tailwind-merge";

interface IPremiumProducts extends ICustomClass {}

export default function PremiumPart({ className = "" }: ICustomClass) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowButtons(scrollWidth > clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  console.log("line 18", Premium);

  return (
    <div
      className={twMerge(
        "flex flex-col py-3 xs:gap-y-5 md:gap-y-8 relative",
        className,
      )}
    >
      <div className="flex flex-row justify-between items-center">
        <h1 className="m-0 md:text-2xl xs:text-base font-semibold">
          {Premium.sectionTitle}
        </h1>
        <button className="m-0 text-anchor md:text-xl xs:text-base">
          See All
        </button>
      </div>
      <div className="flex items-center ">
        {showButtons && (
          <button
            className="absolute lg:flex xs:hidden left-3 bg-white p-2 z-10 rounded-full isolate bg-white/80 shadow-xl ring-1 ring-black/5"
            onClick={() => scroll(-200)}
          >
            <FaChevronLeft />
          </button>
        )}
        <div
          ref={scrollContainerRef}
          className="flex md:gap-x-4 xs:gap-x-6 xs:px-1 overflow-x-auto pb-8 justify-between items-center scroll-smooth"
        >
          {Premium.premiumPart.map((premiumProduct, index) => (
            <div
              key={index}
              className="flex flex-col items-center md:gap-y-5 xs:gap-y-3 md:min-w-72 xs:min-w-40"
            >
              <div className="relative">
                <img
                  className="w-72 h-80 md:h-64 md:w-[17rem] xs:size-40 border border-gray-300 rounded-3xl"
                  src={premiumProduct.imageUrl}
                />
                <div className="absolute top-4 left-0 rounded-r-3xl rounded-br-3xl xs:py-1 md:py-3 md:px-3 xs:px-2 xs:text-xs md:text-sm text-error isolate bg-white/90 shadow-lg ring-1 ring-black/5">
                  <p>10% off</p>
                </div>
              </div>
              <div className=" flex md:gap-y-3 xs:gap-y-3  flex-col items-center justify-center">
                <h2 className="xs:text-xs md:h-14 xs:line-clamp-3  md:line-clamp-2 sm:text-lg font-bold ">
                  {premiumProduct.name}
                </h2>
                <p className="xs:text-[9px] sm:text-xs text-left line-clamp-2 text-gray-600">
                  {premiumProduct.description}
                </p>
              </div>
              <div className="flex w-full items-center xs:px-1 md:px-3 xs:pt-2 md:pt-1 justify-center">
                <button className="bg-primary rounded-full text-white w-full xs:text-sm md:text-base py-1">
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
        {showButtons && (
          <button
            className="absolute lg:flex xs:hidden right-3 bg-white p-2 z-10 rounded-full isolate bg-white/80 shadow-xl ring-1 ring-black/5"
            onClick={() => scroll(200)}
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}
