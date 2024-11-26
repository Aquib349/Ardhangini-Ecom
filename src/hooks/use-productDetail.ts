import { useState, useEffect } from "react";
import { useGlobal } from "./use-global";

interface Product {
  id: string;
  [key: string]: any;
}

interface ProductDetailProps {
  id: string;
}

const useProductDetail = ({ id }: ProductDetailProps) => {
  const [productDetail, setProductDetail] = useState<Product | null>(null);
  const { products } = useGlobal();

  // Function to filter out the product detail
  const getProductDetail = () => {
    const product = products.find((prod: Product) => prod.id === id);
    setProductDetail(product || null);
  };

  // Call getProductDetail when id or products change
  useEffect(() => {
    if (id && products) {
      getProductDetail();
    }
  }, [id, products]);

  return { productDetail };
};

export default useProductDetail;

// {
//     "id": "4e3dae63-698c-481b-8e67-a798ab363e3c",
//     "skuid": "skuid-1",
//     "productName": "Baluchori",
//     "productDescription": "smooth",
//     "averageReview": "0",
//     "numberOfReviews": 0,
//     "offerprice": "799",
//     "actualprice": "999",
//     "available_qty": "0",
//     "isActive": true,
//     "returnExchangePolicy": "within 48 hrs of receiving the product",
//     "cgst": "88",
//     "sgst": "88",
//     "maxQuantityPerCart": "10",
//     "isNew": false,
//     "isTrending": true,
//     "isBestSeller": true,
//     "isExclusive": true,
//     "isShippable": true,
//     "maxAllowedReturnDays": 3,
//     "maxAllowedCancellationDays": 3,
//     "category": {
//         "id": "3c9ab6d6-4ac5-4c77-98cd-3f8c9cc9d430",
//         "name": "cat1",
//         "description": "cat des1",
//         "isActive": false
//     },
//     "subCategory": {
//         "id": "d1e1d752-6426-40c2-9949-6950a998348e",
//         "name": "sub-cat1",
//         "description": "sub-cat-des1",
//         "isActive": false,
//         "category": {
//             "id": "3c9ab6d6-4ac5-4c77-98cd-3f8c9cc9d430",
//             "name": "cat1",
//             "description": "cat des1",
//             "isActive": false
//         }
//     },
//     "productType": {
//         "id": "fd505be8-3c1b-47a1-802f-0d5eb6f35853",
//         "name": "saree",
//         "isActive": false,
//         "description": "saree 1"
//     },
//     "manufacturer": {
//         "id": "62901c92-8428-4014-aca7-7d86d3d704f0",
//         "origin": "manufactur-origin 1",
//         "name": "manufactur1",
//         "address": "manufactur address 1"
//     },
//     "promoDetails": null,
//     "sareeDetails": {
//         "id": "337be756-4201-4dc5-8042-821fbcbcd154",
//         "length": "200",
//         "width": "20",
//         "blousePieceIncluded": true,
//         "blouse_desc": "same color",
//         "fabricDetails": {
//             "id": "e97d2b34-f6c3-495c-8d3c-84403a984295",
//             "fabricName": "fabric 1",
//             "fabricDescription": "fabric origin 1",
//             "washCare": "fabric address 1"
//         }
//     },
//     "productImages": [
//         {
//             "id": "d55c93be-0d2a-4df6-bda6-61c29926f17d",
//             "description": "test",
//             "imageSource": "https://s3.ap-south-1.amazonaws.com/devimages.ardhanginidesigns.com/product-36528a1c-db71-4a45-a32f-cab119f5655d.png",
//             "imageKey": "product-36528a1c-db71-4a45-a32f-cab119f5655d.png",
//             "thumbnailSource": "https://s3.ap-south-1.amazonaws.com/devimages.ardhanginidesigns.com/product-thumbnail-36528a1c-db71-4a45-a32f-cab119f5655d.jpeg",
//             "thumbnailKey": "product-thumbnail-36528a1c-db71-4a45-a32f-cab119f5655d.jpeg"
//         },
//         {
//             "id": "c4241eb0-255b-47d3-95b8-774dfae66dac",
//             "description": "test",
//             "imageSource": "https://s3.ap-south-1.amazonaws.com/devimages.ardhanginidesigns.com/product-72116025-188e-4ad8-93ac-242838ac6d22.jpeg",
//             "imageKey": "product-72116025-188e-4ad8-93ac-242838ac6d22.jpeg",
//             "thumbnailSource": "https://s3.ap-south-1.amazonaws.com/devimages.ardhanginidesigns.com/product-thumbnail-72116025-188e-4ad8-93ac-242838ac6d22.jpeg",
//             "thumbnailKey": "product-thumbnail-72116025-188e-4ad8-93ac-242838ac6d22.jpeg"
//         }
//     ],
//     "collection": {
//         "id": "e43868e7-096c-4b0c-b2e4-8b62ec9bcb13",
//         "name": "Snap & Style",
//         "description": "D1"
//     },
//     "colour": {
//         "id": "491c0699-ef2b-4eb9-bb78-26a9f540b83d",
//         "name": "red"
//     },
//     "print": {
//         "id": "68566b7b-2d1a-4e54-a10b-fe029a134c5b",
//         "name": "print 1",
//         "description": "print desc 1"
//     },
//     "occassion": {
//         "id": "e40630a1-59a1-4d2d-9bd1-68e0b6d5a3fe",
//         "name": "occassion 1",
//         "description": "occassion desc 1"
//     },
//     "style": null
// },
