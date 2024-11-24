import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { Button } from "../../components/ui/button";
import { LoaderCircle } from "lucide-react";
import { apiClient, handleApiError } from "../../services/axios.service";
import { toastService } from "../../services/toast.service";
import { useNavigate } from "react-router-dom";

function OtpLogin() {
  const [otp, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleOtpVerification() {
    const phoneNumber = localStorage.getItem("mobile");
    setLoading(true);

    if (!phoneNumber || !otp) {
      console.error("Missing phoneNumber or otp");
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post("/twilio/verify", {
        phoneNumber,
        otp,
      });

      if (response) {
        toastService.showToast("OTP Verified Successfully", "success");
        navigate("/");
      }
    } catch (error) {
      handleApiError(error);
      console.error("Verification failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="login-component flex justify-center items-center">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white shadow-lg rounded-lg p-6 my-4">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <div className="space-y-2">
            <div className="flex justify-center space-y-3">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setValue(value)}
                className="flex space-x-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    className="w-12 h-12 border border-gray-700 text-center text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                  <InputOTPSlot
                    index={1}
                    className="w-12 h-12 border border-gray-700 text-center text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                  <InputOTPSlot
                    index={2}
                    className="w-12 h-12 border border-gray-700 text-center text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                  <InputOTPSlot
                    index={3}
                    className="w-12 h-12 border border-gray-700 text-center text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                  <InputOTPSlot
                    index={4}
                    className="w-12 h-12 border border-gray-700 text-center text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                  <InputOTPSlot
                    index={5}
                    className="w-12 h-12 border border-gray-700 text-center text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="text-center text-sm">
              {otp === "" ? (
                <>Enter your one-time password.</>
              ) : (
                <>You entered: {otp}</>
              )}
            </div>

            <Button
              className="w-full bg-green-600"
              onClick={handleOtpVerification}
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Verify"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtpLogin;
