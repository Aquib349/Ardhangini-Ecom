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
