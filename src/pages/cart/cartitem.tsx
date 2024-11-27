import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import { Label } from "../../components/ui/label";
import { toastService } from "../../services/toast.service";
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
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [counter, setCounter] = useState<number>(Number(quantity));

  // Handle input changes for quantity
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;

    // Allow only numbers (positive integers) and empty input
    if (/^\d*$/.test(inputValue)) {
      const value = Number(inputValue);

      if (value > 0 && value <= 5) {
        setCounter(value);
        setQuantity(value);
      } else if (value > 5) {
        toastService.showToast("Maximum 5 items can be ordered", "error", {
          position: "top-center",
        });
      } else if (inputValue === "") {
        setCounter(0);
        setQuantity(0);
      }
    }
  }

  // Increment quantity
  function IncreaseQuantity() {
    if (counter < 5) {
      const newQuantity = counter + 1;
      setCounter(newQuantity);
      setQuantity(newQuantity);
    } else {
      toastService.showToast("Maximum 5 items can be ordered", "error", {
        position: "top-center",
      });
    }
  }

  // Decrement quantity
  function DecreaseQuantity() {
    if (counter > 1) {
      const newQuantity = counter - 1;
      setCounter(newQuantity);
      setQuantity(newQuantity);
    } else {
      toastService.showToast("Minimum 1 item required", "error", {
        position: "top-center",
      });
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
                <p className="text-sm font-medium">
                  ₹{Number(counter * finalPrice).toFixed(2)}
                </p>
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
      <div className="flex flex-col space-y-2">
        <Label>Quantity</Label>
        <div className="flex items-center gap-x-2">
          <Button
            className="bg-green-600 hover:bg-green-700 h-6 p-3"
            variant="default"
            onClick={IncreaseQuantity}
          >
            +
          </Button>
          <Input
            type="number"
            className="w-16"
            value={counter}
            onChange={handleInputChange}
          />
          <Button
            className="bg-red-600 hover:bg-red-700 h-6 p-3"
            variant="default"
            onClick={DecreaseQuantity}
          >
            -
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
