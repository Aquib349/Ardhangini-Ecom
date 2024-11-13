import { useState } from "react";
import { Trash2 } from "lucide-react";

import UserForm from "./user-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";

interface addressProps {
  addresses: any[];
  removeUserAddress: (addressId: string) => void;
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
}

function UserAddress({
  addresses,
  removeUserAddress,
  addUserAddress,
}: addressProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="pr-4">
          <AccordionTrigger className="hover:no-underline">
            Saved Address
          </AccordionTrigger>
          <AccordionContent>
            {addresses?.map((address) => (
              <div
                key={address.id}
                className="flex justify-between items-center p-2 mb-2"
              >
                <p className="font-mono">
                  {address.firstName} {address.lastName} <br />
                  {address.addressLine1} <br />
                  {address.addressLine2} <br />
                  {address.state}, {address.pin} <br />
                  {address.mobileNumber}
                </p>

                <Button
                  variant="outline"
                  className="border-0 text-red-500 p-0"
                  onClick={() => removeUserAddress(address.id)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="h-8 mt-2 text-xs bg-green-200 border-2 hover:bg-green-300 border-green-600 text-green-600"
                  variant="outline"
                  onClick={openDialog}
                >
                  Add
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle className="p-0 m-0">Add Address</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                {/* Pass the closeDialog function to UserForm */}
                <UserForm
                  addUserAddress={addUserAddress}
                  onClose={closeDialog}
                />
              </DialogContent>
            </Dialog>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default UserAddress;
