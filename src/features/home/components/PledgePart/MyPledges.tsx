import { useRef, useState, useEffect } from "react";
import myPledge from "../../../../config/MyPledges.json";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function MyPledges() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, []);

  return (
    <div className="flex flex-col py-3 xs:gap-y-5 md:gap-y-8 relative">
      <div className="flex flex-row justify-between items-center">
        <h1 className="m-0 md:text-2xl xs:text-base  font-semibold">My Pledges</h1>
        <button className="m-0 text-anchor md:text-xl xs:text-base cursor-pointer">See All</button>
      </div>
      <div className="relative flex items-center justify-center">
        {showLeftScroll && (
          <button
            className="absolute border border-gray-200 lg:flex xs:hidden -left-6 bg-white p-2 z-10 rounded-full isolate bg-white/80 shadow-xl ring-1 ring-black/5"
            onClick={() => scroll(-200)}
          >
            <FaChevronLeft />
          </button>
        )}
        <div
          ref={scrollContainerRef}
          className="flex items-center rounded-2xl pb-8 md:px-2 xs:px-1 gap-x-5 overflow-x-auto scroll-smooth"
        >
          {myPledge.myPledges.map((pledge, index) => (
            <div
              key={index}
              className="flex  hover:shadow-2xl flex-col 2xl:min-w-[463px] lg:min-w-[502px] md:min-w-[488px] xs:min-w-[286px] xs:w-[305px] border md:h-[297px] border-gray-300 rounded-3xl md:gap-y-4 xs:gap-y-5 md:py-3 2xl:px-4 md:px-6 xs:p-3 shadow-md"
              style={{background : "linear-gradient(40deg,#cae7eb, transparent)"}}
            >
              <div className="flex w-full rounded-2xl py-1 md:gap-x-8 xl:gap-x-4 xs:gap-x-4">
                <div className="pt-2">
                  <img
                    className="md:w-44 md:h-32 xl:w-48 xl:h-36 sm:size-24 xs:size-20 border border-gray-200 rounded-2xl"
                    src={pledge.imageUrl}
                    alt={pledge.title}
                  />
                </div>
                <div className="md:w-72 xs:w-48 flex flex-col md:gap-y-1 xs:gap-y-1">
                  <p className="text-end xs:text-[10px] md:text-sm text-primary">{pledge.status}</p>
                  <h1 className="xs:text-xs md:text-xl">{pledge.title}</h1>
                  <p className="xs:text-xs text-left md:text-lg md:pt-9">Task Completed: {pledge.taskCompleted}</p>
                  <div className="xs:flex md:hidden w-full items-center gap-x-3 text-xs xs:pt-2 md:pt-0 px-0">
                    {pledge.badges.slice(0, 3).map((badge, index) => (
                      <div
                        key={index}
                        className="flex flex-col justify-center items-center md:text-xs xs:text-[10px] px-0 md:gap-y-3 xs:gap-y-2"
                      >
                        <img className="w-3" src={badge.icon} alt={badge.label} />
                        <p>{badge.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between items-center gap-y-5">
                <div className="xs:hidden md:flex w-full items-center justify-between xl:gap-x-1 xs:gap-x-3 text-xs md:px-0 xs:px-0">
                  {pledge.badges.map((badge, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-center items-center lg:text-xs xs:text-xs md:px-2 xs:px-0 gap-y-3"
                    >
                      <img className="md:w-5 xs:w-4" src={badge.icon} alt={badge.label} />
                      <p>{badge.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between xs:text-xs sm:text-xs md:text-sm w-full xs:px-1 md:px-2">
                  <div className="flex xs:gap-x-1 md:gap-x-3">
                    <h1 className="text-gray-700">End Date:</h1>
                    <p>{pledge.endDate}</p>
                  </div>
                  <div>
                    <button className="text-anchor">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showRightScroll && (
          <button
            className="absolute border border-gray-200 lg:flex xs:hidden -right-6 bg-white p-2 z-10 rounded-full isolate bg-white/80 shadow-xl ring-1 ring-black/5"
            onClick={() => scroll(200)}
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}
