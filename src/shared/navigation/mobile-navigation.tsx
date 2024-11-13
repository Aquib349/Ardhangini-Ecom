import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileNavigation: React.FC = () => {
  const [active, setActive] = useState("newcomers");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild onClick={() => setIsSheetOpen(true)}>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-3 pt-12 bg-slate-200">
          <SheetHeader>
            <SheetTitle className="absolute top-4 font-bold">Menu</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex flex-col mt-4 space-y-4">
            {["newcomers", "shippable", "ardhangini exclusive"].map((item) => (
              <span
                key={item}
                className={`bg-transparent hover:bg-transparent font-medium cursor-pointer
                relative group inline-block pb-1 before:absolute before:left-0 before:right-0 before:bottom-0 before:h-0.5 
                before:bg-pink-500 before:scale-x-0 before:origin-center before:transition-transform before:duration-300 
                hover:before:scale-x-100 ${
                  active === item ? "before:scale-x-100" : ""
                }`}
                onClick={() => {
                  setActive(item);
                  navigate(`/${item}`);
                  setIsSheetOpen(false);
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </span>
            ))}

            {/* Accordion for Collections and Saree-Quess */}
            <Accordion type="single" collapsible>
              <AccordionItem value="collections" className="border-0">
                <AccordionTrigger className="hover:no-underline py-2">
                  Collections
                </AccordionTrigger>
                <AccordionContent>coming soon...</AccordionContent>
              </AccordionItem>

              <AccordionItem value="saree-quess" className="border-0">
                <AccordionTrigger className="hover:no-underline py-2">
                  Saree-Quess
                </AccordionTrigger>
                <AccordionContent>coming soon...</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNavigation;
