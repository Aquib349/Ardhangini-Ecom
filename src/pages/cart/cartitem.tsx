import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import { Label } from "../../components/ui/label";
import { toastService } from "../../services/toast.service";

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
  // function to set quantity
  function Quantity(e: any) {
    setQuantity(Number(e.target.value));
    if (Number(e.target.value) > 5) {
      toastService.showToast("maximum 5 you can order", "error", {
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
                  ₹{Number(quantity) * finalPrice}
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
              onClick={() => removeItem(id, productTypeId, Number(quantity))}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Quantity Control */}
      <div className="flex flex-col space-y-2">
        <Label>Quantity</Label>
        <Input type="number" defaultValue={quantity} onChange={Quantity} />
      </div>
    </div>
  );
}

export default CartItem;
