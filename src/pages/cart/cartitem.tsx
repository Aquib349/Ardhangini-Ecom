import { Button } from "../../components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import { useState } from "react";

function CartItem({
  id,
  productTypeId,
  image,
  title,
  size,
  actualPrice,
  finalPrice,
  quantity,
  removeItem,
  addItemWishlist,
  setQuantity,
}: {
  id: string;
  productTypeId: string;
  image: string;
  title: string;
  size: string;
  actualPrice: number;
  finalPrice: number;
  quantity: string;
  removeItem: (productid: string, typeId: string, quantity: number) => void;
  addItemWishlist: (productid: string, typeId: string) => void;
  setQuantity: (quantity: number) => void;
}) {
  const initialCounter = Number(quantity) > 0 ? Number(quantity) : 1;
  const [counter, setCounter] = useState<number>(initialCounter);

  function increaseQuantity(ObjectId: string) {
    if (id === ObjectId) {
      setCounter((prevState) => prevState + 1);
      setQuantity(Number(quantity) + 1);
    }
  }

  function decreaseQuantity(ObjectId: string) {
    if (id === ObjectId) {
      setCounter((prevState) => Math.max(1, prevState - 1));
      setQuantity(Number(quantity) - 1);
    }
  }

  return (
    <div className="flex flex-col md:flex-row md:justify-between p-2 gap-4 md:gap-8">
      <div className="flex items-start gap-4 md:w-2/3">
        <img
          src={image}
          alt={title}
          className="w-28 h-28 md:w-40 md:h-40 object-contain rounded-md"
        />
        <div className="flex-1 space-y-2">
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-gray-500">{size}</p>
          <div className="flex items-center gap-x-2">
            {finalPrice ? (
              <>
                <p className="text-sm font-semibold text-slate-500 line-through">
                  ₹{actualPrice}
                </p>
                <p className="text-sm font-medium">₹{counter * finalPrice}</p>
              </>
            ) : (
              <p className="text-sm font-semibold">₹{actualPrice}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-rose-500 bg-transparent border-0 p-0 h-6 hover:bg-transparent"
              onClick={() => addItemWishlist(id, productTypeId)}
            >
              <Heart size={18} />
            </Button>
            <Button
              variant="outline"
              className="text-red-500 bg-transparent border-0 p-0 h-6 hover:bg-transparent"
              onClick={() => removeItem(id, productTypeId, counter)}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Quantity Control */}
      <div className="flex justify-center md:justify-end items-center space-x-2">
        <Button
          variant="default"
          className="bg-red-600 px-2 py-1 rounded hover:bg-gray-300 h-6"
          onClick={() => decreaseQuantity(id)}
        >
          -
        </Button>
        <span className="font-medium">{counter}</span>
        <Button
          variant="default"
          className="bg-green-600 px-2 py-1 rounded hover:bg-gray-300 h-6"
          onClick={() => increaseQuantity(id)}
        >
          +
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
