export interface wishlistProps {
  wishlistData: WishlistResponse | null;
  fetchWishlistItem: () => void;
  DeleteWishlistItem: (productId: string, typeId: string) => void;
}

export interface Wishlist {
  wishListId: string;
  userId: string;
  lineItems: lineItems[];
}

interface lineItems {
  productId: string;
  typeId: string;
}

export interface WishlistResponse {
  wishListId: string;
  userId: string;
  lineItems: lineItems[];
}

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
