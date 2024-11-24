import { Button } from "../../components/ui/button";
import Banner2 from "../../assets/Banner2.jpg";
import Banner1 from "../../assets/ban1.png";
import Saree1 from "../../assets/saree.jpg";
import Saree2 from "../../assets/012A0155[1].jpg";
import Saree3 from "../../assets/012A0431.jpg";
import Saree4 from "../../assets/012A0599[1].jpg";
import Saree5 from "../../assets/012A8426[1].jpg";
import Saree6 from "../../assets/012A8459[1].jpg";

import Categories from "./categories";
import TestimonialCarousel from "./testimonials";
import Commitment from "./commitment";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";
import { Card, CardContent } from "../../components/ui/card";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { useGlobal } from "../../hooks/use-global";

const Home: React.FC = () => {
  const photos = [
    { id: 1, images: Saree1 },
    { id: 2, images: Saree2 },
    { id: 3, images: Saree3 },
    { id: 4, images: Saree4 },
    { id: 5, images: Saree5 },
    { id: 6, images: Saree6 },
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const navigate = useNavigate();
  return (
    <>
      <div className="z-30 w-full relative bg-center bg-no-repeat md:bg-cover bg-contain no-scrollbar overflow-hidden">
        <Carousel
          plugins={[plugin.current]}
          className="w-full md:hidden"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {photos.map((img, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-0">
                      <img
                        src={img.images}
                        alt="loading..."
                        className="h- w-full object-cover bg-opacity-80"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* <img src={Banner2} alt="loading.." className="hidden md:block" /> */}

        <Carousel
          plugins={[plugin.current]}
          className="w-full hidden md:block"
          // style={{ height: `calc(100vh - 10rem)` }}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="w-full h-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <img
                  src={Banner2}
                  alt="laoding.."
                  className="w-[100vw] h-full object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="absolute bottom-[10rem] md:bottom-20 lg:bottom-36 left-1/2 transform -translate-x-1/2 flex flex-col items-center md:items-start text-center md:text-left p-4 w-[80%] m-auto z-30">
          {/* <p className="text-lg md:text-[2.5rem] lg:text-[3.5rem] md:leading-[3rem] lg:leading-[3.5rem] font-semibold text-white md:text-black/70">
            Discover a <br /> World Of Best <br /> Sarees
          </p> */}
          <Button
            variant="outline"
            className="text-white font-medium rounded md:h-9 bg-black/70 cursor-pointer mt-2 md:mt-6 lg:mt-8 text-sm p-2 z-50 h-6"
            onClick={() => navigate("/saree-quest")}
          >
            See All Collections
          </Button>
        </div>

        <img
          src={Banner1}
          alt="Banner Overlay"
          className="hidden md:block w-[50%] lg:w-[60%] absolute bottom-4 left-0 h-auto z-10"
        />
      </div>

      {/* home layout sections */}
      <Categories />
      <TestimonialCarousel />
      <Commitment />
    </>
  );
};

export default Home;
