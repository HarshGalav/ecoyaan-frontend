import { useNavigate } from "react-router-dom";
import "./carousel.css";
import { useEffect, useState, TouchEvent } from "react";

const CarouselImages = ({ images }: any) => {
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


  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 50000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const CustomButton = ({ isExternal }: any) => {
    if (!isExternal) {
      return (
        <button
          className={`button-text sm:left-[12%] md:left-[11%] btn-green sm:px-4 md:px-5 sm:text-sm md:text-base  btn-class ${images[currentIndex].buttonClass}`}
          onClick={() => nav(images[currentIndex].path, { replace: true })}
        >
          {images[currentIndex].buttonText}
        </button>
      );
    } else {
      return (
        <a
          className={`button-text btn-green sm:left-[12%] md:left-[11%] sm:px-4 md:px-5 sm:text-sm md:text-base btn-class ${images[currentIndex].buttonClass}`}
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
        className="xs:hidden sm:block sm:h-[420px] md:h-[478px] xl:h-[478px] carousel fade bg-gradient-to-tr  from-black to-black"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentIndex].image}
          className={`w-full h-full opacity-50 img-fit ${images[currentIndex].imageClass} active`}
          alt={`${images[currentIndex].text1}`}
          style={{
            objectFit: "cover",
            aspectRatio: "1/1",
          }}
        />
        <div className="">
          <div
            className={`xs:text-sm pb-4 md:text-xl xl:text-5xl w-3/4  carousel-text font-bold ${images[currentIndex].textClass}`}
            style={images[currentIndex].textStyle}
          >
            <div className="subHeading sm:w-4/5 lg:w-3/4 text-white font-extrabold mb-7 xs:text-xl md:text-2xl lg:text-4xl ">
              {images[currentIndex].text1}
            </div>
            {/* <div className="xs:text-xs xl:!leading-9 lg:!leading-8 md:!leading-7 text-white xs:w-4/5 sm:w-full md:w-11/12 2xl:w-3/5 sm:text-sm md:text-base lg:text-lg xl:text-xl">
              {images[currentIndex].text2}
            </div> */}
          </div>
          <CustomButton isExternal={images[currentIndex].isExternal} />
        </div>
      </div>
      <div className="indicator sm:flex xs:hidden -top-12">
        {images.map((_image: any, index: any) => (
          <div
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </>
  );
};

export default CarouselImages;
