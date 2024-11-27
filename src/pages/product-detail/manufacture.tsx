import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

interface ManufacturingDetails {
  origin: string;
  name: string;
  address: string;
}

interface manufacturingDetail {
  Detail: ManufacturingDetails;
}

function ManufacturingInformation({ Detail }: manufacturingDetail) {
  return (
    <>
      <div className="return-exchange-policy">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline font-light text-lg">
              Manufacturing Information
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <p className="font-medium">Origin:</p>
                  <p className="text-slate-700">{Detail.origin}</p>
                </div>
                <div className="flex space-x-2">
                  <p className="font-medium">Name:</p>
                  <p className="text-slate-700">{Detail.name}</p>
                </div>
                <div className="flex space-x-2">
                  <p className="font-medium">Address:</p>
                  <p className="text-slate-700">{Detail.address}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

export default ManufacturingInformation;
