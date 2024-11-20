import { LoaderCircle, Trash2 } from "lucide-react";
import React from "react";
import emblaCarouselAutoplay from "embla-carousel-autoplay";
import { TiStarFullOutline } from "react-icons/ti";
import { useWishlist } from "../../hooks/use-wishlist";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { useGlobal } from "../../hooks/use-global";
import image from "../../assets/saree.jpg";

function Wishlist() {
  const { wishlistData, DeleteWishlistItem } = useWishlist();
  const { newComers, addItemCart } = useGlobal();
  // const [selectedColor, setSelectedColor] = useState<string | undefined>(
  //   undefined
  // );

  const plugin = React.useRef(
    emblaCarouselAutoplay({ delay: 2000, stopOnInteraction: true })
  );

  // Filter the products in wishlist based on productId
  const wishlistItems = wishlistData?.lineItems.map((item) => {
    return newComers.find((product) => product.id === item.productId);
  });

  if (!wishlistData) {
    return (
      <div className="flex justify-center items-center p-3">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }
  if (wishlistData?.lineItems.length <= 0) {
    return <div className="text-center p-5 text-sm text-slate-400">No Items in wishlist</div>;
  }

  return (
    <>
      <div className="wishlist-component">
        <div className="main grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-2 md:w-[90%] m-auto">
          {/* mapping */}
          {wishlistItems?.map(
            (val) =>
              val && (
                <div
                  key={val.id}
                  className="w-full sm:w-[14rem] md:w-[16rem] bg-white rounded-lg shadow-md relative"
                >
                  {/* Product Image */}
                  <div className="flex justify-center">
                    <Carousel
                      plugins={[plugin.current]}
                      className="w-full max-w-xs"
                      onMouseEnter={plugin.current.stop}
                      onMouseLeave={plugin.current.reset}
                    >
                      <CarouselContent>
                        {/* {val.productImages.map((img, ind) => ( */}
                        <CarouselItem>
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-0 border-none shadow-none">
                              <img
                                src={image}
                                alt="Product"
                                className="object-cover rounded-md w-full"
                              />
                            </CardContent>
                          </Card>
                        </CarouselItem>
                        {/* ))} */}
                      </CarouselContent>
                    </Carousel>
                  </div>

                  {/* Product Title */}
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

                  {/* Color Options */}
                  {/* <div className="mt-2 px-3">
                      <div className="flex space-x-2 mt-1">
                        <div
                          onClick={() => setSelectedColor(val.colour.name)}
                          className={`w-4 h-4 rounded-full cursor-pointer border ${
                            selectedColor === val.colour.name
                              ? "border-black"
                              : "border-gray-300"
                          }`}
                          style={{ backgroundColor: val.colour.name }}
                        ></div>
                      </div>
                    </div> */}

                  {/* Item Description */}
                  <div className="mt-2 px-3">
                    <p className="text-xs">{val.productDescription}</p>
                  </div>

                  {/* Price and Action */}
                  <div className="mt-2 flex flex-col items-start justify-between px-3">
                    <div className="flex items-center gap-x-2">
                      {val.offerprice ? (
                        <>
                          <p className="text-xs sm:text-sm font-semibold text-slate-500 line-through">
                            ₹{val.actualprice}
                          </p>
                          <p className="text-xs sm:text-sm font-medium">
                            ₹{val.offerprice}
                          </p>
                        </>
                      ) : (
                        <p className="text-xs sm:text-sm font-semibold">
                          ₹{val.actualprice}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-x-2 items-center w-full">
                      <Button
                        variant="outline"
                        className="p-2 h-8 border-2 text-red-600 bg-transparent border-red-600"
                        title="Add to Wishlist"
                        onClick={() =>
                          DeleteWishlistItem(val.id, val.productType.id)
                        }
                      >
                        <Trash2 size={16} />
                      </Button>

                      <Button
                        variant="outline"
                        className="p-2 h-8 w-full my-2 bg-blue-500 text-white hover:text-black flex items-center uppercase text-xs font-medium"
                        onClick={() => {
                          addItemCart(val.id, val.productType.id);
                          DeleteWishlistItem(val.id, val.productType.id);
                        }}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
