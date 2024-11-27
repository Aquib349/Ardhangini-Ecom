import useProductDetail from "../../hooks/use-productDetail";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useGlobal } from "../../hooks/use-global";
import ProductDetails from "./product-details";

function ProductDetail() {
  const { addItemCart } = useGlobal();
  const { id } = useParams<{ id: string }>();
  const { productDetail } = useProductDetail({ id: id || "" });
  const [mainImage, setMainImage] = useState<string>("");
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const navigate = useNavigate();

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
  const [showZoom, setShowZoom] = useState<boolean>(false);

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

  // function add item to cart
  function addItemToCart(id: string, productTypeId: string) {
    addItemCart(id, productTypeId);
    navigate("/cart");
  }

  // Fallback while the product detail is being fetched
  if (!productDetail) {
    return (
      <div className="py-6 flex justify-center items-center animate-spin">
        <Loader2 />
      </div>
    );
  }

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
              backgroundSize: "200%",
              backgroundPosition: `${hoverPosition.x}% ${hoverPosition.y}%`,
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      )}

      {/* Product Details Section */}
      <ProductDetails
        productDetail={productDetail}
        addItemToCart={addItemToCart}
      />
    </div>
    // </div>
  );
}

export default ProductDetail;
