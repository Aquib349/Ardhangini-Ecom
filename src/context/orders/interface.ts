interface PaymentInfo {
  id: string;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  gatewayOrderId: string;
  gatewayPaymentId: string;
  failureReason: string;
}

export interface AllOrderProps {
  AllOrders: CartData[];
  cancelOrder: (orderId: string) => void;
}

export interface CartData {
  cartId: string;
  userId: string;
  cartLineItems: CartLineItem[];
  totalActualPrice: string;
  totalFinalPrice: string;
  totalCgst: string;
  totalSgst: string;
  OrderStatus: string;
  orderType: string;
  orderCancellationType: string;
  orderCancellationReason: string | null;
  paymentInfo: PaymentInfo;
  orderTimeLine: OrderTimeline[];
  orderId: string;
  billingAddress: string;
  shippingAddress: string;
}

export interface CartLineItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  modifiedBy: string | null;
  perItemActualPrice: string;
  perItemOfferPrice: string;
  perItemFinalPrice: string;
  totalActualPrice: string;
  totalOfferPrice: string;
  sgstPerItem: string;
  cgstPerItem: string;
  totalSgst: string;
  totalCgst: string;
  promoDescription: string | null;
  promoDiscountPerItem: string;
  totalPromoDiscount: string;
  totalFinalPrice: string;
  cartLineItem: {
    id: string;
    quantity: string;
  };
  productId: string;
  productTypeId: string;
  productName: string;
  actualPrice: string;
  offerPrice: string;
  quantity: string;
  finalTotalPrice: string;
}

export interface OrderTimeline {
  id: string;
  eventDate: string;
  eventType: string;
  description: string | null;
}
