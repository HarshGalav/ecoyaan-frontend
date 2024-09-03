import { useNavigate } from "react-router-dom";
import "./carousel.css";

interface ICarouselProps {
  items: ICarouselItem[];
}

interface ICarouselItem {
  image: string;
  text: string;
  link: string;
}

function Carousel({ items }: ICarouselProps) {
  return (
    <div id="slideshow">
      <div className="slide-wrapper">
        {items.map((item) => {
          return (
            <CarouselItem
              image={item.image}
              text={item.text}
              link={item.link}
              key={item.text}
            />
          );
        })}
      </div>
    </div>
  );
}

function CarouselItem({ image, text, link }: ICarouselItem) {
  return (
    <div className="slide">
      <img src={image} className="w-full img-fit" />
      <div className="text-xl md:text-2xl xl:text-3xl carousel-text">
        {text}
      </div>
    </div>
  );
}

export default Carousel;
