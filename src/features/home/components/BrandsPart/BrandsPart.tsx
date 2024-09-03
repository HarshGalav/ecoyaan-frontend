import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import BrandsPartData from "../../../../config/BrandsPart.json";
import { ICustomClass } from "../../../../types/CustomClass";
import { twMerge } from "tailwind-merge";

interface IBrandCarouselProps extends ICustomClass {}

export default function BrandsCarousel({ className }: IBrandCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showRightButton, setShowRightButton] = useState(true);
  const [showLeftButton, setShowLeftButton] = useState(false);

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft + clientWidth < scrollWidth);
      }
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check

      return () => {
        scrollContainerRef.current?.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div
      className={twMerge(
        "flex flex-col xs:gap-y-6 md:gap-y-8 py-3 relative",
        className,
      )}
    >
      <div className="flex flex-row justify-between items-center">
        <h1 className="m-0 md:text-2xl xs:text-base font-semibold">
          {BrandsPartData.sectionTitle}
        </h1>
        <button className="m-0 text-anchor md:text-xl xs:text-base">
          See All
        </button>
      </div>
      <div className="flex items-center justify-between">
        {showLeftButton && (
          <button
            className="absolute lg:flex xs:hidden -left-7 top-48 bg-white p-2 z-10 rounded-full isolate bg-white/90 shadow-xl ring-1 ring-black/5"
            onClick={() => scroll(-200)}
          >
            <FaChevronLeft />
          </button>
        )}
        <div
          ref={scrollContainerRef}
          className="flex w-full md:gap-x-12 xs:gap-x-8 md:px-2 xs:px-0 overflow-x-auto pb-8 justify-between items-center scroll-smooth"
        >
          {BrandsPartData.brands.map((brandProduct, index) => (
            <div
              key={index}
              className="flex flex-col items-center md:gap-y-5 xs:gap-y-3 md:min-w-64 xs:min-w-40 group relative"
            >
              <div className="relative flex flex-col gap-y-5">
                <div className="border border-green-600 rounded-full xs:p-3 lg:p-4">
                  <img
                    className="w-72 h-80 opacity-95 cursor-pointer  md:h-56 border-green-500 border-double md:w-56 xs:size-32 rounded-full border "
                    src={brandProduct.imageUrl1}
                    alt={brandProduct.name}
                    onMouseEnter={(e) => {
                      if (brandProduct.imageUrl2) {
                        e.currentTarget.src = brandProduct.imageUrl2;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.src = brandProduct.imageUrl1;
                    }}
                  />
                  <div className="absolute top-10 left-6 rounded-tl-full hidden rounded-r-full xs:py-1 md:py-2 md:px-2 xs:px-2 xs:text-xs md:text-[9px] text-error isolate bg-white/90 shadow-lg ring-1 ring-black/5">
                    <p>10% off</p>
                  </div>
                </div>
                <div className="rounded-full cursor-pointer flex flex-col items-center justify-center">
                  <h2 className="md:text-2xl text-center px-1 xs:text-base font-semibold text-green-800">
                    {brandProduct.name}
                  </h2>
                  {/* <p className="md:text-sm xs:text-xs text-center text-white">
                    {brandProduct.description}
                  </p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        {showRightButton && (
          <button
            className="absolute lg:flex xs:hidden -right-7 bg-white p-2 z-10 rounded-full isolate top-48 bg-white/90 shadow-xl ring-1 ring-black/5"
            onClick={() => scroll(200)}
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}
