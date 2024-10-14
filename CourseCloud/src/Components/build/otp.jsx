import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardDescription,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";

export default function Otp() {
  const [otp, setOtp] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-[90%] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[650px] py-4">
        <CardHeader className="space-y-2 sm:space-y-3 md:space-y-4">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-3 sm:mt-5">
            OTP Verification
          </CardTitle>
          <CardDescription className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-center text-neutral-900">
            Please check your email
          </CardDescription>
          <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-center text-neutral-900">
            We've sent a code to{" "}
            <span className="font-bold">helloworld@gmail.com</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center ">
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                className="gap-2 sm:gap-2 md:gap-4"
              >
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="rounded-lg w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-xl font-bold border-neutral-300 border"
                  />
                ))}
              </InputOTP>
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-full sm:w-3/4 bg-black text-white hover:bg-gray-800 h-10 sm:h-11 md:h-12 text-sm sm:text-base"
              >
                Verify
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs sm:text-sm md:text-base text-center">
            Resend the code{" "}
            <a href="#" className="text-neutral-900 font-bold">
              00:20
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}