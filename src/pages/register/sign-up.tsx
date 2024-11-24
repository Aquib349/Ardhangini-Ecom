import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useAuth } from "../../hooks/use-auth";
import { handleApiError } from "../../services/axios.service";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const SignUp: React.FC = () => {
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setLoading(true);
    setError("");

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await register(
        firstName,
        lastName,
        email,
        `+91${mobile}`,
        password,
        repeatPassword
      );
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Please try again.");
      handleApiError(err);
      console.error("Signup failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericInput = e.target.value;
    setMobile(numericInput);
  };

  return (
    <>
      <div className="signup-component flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white shadow-lg rounded-lg p-6 my-4">
          <h2 className="text-xl font-semibold text-center">Sign-Up</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-x-2">
              <Input
                type="text"
                placeholder="First Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
              <Input
                type="text"
                placeholder="Last Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter your phone number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleMobileChange}
                value={mobile}
              />
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </div>
            </div>
            <div className="relative">
              <Input
                type={showRepeatPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={repeatPassword}
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              >
                {showRepeatPassword ? <EyeOff /> : <Eye />}
              </div>
            </div>
            <Button
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleSignUp}
              disabled={loading}
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Sign Up"}
            </Button>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <p className="text-center text-xs">
              Existing user?{" "}
              <Link to="/login" className="font-medium text-red-500">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
