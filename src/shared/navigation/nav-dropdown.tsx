import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useGlobal } from "../../hooks/use-global";
import {
  CircleUserRound,
  Heart,
  ShoppingBasket,
  ShoppingCart,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavDropdown: React.FC = () => {
  const { itemLength } = useGlobal();
  const navigate = useNavigate();

  return (
    <div className="nav-items flex z-50 lg:hidden space-x-3">
      <div
        className="relative cursor-pointer flex-1 md:flex flex-col items-center justify-center space-y-1"
        onClick={() => navigate("/cart")}
      >
        <ShoppingCart size={18} />
        <div className="text-white w-4 h-4 text-[0.6rem] bg-red-500 font-bold absolute rounded-full -top-3 right-0 flex justify-center items-center">
          {itemLength}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">
            <CircleUserRound size={18} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-3">
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => navigate("/profile")}
          >
            <User className="mr-2 h-4 w-4" />
            <span>My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => navigate("/orders")}
          >
            <ShoppingBasket className="mr-2 h-4 w-4" />
            <span>My Orders</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => navigate("/wishlist")}
          >
            <Heart className="mr-2 h-4 w-4" />
            <span>My Wishlist</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavDropdown;
