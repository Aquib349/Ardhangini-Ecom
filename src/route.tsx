import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import SignUp from "./pages/register/sign-up";
import NewComers from "./pages/new-comers/new-comers";
import PrivateRoute from "./components/private-route";
import { CartContextProvider } from "./context/cart/cart";
import Cart from "./pages/cart/cart";
import { UserOrderProvider } from "./context/orders/orders";
import Orders from "./pages/orders/orders";
import { UserProvider } from "./context/user/user";
import Profile from "./pages/profile/user-profle";
import { WishlistProvider } from "./context/wishlist/wishlist";
import Wishlist from "./pages/wishlist/wishlist";
import Shippable from "./pages/ready to ship/shippable";
import ArdhanginiExclusive from "./pages/ardhangini exclusive/ardhangini-exclusive";
import SareeQuest from "./pages/saree quest/saree-quest";
import OtpLogin from "./pages/login/otp-login";
import ResetPassword from "./pages/login/reset-password";
import Collection from "./pages/collections/collection";

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
          <Route path="/otp-login" element={<OtpLogin />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/newcomers" element={<NewComers />} />
          <Route path="/shippable" element={<Shippable />} />
          <Route path="/saree-quest" element={<SareeQuest />} />
          <Route path="/collections" element={<Collection />} />
          <Route
            path="/ardhangini-exclusive"
            element={<ArdhanginiExclusive />}
          />
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
