import { useNavigate } from "react-router-dom";
import "../../../../components/carousel/carousel.css";
import { useEffect, useState, TouchEvent } from "react";

const MobileCarousel = ({ images }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const nav = useNavigate();

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      images?.length === 0
        ? 0
        : prevIndex === images?.length - 1
          ? 0
          : prevIndex + 1,
    );
  };
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      if (touchStartX - touchEndX > 50) {
        handleNext();
      } else if (touchEndX - touchStartX > 50) {
        handlePrevious();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // const handlePrevious = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
  //   );
  // };
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const CustomButton = ({ isExternal }: any) => {
    if (!isExternal) {
      return (
        <button
          className={`button-text btn-green md:px-8 xs:px-3 text-center w-max xs:py-1 md:text-xl xs:text-xs btn-class ${images[currentIndex].buttonClass}`}
          onClick={() => nav(images[currentIndex].path, { replace: true })}
        >
          {images[currentIndex].buttonText}
        </button>
      );
    } else {
      return (
        <a
          className={`button-text btn-green md:px-8 xs:px-3 text-center w-max xs:py-1 md:text-xl xs:text-xs   btn-class ${images[currentIndex].buttonClass}`}
          href={images[currentIndex].path}
          target="_blank"
        >
          {images[currentIndex].buttonText}
        </a>
      );
    }
  };

  return (
    <>
      <div
        className="xs:flex  sm:hidden carousel xs:!h-48 fade bg-gradient-to-tr  from-black to-gray-600"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-full  flex items-center justify-center relative">
          <img
            src={images[currentIndex].image}
            className={`w-full h-full bg-blend-luminosity relative opacity-70 img-fit filter blur-sm ${images[currentIndex].imageClass} active`}
            alt={`${images[currentIndex].text1}`}
            style={{
              objectFit: "cover",
              aspectRatio: "1/1",
            }}
          />
          <div className="absolute lg:right-16 md:right-6 xs:right-5 top-6 rounded-2xl shadow-lg ">
            <img
              src={images[currentIndex].image}
              className={` size-[9rem] opacity-85 rounded-2xl img-fit ${images[currentIndex].imageClass} active`}
              alt={`${images[currentIndex].text1}`}
              style={{
                objectFit: "cover",
                aspectRatio: "1/1",
              }}
            />
          </div>
        </div>

        <div className="">
          <div
            className={`xs:text-xs pb-4 xs:left-0  md:text-xl xl:text-5xl w-3/4  carousel-text font-bold ${images[currentIndex].textClass}`}
            style={images[currentIndex].textStyle}
          >
            <div className="subHeading md:w-3/5 xs:w-2/3 pl-3 text-white font-bold sm:mb-7 xs:mb-3 lg:text-4xl xs:text-sm ">
              {images[currentIndex].text1}
            </div>
          </div>
          <div className="absolute bottom-20 left-5">
            <CustomButton isExternal={images[currentIndex].isExternal} />
          </div>
        </div>
      </div>
      <div className="indicator sm:hidden xs:flex -top-10 !left-5">
        {images.map((_image: any, index: any) => (
          <div
            key={index}
            className={`dot h-[5px] w-[5px] ${currentIndex === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </>
  );
};

export default MobileCarousel;
