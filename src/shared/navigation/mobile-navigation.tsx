import Cookies from "js-cookie";
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
import { LogOut, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { apiClient, handleApiError } from "../../services/axios.service";
import { useGlobal } from "../../hooks/use-global";

interface Collection {
  id: string;
  name: string;
  description: string;
}

const MobileNavigation: React.FC = () => {
  const { logout } = useAuth();
  const { filterCollection } = useGlobal();
  const [active, setActive] = useState("newcomers");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const accessToken = Cookies.get("accessToken");
  const userId = localStorage.getItem("userId") || "";
  const [collections, setCollections] = useState<Collection[]>([]);
  const navigate = useNavigate();

  // function to get all the collections
  async function allCollections() {
    try {
      const response = await apiClient.get("/product-collection");
      setCollections(response.data);
    } catch (error) {
      handleApiError(error);
      console.log(error);
    }
  }

  useEffect(() => {
    allCollections();
  }, []);

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild onClick={() => setIsSheetOpen(true)}>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-3 pt-12 bg-slate-200">
          <SheetHeader>
            <SheetTitle className="absolute top-4 font-medium text-sm">
              Welcome {localStorage.getItem("name")}
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex flex-col mt-4 space-y-4">
            {[
              "Newcomers",
              "Collections",
              "Saree-Quest",
              "Ready To Ship",
              "Ardhangini Exclusive",
            ].map((item) => (
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
                  if (item !== "Collections") {
                    navigate(
                      item === "Ready To Ship"
                        ? `/shippable`
                        : item === "Newcomers"
                        ? "/newcomers"
                        : item === "Saree-Quest"
                        ? "/saree-quest"
                        : item === "Ardhangini Exclusive"
                        ? "/ardhangini-exclusive"
                        : `#`
                    );
                    setIsSheetOpen(false);
                  }
                }}
              >
                {item !== "Collections" &&
                  item.charAt(0).toUpperCase() + item.slice(1)}
                {item === "Collections" && (
                  <Accordion type="single" collapsible>
                    <AccordionItem value="collections" className="border-0">
                      <AccordionTrigger className="hover:no-underline m-0 p-0">
                        {item}
                      </AccordionTrigger>
                      <AccordionContent>
                        {collections.map((collection) => (
                          <div
                            key={collection.id}
                            className="hover:bg-slate-200 hover:rounded-lg p-2 cursor-pointer"
                            onClick={() => {
                              filterCollection(collection.name);
                              navigate(`/collections`);
                              setIsSheetOpen(false);
                            }}
                          >
                            <h1 className="font-medium">{collection.name}</h1>
                            <p className="text-xs text-gray-600">
                              {collection.description}
                            </p>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </span>
            ))}
          </div>
          <div
            className="absolute bottom-3 flex items-center space-x-3 bg-transparent hover:bg-transparent font-medium cursor-pointer
                group pb-1 before:absolute before:left-0 before:right-0 before:bottom-0 before:h-0.5 
                before:bg-pink-500 before:scale-x-0 before:origin-center before:transition-transform before:duration-300 
                hover:before:scale-x-100"
            onClick={() => {
              setIsSheetOpen(false);
              if (accessToken) {
                logout(userId);
              } else {
                navigate("/login");
              }
            }}
          >
            <LogOut className="h-4 w-4" />
            <span>{accessToken ? "Logout" : "Login"}</span>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNavigation;
