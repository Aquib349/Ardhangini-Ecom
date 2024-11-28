import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../hooks/use-auth";
import { useGlobal } from "../../hooks/use-global";
import { apiClient, handleApiError } from "../../services/axios.service";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toastService } from "../../services/toast.service";
import Cookies from "js-cookie";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { fetchCartData } = useGlobal();
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");

  // otp based twilio login
  const [mobile, setMobile] = useState("");
  async function OtpBasedLogin() {
    const phoneNumber = `+91${mobile}`;
    localStorage.setItem("mobile", phoneNumber);
    try {
      await apiClient.post("/twilio/send-otp", { phoneNumber });
      toastService.showToast("Otp Sent Successfully", "success", {
        position: "top-center",
      });
      const timer = setTimeout(() => {
        navigate("/otp-login");
      }, 2000);
      toastService.dismissToast();
      return () => clearTimeout(timer);
    } catch (error) {
      handleApiError(error);
      console.log(error);
    }
  }

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      setLoading(false);
      fetchCartData();
    } catch (error) {
      handleApiError(error);
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <>
      <div className="login-component flex justify-center items-center">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white shadow-lg rounded-lg p-6 my-4">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          {!accessToken && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                autoComplete="username"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                autoComplete="current-password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {loading ? <LoaderCircle className="animate-spin" /> : "Login"}
              </Button>
            </form>
          )}
          <Link
            to={"/reset-password"}
            className="flex justify-end text-sm py-2 text-red-500"
          >
            Forgot Password ?
          </Link>

          <div className="flex items-center gap-x-4 py-4 px-6">
            <div className="h-0.5 bg-slate-200 w-full"></div>
            <span className="text-slate-300 text-sm">OR</span>
            <div className="h-0.5 bg-slate-200 w-full"></div>
          </div>

          {/* twilio login using otp */}
          <div className="space-y-3">
            <Input
              placeholder="Enter your phone number"
              type="number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={OtpBasedLogin}
            >
              Send Otp
            </Button>
          </div>

          <p className="text-center text-sm mt-4">
            Not an existing user?{" "}
            <Link
              to="/sign-up"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
