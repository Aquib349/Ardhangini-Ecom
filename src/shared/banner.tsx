import { Flame } from "lucide-react";
import { useState } from "react";

const Banner: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <div
        className="fixed top-0 w-full bg-black h-10 z-50 text-white overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`flex justify-center items-center w-full h-full gap-x-2 ${
            isHovered ? "animate-none" : "animate-marquee"
          }`}
        >
          <Flame className="text-yellow-500" />
          <p className="whitespace-nowrap">
            FLAT 10% OFF on orders above ₹4,999 | Code: MOTHERSDAY
          </p>
          <Flame className="text-yellow-500" />
        </div>
      </div>
    </>
  );
};

export default Banner;
