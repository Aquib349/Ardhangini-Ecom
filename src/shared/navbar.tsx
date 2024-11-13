import { useState } from "react";
import logo from "../assets/logo.png";
import { Input } from "../components/ui/input";
import {
  Headset,
  Heart,
  LogOut,
  Search,
  ShoppingBasket,
  ShoppingCart,
  User,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import NavDropdown from "./navigation/nav-dropdown";
import ProductNavigation from "./navigation/desktop-navigation";
import { useAuth } from "../hooks/use-auth";
import { useGlobal } from "../hooks/use-global";
import MobileNavigation from "./navigation/mobile-navigation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import Cookies from "js-cookie";

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}> = ({ icon, label, onClick }) => (
  <div
    className="flex-1 flex flex-col items-center justify-center cursor-pointer space-y-1"
    onClick={onClick}
  >
    {icon}
    <p className="text-xs font-bold">{label}</p>
  </div>
);

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const { itemLength } = useGlobal();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");
  const userId = localStorage.getItem("userId") || "";

  return (
    <>
      <div className="navbar-component">
        <div
          className={`main z-50 transition-colors duration-900 flex justify-between items-center fixed w-full top-10 px-4 h-20
            ${
              location.pathname === "/"
                ? "bg-gradient-to-r from-blue-400 via-[#fdf3cf] to-[#fdecd2]"
                : "bg-gradient-to-r from-blue-400 via-[#fdf3cf] to-[#fdecd2]"
            }`}
        >
          {/* mobile search toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <MobileNavigation />
            <Search
              size={18}
              className="cursor-pointer"
              onClick={() => {
                setShowSearchBar(!showSearchBar);
                window.scrollTo(0, 0); // Scroll the page to the top when search bar is opened
              }}
            />
          </div>

          {/* company logo */}
          <div className="logo flex items-center cursor-pointer">
            <img
              src={logo}
              alt="logo"
              className="w-[200px] md:w-[300px]"
              onClick={() => navigate("/")}
            />
          </div>

          {/* desktop search */}
          <div className="hidden md:flex items-center border border-red-300 px-3 w-1/3 bg-white/40 rounded-md gap-3 focus-within:bg-white/70">
            <Input
              type="search"
              className="border-0 rounded-none bg-transparent px-2 w-full"
              placeholder="What are you looking for?"
            />
            <Search />
          </div>

          {/* list of navigation */}
          <div className="items-center gap-6 hidden lg:flex">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <NavItem icon={<Headset size={18} />} label="Help" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Customer Support</AlertDialogTitle>
                  <AlertDialogDescription>
                    If you need assistance, please reach out to our customer
                    support team:
                    <br />
                    <br />
                    <strong className="text-md">Phone Support : </strong> (123)
                    456-7890
                    <br />
                    <strong className="text-md">Email Support : </strong>{" "}
                    support../..yourstore.com
                    <br />
                    <strong className="text-md">Live Chat : </strong> Available
                    24/7, click the chat icon in the bottom-right corner.
                    <br />
                    We’re here to help you with any inquiries or issues.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <NavItem
              icon={<User size={18} />}
              label="Account"
              onClick={() => navigate("/profile")}
            />
            <NavItem
              icon={<ShoppingBasket size={18} />}
              label="Orders"
              onClick={() => navigate("/orders")}
            />
            <NavItem
              icon={<Heart size={18} />}
              label="Wishlist"
              onClick={() => navigate("/wishlist")}
            />
            <div
              className="relative flex-1 flex flex-col items-center justify-center cursor-pointer space-y-1"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart size={18} />
              <p className="text-xs font-bold">Cart</p>
              <div className="text-white w-4 h-4 text-[0.6rem] bg-red-500 font-bold absolute rounded-full -top-3 right-0 flex justify-center items-center">
                {itemLength}
              </div>
            </div>
            <NavItem
              icon={<LogOut size={17} />}
              label={accessToken ? "Logout" : "Login"}
              onClick={() => {
                if (accessToken) {
                  logout(userId);
                } else {
                  navigate("/login");
                }
              }}
            />
          </div>

          {/* mobile screen navigation */}
          <NavDropdown
            handleLogout={logout}
            userId={userId}
          />
        </div>
      </div>

      {/* mobile search bar */}
      <div
        className={`flex md:hidden items-center border border-red-300 px-3 bg-white rounded-md gap-3 focus-within:bg-white/70
          transition-all duration-300 ease-in-out fixed top-[7.6rem] left-0 right-0 z-50
          ${
            showSearchBar
              ? "translate-y-0"
              : "-translate-y-full opacity-0 hidden"
          }`}
      >
        <Input
          type="search"
          className="border-0 rounded-none bg-transparent px-2 w-full"
          placeholder="What are you looking for?"
        />
        <Search className="cursor-pointer" />
      </div>

      <ProductNavigation />
    </>
  );
};

export default Navbar;
