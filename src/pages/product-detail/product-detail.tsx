import useProductDetail from "../../hooks/use-productDetail";
import { Badge } from "../../components/ui/badge";
import React, { useEffect, useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

function ProductDetail() {
  const [mainImage, setMainImage] = useState<string>(
    "https://plus.unsplash.com/premium_photo-1661964329971-b295ec89c7c9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [showZoom, setShowZoom] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();
  const { productDetail } = useProductDetail({ id: id || "" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHoverPosition({ x, y });
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  // Fallback while the product detail is being fetched
  if (!productDetail) {
    return (
      <div className="py-6 flex justify-center items-center animate-spin">
        <Loader2 />
      </div>
    );
  }

  // Set main image when product details are available
  useEffect(() => {
    if (
      productDetail &&
      productDetail.productImages &&
      productDetail.productImages.length > 0
    ) {
      setMainImage(productDetail.productImages[0].imageSource);
    }
  }, [productDetail]);

  return (
    <div className="p-6 mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image Section */}
      <div className="flex md:flex-row flex-col gap-4">
        {/* Thumbnail Carousel */}
        <div className="flex gap-2 md:flex-col md:space-y-2 order-2 md:order-1">
          {productDetail.productImages.map((thumbnail: any, index: any) => (
            <img
              key={thumbnail.id}
              src={thumbnail.thumbnailSource}
              alt={`Thumbnail ${index + 1}`}
              className={`w-20 h-20 md:w-28 md:h-28 object-cover rounded-md cursor-pointer border ${
                mainImage === thumbnail ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setMainImage(thumbnail.thumbnailSource)}
            />
          ))}
        </div>

        {/* Main Image */}
        <div
          className="relative aspect-square w-full overflow-hidden order-1 md:order-2"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={mainImage}
            alt="Product"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Zoomed Image Box */}
      {showZoom && (
        <div className="relative w-full h-full hidden lg:block">
          <div
            className="w-full h-full border rounded-lg overflow-hidden"
            style={{
              backgroundImage: `url(${mainImage})`,
              backgroundSize: "200%", // Adjust the zoom level
              backgroundPosition: `${hoverPosition.x}% ${hoverPosition.y}%`,
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      )}

      {/* Product Details Section */}
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{productDetail.productName}</h1>
        <div className="flex items-center space-x-2">
          <div className="mt-2 md:mt-0">
            <Badge className="h-5 px-1 rounded-sm font-normal flex gap-1 items-center bg-green-500">
              <span className="font-medium">3.4</span>
              <TiStarFullOutline className="font-bold mb-0.5" />
            </Badge>
          </div>
          <span className="text-sm text-gray-500">(623 reviews)</span>
        </div>
        <div className="flex items-center gap-x-2">
          {productDetail.offerprice ? (
            <>
              <p className="text-xs text-slate-500 line-through">
                ₹{productDetail.actualprice}
              </p>
              <p className="text-sm font-semibold">
                ₹{productDetail.offerprice}
              </p>
            </>
          ) : (
            <p className="text-sm font-semibold">
              ₹{productDetail.actualprice}
            </p>
          )}
        </div>
        <div>
          <h3 className="font-medium">Description</h3>
          <p className="text-gray-600">{productDetail.productDescription}</p>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default ProductDetail;
