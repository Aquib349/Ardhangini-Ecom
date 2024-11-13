// Interface for Cart context
export interface CartContextProps {
  removeItem: (productId: string, typeId: string, quantity: number) => void;
}
