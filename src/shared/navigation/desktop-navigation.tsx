import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="hidden md:flex md:justify-center md:items-center m-auto w-full text-xs md:text-sm lg:text-base space-x-8">
          {[
            "newcomers",
            "collections",
            "saree-quess",
            "shippable",
            "ardhangini exclusive",
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
                navigate(`/${item}`);
              }}
              onMouseEnter={() => setHovered(item)}
              onMouseLeave={() => setHovered("")}
            >
              {item.charAt(0).toUpperCase() + item.slice(1).replace("-", " ")}
              {(item === "collections" || item === "saree-quess") &&
                hovered === item && (
                  <div className="absolute top-full mt-2 w-[150px] md:w-[200px] bg-white p-4 rounded shadow-lg text-gray-800 text-xs md:text-sm lg:text-base">
                    <p>
                      {item === "collections"
                        ? "coming soon.."
                        : "coming soon.."}
                    </p>
                  </div>
                )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductNavigation;
