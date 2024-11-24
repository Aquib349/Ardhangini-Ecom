import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { useOrders } from "../../hooks/use-order";
import { LoaderCircle } from "lucide-react";

const Orders: React.FC = () => {
  const { AllOrders, cancelOrder } = useOrders();
  const sortedOrders = [...AllOrders].reverse();

  if (!AllOrders) {
    return (
      <div className="flex justify-center items-center p-3">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  if (AllOrders.length <= 0) {
    return (
      <div className="text-center p-5 text-sm text-slate-400">
        You haven't ordered anything yet
      </div>
    );
  }

  return (
    <>
      <div className="py-4">
        <div className="order-component pt-2">
          <div className="main w-full md:w-2/3 mx-auto p-3 bg-white shadow rounded-lg">
            {sortedOrders?.map((order) =>
              order.cartLineItems?.map((val) => (
                <div key={val.id} className="mb-4">
                  <h1 className="px-4 font-medium pb-4 uppercase text-center md:text-left">
                    {order.orderTimeLine[0].eventType} on :{" "}
                    {order.orderTimeLine[0].eventDate}
                  </h1>
                  <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1617039487629-6babdcb2a24b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="item-photo"
                      className="w-full md:w-24 h-24 object-contain mx-auto md:mx-0"
                    />
                    <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
                      <h2 className="text-md font-medium">{val.productName}</h2>
                      {order.orderTimeLine[0].eventType
                        .toLowerCase()
                        .includes("created") ? (
                        <small className="text-sm text-gray-500">
                          Cancel available till order is being shipped
                        </small>
                      ) : (
                        <small className="text-sm text-gray-500">
                          Return or replace item available till : 22nd September
                        </small>
                      )}
                      <div className="flex justify-center md:justify-start space-x-2 mt-2">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button className="h-8 bg-green-100 text-blue-700 font-medium rounded hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                              View Detail
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="p-2 overflow-scroll no-scrollbar">
                            <SheetHeader>
                              <SheetTitle className="px-3">
                                {val.productName}
                              </SheetTitle>
                              <SheetDescription></SheetDescription>
                            </SheetHeader>
                            {/* order-detail */}
                            <div>
                              <div className="order-image mt-4">
                                <img
                                  src="https://images.unsplash.com/photo-1617039487629-6babdcb2a24b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                  alt="order-image"
                                  className="object-cover w-32 mx-auto rounded-md border-4 border-slate-500"
                                />
                              </div>
                              <div className="p-4 m-3">
                                <h3 className="font-semibold mb-2">Details</h3>
                                <div className="space-y-2 text-xs">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Item</span>
                                    <span className="font-medium">
                                      {val.productName}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">
                                      Quantity
                                    </span>
                                    <span className="font-medium">
                                      {val.cartLineItem.quantity}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">
                                      Colour
                                    </span>
                                    <span className="font-medium">-</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">
                                      Purchase Date
                                    </span>
                                    <span className="font-medium">
                                      {
                                        order.orderTimeLine[0].eventDate.split(
                                          ","
                                        )[0]
                                      }
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">
                                      Payment Status
                                    </span>
                                    <span className="font-medium text-purple-500">
                                      {order.paymentInfo.paymentStatus}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">
                                      Order Status
                                    </span>
                                    <span className="font-medium text-green-500">
                                      {order.OrderStatus}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <hr />

                              <div className="p-4 m-3">
                                <h3 className="font-semibold mb-2">
                                  Billing Address
                                </h3>
                                <div className="space-y-2 text-xs">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">
                                      Location
                                    </span>
                                    <span className="font-medium w-1/3">
                                      {order.billingAddress.split(",")[1]},
                                      {order.billingAddress.split(",")[2]},
                                      {order.billingAddress.split(",")[3]},
                                      {order.billingAddress.split(",")[4]}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">City</span>
                                    <span className="font-medium">-</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">State</span>
                                    <span className="font-medium">
                                      {order.billingAddress.split(",")[5]}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">
                                      PinCode
                                    </span>
                                    <span className="font-medium">
                                      {order.billingAddress.split(",")[6]}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <hr />

                              <div className="bg-white rounded-md p-4 shadow-sm">
                                <h1 className="pb-2 font-semibold">
                                  Activity TimeLine
                                </h1>
                                {order.orderTimeLine.map((timeline: any) => (
                                  <div
                                    key={timeline.id}
                                    className="flex items-start mb-2"
                                  >
                                    <div className="relative mr-4 pt-[0.25rem]">
                                      <div className="relative w-3.5 h-3.5 rounded-full bg-indigo-500 flex items-center justify-center">
                                        <svg
                                          className="w-3 h-3 text-white"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      </div>
                                      <div className="w-0.5 h-8 bg-gray-300 absolute top-4.5 left-1/2 transform -translate-x-1/2"></div>
                                    </div>
                                    <div className="flex-1">
                                      <h3 className="text-sm font-semibold">
                                        {timeline.eventType}
                                      </h3>
                                      <p className="text-xs text-gray-500">
                                        {timeline.eventDate}
                                      </p>
                                      <small className="leading-[0.1rem]">
                                        {timeline.description}
                                      </small>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <hr />
                              <Button
                                className={`mt-2 h-8 w-full md:w-auto ${
                                  order?.OrderStatus?.toLowerCase() ===
                                  "order cancelled"
                                    ? "bg-slate-400"
                                    : "bg-orange-500"
                                }`}
                                onClick={() => cancelOrder(order.orderId)}
                                disabled={
                                  order.OrderStatus?.toLowerCase() ===
                                  "order cancelled"
                                }
                              >
                                {order.OrderStatus?.toLowerCase() ===
                                "order cancelled"
                                  ? "Cancelled"
                                  : "Cancel"}
                              </Button>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                    </div>
                  </div>
                  <hr className="my-3" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
