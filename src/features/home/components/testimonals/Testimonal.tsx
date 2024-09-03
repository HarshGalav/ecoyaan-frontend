import Testimonial from "../../../../config/TestimonialPart.json";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Testimonal() {
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

  return (
    <div className="flex py-7 flex-col xs:gap-y-5 md:gap-y-8 relative">
      <div className="flex flex-row justify-between items-center">
        <h1 className="m-0 md:text-2xl xs:text-base font-semibold">
          {Testimonial.sectionTitle}
        </h1>
      </div>
      {showButtons && (
          <button
            className="absolute lg:flex xs:hidden top-52 -left-6 bg-white p-2 z-10 rounded-full isolate bg-white/80 shadow-xl ring-1 ring-black/5"
            onClick={() => scroll(-200)}
          >
            <FaChevronLeft />
          </button>
        )}
      <div
        ref={scrollContainerRef}
        className="flex items-center justify-between md:gap-x-5 xs:gap-x-8 md:px-2 xs:px-1 overflow-scroll pb-8"
      >
        {Testimonial.testimonials.map((testimonialPart, index) => (
          <div
            key={index}
            className="flex flex-col items-center md:border  shadow   md:gap-y-4 xs:gap-y-2 md:min-w-80 xs:min-w-72  rounded-3xl xs:p-0 bg-white  md:p-5  md:py-6 xs:py-3"
          >
            <div className="flex flex-col md:pr-2 pb-2 text-base rounded-3xl  border-2 border-primary border-dashed text-neutral-500 relative">
              <img
                loading="lazy"
                src={testimonialPart.quote_img1}
                className="w-6 aspect-square"
                alt="User testimonial"
              />
              <div className="text-left xs:px-4 md:px-0 xs:py-3 md:pl-1 md:py-3">
                <p className=" line-clamp-6 break-all md:px-2">
                  {testimonialPart.testimonial_text}
                </p>
              </div>
              <img
                loading="lazy"
                src={testimonialPart.quote_img2}
                className="w-6 aspect-square absolute bottom-0 right-0 bg-white"
                alt="User testimonial"
              />
            </div>

            <div className="flex flex-col gap-y-3 items-center">
              <h1 className="xl:text-2xl xs:text-lg font-semibold">
                {testimonialPart.name}
              </h1>
            </div>
          </div>
        ))}
      </div>
      {showButtons && (
          <button
            className="absolute lg:flex xs:hidden top-52 -right-6 bg-white p-2 z-10 rounded-full isolate bg-white/80 shadow-xl ring-1 ring-black/5"
            onClick={() => scroll(200)}
          >
            <FaChevronRight />
          </button>
        )}
    </div>
  );
}
