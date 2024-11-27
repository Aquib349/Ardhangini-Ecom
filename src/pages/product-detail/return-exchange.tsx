import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

function ReturnExchangePolicy({
  returnExchangePolicy,
}: {
  returnExchangePolicy: string;
}) {
  return (
    <>
      <div className="return-exchange-policy">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline font-light text-lg">
              Return & Exchange Policy
            </AccordionTrigger>
            <AccordionContent>{returnExchangePolicy}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

export default ReturnExchangePolicy;
