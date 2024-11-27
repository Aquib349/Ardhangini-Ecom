import { useEffect, useState } from "react";
import CartItem from "./cartitem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import UserForm from "../profile/user-form";
import Payment from "./payment";
import { useCart } from "../../hooks/use-cart";
import { useGlobal } from "../../hooks/use-global";

interface Address {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  pin: number;
  mobileNumber: string;
}

const Cart = () => {
  const { removeItem } = useCart();
  const {
    addItemWishlist,
    placeOrders,
    addresses,
    addUserAddress,
    cartItemData,
  } = useGlobal();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isCodEnabled, setIsCodEnabled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [quantity, setQuantity] = useState<number>(1);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  // Function to set the payment method
  function handlePaymentMethod() {
    setIsCodEnabled((prev) => !prev);
  }

  // Function to select address
  function selectDeliveryAddress(address: Address) {
    setSelectedAddress(
      `${address.firstName} ${address.lastName}, ${address.addressLine1}, ${address.addressLine2}, ${address.state}, ${address.pin}, ${address.mobileNumber}`
    );
  }

  // const handleCopyCode = () => {
  //   navigator.clipboard.writeText("BFD10");
  //   alert("Coupon code copied!");
  // };

  useEffect(() => {
    if (isCodEnabled) {
      setPaymentMethod("cod");
    } else {
      setPaymentMethod("");
    }
  }, [isCodEnabled, quantity]);

  const handlePlaceOrder = () => {
    placeOrders(
      "cashondelivery",
      selectedAddress,
      selectedAddress,
      paymentMethod,
      quantity
    );
    closeDialog();
  };

  if (cartItemData?.cartLineItems?.length! <= 0) {
    return (
      <div className="text-sm text-center py-4">
        You haven't added any items to your cart!
      </div>
    );
  }

  return (
    <div className="pb-16">
      <div className="flex flex-col lg:flex-row gap-8 px-4 py-2 text-sm w-[95%] m-auto relative">
        <div className="w-full lg:w-2/3">
          <div className="space-y-2">
            {cartItemData?.cartLineItems.map((val) => (
              <CartItem
                key={val.id}
                id={val.productId}
                productTypeId={val.productTypeId}
                image={val.productThumbnail}
                title={val.productName}
                size="fixed size"
                actualPrice={val.actualPricePerItem}
                finalPrice={val.finalPricePerItem}
                quantity={val.quantity}
                removeItem={removeItem}
                addItemWishlist={addItemWishlist}
                setQuantity={setQuantity}
              />
            ))}
          </div>
        </div>

        {cartItemData?.cartLineItems?.length! > 0 && (
          <div className="w-full lg:w-1/3 space-y-4">
            {/* Address Selection */}
            <div className="border px-4 rounded-lg mt-2">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="pr-4">
                  <AccordionTrigger className="hover:no-underline text-md">
                    Saved Address
                  </AccordionTrigger>
                  <AccordionContent>
                    <RadioGroup
                      value={selectedAddress}
                      onValueChange={(value: any) => setSelectedAddress(value)}
                    >
                      {addresses?.map((address, index) => (
                        <div key={index} className="flex justify-between">
                          <div className="flex justify-between items-center py-4 border-b">
                            <p className="font-mono">
                              {address.firstName} {address.lastName} <br />
                              {address.addressLine1} <br />
                              {address.addressLine2} <br />
                              {address.state}, {address.pin} <br />
                              {address.mobileNumber}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value={`${address.firstName} ${address.lastName}, ${address.addressLine1}, ${address.addressLine2}, ${address.state}, ${address.pin}, ${address.mobileNumber}`}
                              id={`address-${index}`}
                              onClick={() => selectDeliveryAddress(address)}
                            />
                          </div>
                        </div>
                      ))}
                    </RadioGroup>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          className="h-8 mt-2 text-sm text-blue-500 bg-transparent border-none p-0 hover:bg-transparent hover:text-red-500"
                          variant="outline"
                          onClick={openDialog}
                        >
                          Change Address
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[800px]">
                        <DialogHeader>
                          <DialogTitle className="p-0 m-0">
                            Add Address
                          </DialogTitle>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <UserForm
                          addUserAddress={addUserAddress}
                          onClose={closeDialog}
                        />
                      </DialogContent>
                    </Dialog>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Cart Summary */}
            <div className="border px-4 py-3 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Cart Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{Number(cartItemData?.finalTotalPrice).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>SGST</span>
                <span>₹{cartItemData?.totalSgst}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>CGST</span>
                <span>₹{cartItemData?.totalCgst}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between mb-2 text-green-500">
                <span>Free Shipping Promo</span>
                <span>-₹0.00</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total Cost</span>
                <span>
                  ₹
                  {Number(
                    (cartItemData?.finalTotalPrice ?? 0) +
                      (cartItemData?.totalSgst ?? 0) +
                      (cartItemData?.totalCgst ?? 0)
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Payment Method */}
            <Payment
              isCodEnabled={isCodEnabled}
              handleToggle={handlePaymentMethod}
            />

            {/* Checkout Section */}
            <Button
              className={`w-full text-white py-2 rounded-md ${
                quantity > 5
                  ? "bg-slate-400"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              onClick={handlePlaceOrder}
              disabled={quantity > 5}
            >
              Place Order
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
