import React, { useEffect, useRef, useState } from "react";
import Attribute from "../../../../config/AttributesPart.json";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ICustomClass } from "../../../../types/CustomClass";
import { twMerge } from "tailwind-merge";

interface IAttributesProps extends ICustomClass {}

export default function AttributesPart({ className = "" }: ICustomClass) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

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
        "flex flex-col xs:gap-y-6 md:gap-y-8 relative",
        className,
      )}
    >
      <div className="flex py-3 flex-row justify-between items-center">
        <h1 className="m-0 md:text-2xl text-black xs:text-base font-semibold">
          {Attribute.sectionTitle}
        </h1>
        <button className="m-0 md:text-xl text-anchor cursor-pointer">
          See All
        </button>
      </div>
      <div className="relative flex items-center justify-center">
        {showLeftButton && (
          <button
            className="absolute lg:flex xs:hidden left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 z-10 rounded-full isolate bg-white/80 shadow-xl ring-1 ring-black/5"
            onClick={() => scroll(-200)}
          >
            <FaChevronLeft />
          </button>
        )}
        <div
          ref={scrollContainerRef}
          className="md:gap-x-12 pb-8 xs:gap-x-8 md:px-2 px-0 relative overflow-x-auto flex items-center scroll-smooth"
        >
          {Attribute.attribute.map((attributeProduct, index) => (
            <div
              key={index}
              className="flex flex-col items-center md:gap-y-5 xs:gap-y-3 md:min-w-64 xs:min-w-40 group relative"
            >
              <div className="relative flex flex-col gap-y-5">
                <div className="border border-green-600 rounded-full xs:p-3 lg:p-4">
                  <img
                    className="w-72 h-80 opacity-95 cursor-pointer  md:h-56 border-green-500 border-double md:w-56 xs:size-32 rounded-full border "
                    src={attributeProduct.imageUrl}
                    alt={attributeProduct.name}
                  />
                </div>
                <div className="rounded-full cursor-pointer flex flex-col items-center gap-y-5 justify-center">
                  <h2 className="md:text-2xl text-center px-1 xs:text-base font-semibold text-green-800">
                    {attributeProduct.name}
                  </h2>
                  <p className="md:text-base xs:text-xs text-center">
                    {attributeProduct.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showRightButton && (
          <button
            className="absolute lg:flex xs:hidden top-48 -right-7 transform -translate-y-1/2 bg-white p-2 z-10 rounded-full isolate bg-white/80 shadow-xl ring-1 ring-black/5"
            onClick={() => scroll(200)}
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}
