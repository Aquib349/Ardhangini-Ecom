import { Button } from "../../components/ui/button";
import { useAuth } from "../../hooks/use-auth";
import { useGlobal } from "../../hooks/use-global";
import { handleApiError } from "../../services/axios.service";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { fetchCartData } = useGlobal();

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
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              autoComplete="username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
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
            <p className="text-center text-sm mt-4">
              Not an existing user?{" "}
              <Link
                to="/sign-up"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
