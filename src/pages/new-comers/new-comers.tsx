import React, { useState } from "react";
import emblaCarouselAutoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { TiStarFullOutline } from "react-icons/ti";
import { Button } from "../../components/ui/button";
import { Heart } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import image from "../../assets/saree.jpg";
import { useGlobal } from "../../hooks/use-global";
import { useNavigate } from "react-router-dom";

const NewComers: React.FC = () => {
  const { newComers, addItemWishlist, addItemCart } = useGlobal();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const plugin = React.useRef(
    emblaCarouselAutoplay({ delay: 2000, stopOnInteraction: true })
  );

  const totalPages = Math.ceil(newComers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = newComers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // funciton to add item to wishlist
  const AddToWishlist = (id: string, productId: string) => {
    addItemWishlist(id, productId);
  };

  // function to add item to cart
  const AddToCart = (id: string, productId: string) => {
    addItemCart(id, productId);
  };

  return (
    <>
      <div className="pb-16">
        <div className="new-comers grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-2 mb-8 md:w-[90%] m-auto">
          {currentProducts.map((val) => (
            <div
              key={val.id}
              className="main md:py-4 p-0.5"
              onClick={() => navigate(`/product-detail/${val.id}`)}
            >
              <div className="w-full max-w-xs mx-auto bg-white rounded-lg mb-4 relative">
                <div className="flex justify-center cursor-pointer">
                  <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    onMouseEnter={plugin.current?.stop}
                    onMouseLeave={plugin.current?.reset}
                  >
                    <CarouselContent>
                      {(val.productImages.length > 0
                        ? val.productImages
                        : []
                      ).map((img: any) => (
                        <CarouselItem key={img.id}>
                          <Card className="border-none shadow-none">
                            <CardContent className="flex aspect-square items-center justify-center p-0 border-none shadow-none">
                              <img
                                src={
                                  img && img.imageSource
                                    ? img.imageSource
                                    : image
                                }
                                alt="product"
                                className="object-cover rounded-md w-full"
                              />
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-3 pt-2">
                  <h3 className="text-sm font-medium text-gray-800 truncate w-full">
                    {val.productName}
                  </h3>

                  <div className="mt-2 md:mt-0">
                    <Badge className="h-5 px-1 rounded-sm font-normal flex gap-1 items-center bg-green-500">
                      <span className="font-medium">3.4</span>
                      <TiStarFullOutline className="font-bold mb-0.5" />
                    </Badge>
                  </div>
                </div>

                <div className="mt-2 px-3">
                  <p className="text-xs">{val.productDescription}</p>
                </div>

                <div className="mt-2 flex flex-col items-start justify-between px-3">
                  <div className="flex items-center gap-x-2">
                    {val.offerprice ? (
                      <>
                        <p className="text-xs text-slate-500 line-through">
                          ₹{val.actualprice}
                        </p>
                        <p className="text-sm font-semibold">
                          ₹{val.offerprice}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-semibold">
                        ₹{val.actualprice}
                      </p>
                    )}
                  </div>

                  <div className="absolute right-2 top-2">
                    <Button
                      variant="outline"
                      className="p-2 h-8 border-none"
                      title="Add to Wishlist"
                      onClick={() => AddToWishlist(val.id, val.productType.id)}
                    >
                      <Heart size={16} />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    className="p-2 h-8 w-full my-2 bg-blue-500 text-white hover:text-black flex items-center uppercase text-xs font-medium"
                    onClick={() => AddToCart(val.id, val.productType.id)}
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              />
            </PaginationItem>
            {Array.from(Array(totalPages).keys()).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(page + 1)}
                  isActive={currentPage === page + 1}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  handlePageChange(Math.min(currentPage + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default NewComers;
