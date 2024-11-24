import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CollectionNavigation from "./collection-navigation";

const ProductNavigation: React.FC = () => {
  const [hovered, setHovered] = useState<string>("");
  const [active, setActive] = useState<string>("newcomers");
  const navigate = useNavigate();

  return (
    <div className="menubar-compon">
      <div
        className="main md:z-40 md:bg-slate-600 md:text-white z-50 py-2 md:flex md:justify-center md:items-center transition-all
           duration-300 fixed top-[3.2rem] md:top-[7.5rem] left-0 md:shadow-md w-full"
      >
        <div className="hidden md:flex md:justify-center md:items-center m-auto w-full text-xs md:text-sm lg:text-base md:space-x-10 lg:space-x-20">
          {[
            "New Comers",
            "Collections",
            "Saree Quest",
            "Ready To Ship",
            "Ardhangini Exclusive",
          ].map((item) => (
            <span
              key={item}
              className={`bg-transparent hover:bg-transparent hover:text-white font-medium cursor-pointer
                relative group inline-block pb-1 before:absolute before:left-0 before:right-0 before:bottom-0 before:h-0.5 
                before:bg-pink-500 before:scale-x-0 before:origin-center before:transition-transform before:duration-300 
                hover:before:scale-x-100 ${
                  active === item ? "before:scale-x-100" : ""
                }`}
              onClick={() => {
                setActive(item);
                navigate(
                  item !== "Collections" && item === "Ready To Ship"
                    ? `/shippable`
                    : item === "New Comers"
                    ? "/newcomers"
                    : item === "Saree Quest"
                    ? "/saree-quest"
                    : item === "Ardhangini Exclusive"
                    ? "/ardhangini-exclusive"
                    : `/${item?.toLowerCase()}`
                );
              }}
              onMouseEnter={() => setHovered(item)}
              onMouseLeave={() => setHovered("")}
            >
              {item !== "Collections" &&
                item.charAt(0).toUpperCase() + item.slice(1).replace("-", " ")}
              {item === "Collections" && <CollectionNavigation item={item} />}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductNavigation;
