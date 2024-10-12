//Importing essestial components and modules 
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "react-router-dom";

// Login component
function Login() {
  //Declaring the state for show and hide password in password input.
  const [showPassword, setShowPassword] = useState(false);

  //Decalring functions for handle input change
  const handle_Change = () => {};

  //Decalring functions for handle form submit
  const handle_Submit = () => {};

  //Login Component
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
      <Card className="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px]">
        {/* Login heading */}
        <CardHeader className="space-y-2 sm:space-y-3 md:space-y-4">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7">
          {/* Form starts here */}
          <form
            action=""
            className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7"
          >
            {/* email input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm sm:text-base md:text-lg font-medium block"
              >
                Email
              </label>
              <Input
                id="email"
                placeholder="your email"
                type="email"
                className="h-10 sm:h-11 md:h-12 text-sm sm:text-base"
              />
            </div>
            {/* Password inputs */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm sm:text-base md:text-lg font-medium block"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="your password"
                  //Checking the state if show and hide password is required
                  type={showPassword ? "text" : "password"}
                  className="h-10 sm:h-11 md:h-12 text-sm sm:text-base pr-10"
                />
                <button
                  type="button"
                  // setting the state for show and hide password
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            {/* Navigate to forgot password if the user forgot the password */}
            <Link
              href="#"
              className="text-sm sm:text-base text-gray-600 hover:underline block"
            >
              forgot password?
            </Link>
            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 h-10 sm:h-11 md:h-12 text-sm sm:text-base"
            >
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6">
          {/* Option provided , when a user didn't have an account . He can navigate to the register page */}
          <p className="text-sm sm:text-base text-center">
            Don't have an account?{" "}
            <a href="#" className="text-neutral-900 font-bold hover:underline">
              Register
            </a>
          </p>
          <div className="text-center text-sm sm:text-base">or</div>
          {/* Option to register and login with google */}
          <Button
            variant="outline"
            className="w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google logo"
              className="mr-2 h-5 w-5 sm:h-6 sm:w-6"
            />
            Sign in with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

//Exporting the Login component
export default Login;
