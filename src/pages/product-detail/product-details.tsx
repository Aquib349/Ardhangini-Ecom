import { Badge } from "../../components/ui/badge";
import { TiStarFullOutline } from "react-icons/ti";
import ReturnExchangePolicy from "./return-exchange";
import ManufacturingInformation from "./manufacture";
import SareeDetail from "./saree-detail";
import { Button } from "../../components/ui/button";

interface ProductDetailsProps {
  productDetail: any;
  addItemToCart: (id: string, productTypeId: string) => void;
}

function ProductDetails({ productDetail, addItemToCart }: ProductDetailsProps) {
  return (
    <>
      <div className="product-detail">
        <div className="space-y-4">
          <div className="space-y-0">
            <h1 className="text-2xl font-semibold">
              {productDetail.productName}
            </h1>
            <p className="text-gray-600">{productDetail.productDescription}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="mt-2 md:mt-0">
              <Badge className="h-5 px-1 rounded-sm font-normal flex gap-1 items-center bg-green-500">
                <span className="font-medium">3.4</span>
                <TiStarFullOutline className="font-bold mb-0.5" />
              </Badge>
            </div>
            <span className="text-sm text-gray-500">(23 reviews)</span>
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

          {/* add to cart button */}
          <hr />
          <Button
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
            onClick={() =>
              addItemToCart(productDetail.id, productDetail.productType.id)
            }
          >
            Add To Cart
          </Button>

          <div className="mt-6">
            {/* SAREE Detail */}
            <SareeDetail
              length={productDetail.sareeDetails.length}
              width={productDetail.sareeDetails.width}
              blousepieceincluded={
                productDetail.sareeDetails.blousePieceIncluded
              }
              blouse_desc={productDetail.sareeDetails.blouse_desc}
              fabricDetails={productDetail.sareeDetails.fabricDetails}
              color={productDetail.colour.name}
            />

            {/* return & exchange policy */}
            <ReturnExchangePolicy
              returnExchangePolicy={productDetail.returnExchangePolicy}
            />

            {/* manufacturing information */}
            <ManufacturingInformation Detail={productDetail.manufacturer} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
