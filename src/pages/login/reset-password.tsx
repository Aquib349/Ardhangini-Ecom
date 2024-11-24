import { useState } from "react";
import { Button } from "../../components/ui/button";
import { MailSearch, FileLock2, EyeOff, Eye, LoaderCircle } from "lucide-react";
import { Input } from "../../components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { apiClient, handleApiError } from "../../services/axios.service";
import { toastService } from "../../services/toast.service";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isProgressComplete, setIsProgressComplete] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // function to verify the email exists or not ?
  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const response = await apiClient.post(
        "/user-auth/request-password-reset",
        { email }
      );
      toastService.showToast(`${response.data.message}`, "success", {
        position: "top-center",
      });
    } catch (error) {
      toastService.showToast("Email doesn't exists", "error", {
        position: "top-center",
      });
      handleApiError(error);
      console.log(error);
    } finally {
      const timer = setTimeout(() => {
        setIsVerifying(false);
        setIsProgressComplete(true);
        toastService.dismissToast();
      }, 2000);
      return () => clearTimeout(timer);
    }
  };

  // Function to reset the password if the user email exists
  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault(); // Ensure default form behavior is prevented
    const payload = {
      email: userEmail,
      otp,
      newPassword: password,
    };

    try {
      const response = await apiClient.post(
        "/user-auth/reset-password",
        payload
      ); // Send `payload` directly
      if (response) {
        toastService.showToast(`${response.data.message}`, "success", {
          position: "top-center",
        });
        navigate("/login");
      }
    } catch (error) {
      handleApiError(error);
      toastService.showToast("Something went wrong", "error", {
        position: "top-center",
      });
    } finally {
      // Dismiss the toast after a delay
      const timer = setTimeout(() => {
        toastService.dismissToast();
      }, 2000);
      return () => clearTimeout(timer); // Clear timeout to avoid potential memory leaks
    }
  };

  return (
    <div className="login-component flex justify-center items-center">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white shadow-lg rounded-lg p-6 my-4">
        {/* Progress Bar */}
        <div className="flex items-center mb-6">
          {/* MailSearch Icon */}
          <div
            className={`p-2 rounded-full flex items-center justify-center ${
              isProgressComplete ? "bg-blue-500 text-white" : "bg-slate-200"
            }`}
          >
            <MailSearch size={18} />
          </div>
          {/* Progress Bar Animation */}
          <div className="relative h-1 flex-1 bg-slate-200 mx-4 overflow-hidden rounded">
            <div
              className={`absolute left-0 top-0 h-full bg-blue-500 transition-all duration-[5000ms] ${
                isProgressComplete ? "w-full" : "w-0"
              }`}
            ></div>
          </div>
          {/* FileLock2 Icon */}
          <div
            className={`p-2 rounded-full flex items-center justify-center border ${
              isProgressComplete ? "bg-blue-500 text-white" : "border-slate-500"
            }`}
          >
            <FileLock2 size={18} />
          </div>
        </div>

        {/* Email Verification Form */}
        {!isProgressComplete && (
          <div className="space-y-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Enter Your Registered Email
              </label>
              <Input
                type="email"
                value={email}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              className="bg-blue-600 hover:bg-blue-700 w-full text-white"
              onClick={handleVerify}
              disabled={isVerifying}
            >
              {isVerifying ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Verify"
              )}
            </Button>
          </div>
        )}

        {/* reset password form */}
        {isProgressComplete && (
          <form className="space-y-4" onSubmit={resetPassword}>
            <Input
              type="email"
              value={userEmail}
              placeholder="Enter registered email"
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <div className="">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
                className="flex space-x-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    className="border border-gray-400 text-center text-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                  <InputOTPSlot
                    index={1}
                    className="border border-gray-400 text-center text-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                  <InputOTPSlot
                    index={2}
                    className="border border-gray-400 text-center text-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                  <InputOTPSlot
                    index={3}
                    className="border border-gray-400 text-center text-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                  <InputOTPSlot
                    index={4}
                    className="border border-gray-400 text-center text-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                  <InputOTPSlot
                    index={5}
                    className="border border-gray-400 text-center text-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                </InputOTPGroup>
              </InputOTP>
              <p className="text-xs">
                Please enter the one-time password sent to your email.
              </p>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
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
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 w-full"
            >
              Submit
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
