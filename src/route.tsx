import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import SignUp from "./pages/register/sign-up";
import NewComers from "./pages/new-comers/new-comers";
import Cart from "./pages/cart/cart";
import { CartContextProvider } from "./context/cart/cart";
import Orders from "./pages/orders/orders";
import { UserOrderProvider } from "./context/orders/orders";
import { UserProvider } from "./context/user/user";
import Profile from "./pages/profile/user-profle";
import Wishlist from "./pages/wishlist/wishlist";
import { WishlistProvider } from "./context/wishlist/wishlist";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/private-route";
import { useEffect } from "react";

const AppRoutes: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Toaster />
      <div className="mt-[7.5rem] md:mt-[10rem]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/newcomers" element={<NewComers />} />
          <Route element={<PrivateRoute />}>
            <Route
              path="/cart"
              element={
                <CartContextProvider>
                  <Cart />
                </CartContextProvider>
              }
            />
            <Route
              path="/orders"
              element={
                <UserOrderProvider>
                  <Orders />
                </UserOrderProvider>
              }
            />
            <Route
              path="/profile"
              element={
                <UserProvider>
                  <Profile />
                </UserProvider>
              }
            />
            <Route
              path="/wishlist"
              element={
                <WishlistProvider>
                  <Wishlist />
                </WishlistProvider>
              }
            />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;
