import { Dispatch, SetStateAction } from "react";

// global context props interface
export interface GlobalContextProps {
  products: any[];
  fetchAllProduct: () => void;
  addItemWishlist: (productId: string, typeId: string) => void;
  placeOrders: (
    orderType: string,
    deliveryAddress: string,
    billingAddress: string,
    paymentMethod: string,
    quantity: number
  ) => void;
  addresses: UserAddress[];
  addUserAddress: (
    firstName: string,
    lastName: string,
    addressLine1: string,
    addressLine2: string,
    pin: number,
    state: string,
    town: string,
    mobileNumber: string
  ) => void;
  removeUserAddress: (addressId: string) => void;
  setUserAddress: Dispatch<SetStateAction<UserAddress[]>>;
  fetchCartData: () => void;
  addItemCart: (productId: string, typeId: string) => void;
  cartItemData: CartResponse | null;
  setCartItemData: Dispatch<SetStateAction<CartResponse | null>>;
  setItemLength: any;
  itemLength: number;
}

// get all the products -> interface
export interface Product {
  id: string;
  skuid: string;
  productName: string;
  productDescription: string;
  averageReview: string;
  numberOfReviews: number;
  offerprice: string;
  actualprice: string;
  available_qty: string;
  isActive: boolean;
  returnExchangePolicy: string;
  cgst: string;
  sgst: string;
  maxQuantityPerCart: string;
  isNew: boolean;
  isTrending: boolean;
  isBestSeller: boolean;
  isExclusive: boolean;
  isShippable: boolean;
  maxAllowedReturnDays: number;
  maxAllowedCancellationDays: number;
  category: Category;
  subCategory: SubCategory;
  productType: ProductType;
  manufacturer: Manufacturer;
  promoDetails: null | PromoDetails;
  sareeDetails: SareeDetails | null;
  productImages: ProductImage[];
  collection: Collection;
  colour: Colour;
  print: Print;
  occassion: Occassion;
  style: Style | null;
}

interface Category {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

interface SubCategory extends Category {
  category: Category;
}

interface ProductType {
  id: string;
  name: string;
  isActive: boolean;
  description: string;
}

interface Manufacturer {
  id: string;
  origin: string;
  name: string;
  address: string;
}

interface PromoDetails {
  // Add fields based on your actual data structure for promoDetails
}

interface SareeDetails {
  id: string;
  length: string;
  width: string;
  blousePieceIncluded: boolean;
  blouse_desc: string;
  fabricDetails: FabricDetails;
}

interface FabricDetails {
  id: string;
  fabricName: string;
  fabricDescription: string;
  washCare: string;
}

interface ProductImage {
  // Define properties for product images if there are any
}

interface Collection {
  id: string;
  name: string;
  description: string;
}

interface Colour {
  id: string;
  name: string;
}

interface Print {
  id: string;
  name: string;
  description: string;
}

interface Occassion {
  id: string;
  name: string;
  description: string;
}

interface Style {
  // Define properties for style if there are any
}

export interface ProductResponse {
  items: Product[];
  meta: Record<string, any>;
}

export interface NewComersProps {
  products: Product[];
  meta: Record<string, any>;
  // addItemCart: (productId: string, typeId: string) => void;
  // addItemWishlist: (productId: string, typeId: string) => void;
}

// add item to wishlist -> interface
export interface wishlistResponse {
  wishListId: string;
  userId: string;
  lineItems: [
    {
      productId: string;
      typeId: string;
    }
  ];
}

// place an order -> interface
export interface OrderResponse {
  orders: OrderData;
}

export interface OrderData {
  userId: string;
  cartId: string;
  orderId: string;
  userName: string;
  userEmail: string;
  userMobile: string;
  orderType: string;
  OrderStatus: string;
  orderCancellationType: string;
  orderCancellationReason: string;
  totalActualPrice: number;
  totalFinalPrice: number;
  totalCgst: number;
  totalSgst: number;
  cartLineItems: OrderCartLineItem[];
  billingAddress: string;
  shippingAddress: string;
  paymentInfo: PaymentInfo;
  orderTimeLine: OrderTimeLine[];
}

interface OrderCartLineItem {
  productTypeId: string;
  productId: string;
  productName: string;
  productThumbnail: string;
  quantity: number;
  actualPrice: number;
  offerPrice: number;
  promoDiscount: number;
  promoDescription: string;
  totalSgst: number;
  totalCgst: number;
  finalTotalPrice: number;
}

interface PaymentInfo {
  id: string;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  gatewayOrderId: string;
  gatewayPaymentId: string;
  failureReason: string;
}

interface OrderTimeLine {
  id: string;
  eventDate: string;
  eventType: string;
  description: string;
}

// add user address -> interface
export interface UserAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  pin: number;
  state: string;
  town: string;
  mobileNumber: string;
}

// add item to cart -> interface
export interface CartItemDetail {
  id: string;
  productId: string;
  typeId: string;
  quantity: string;
  productTypeId: string;
  productThumbnail: string;
  productName: string;
  actualPricePerItem: number;
  finalPricePerItem: number;
  actualTotalPrice: number;
  finalTotalPrice: number;
  totalSgst: number;
  totalCgst: number;
}

export interface CartResponse {
  cartId: string;
  userId: string;
  cartLineItems: CartItemDetail[];
  actualTotalPrice: number;
  finalTotalPrice: number;
  totalSgst: number;
  totalCgst: number;
  shipping: number;
}
