//Exporting essential modules and components
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "react-router-dom";

//Declaring react component for register
function Register() {
  //Declaring states for show password and hide password functionality in password input
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //Decalring functions for handle input change
  const handle_Change = () => {};
  //Decalring functions for handle form submit
  const handle_Submit = () => {};

  //Component 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
        {/* Heading for register */}
        <h1 className="text-3xl font-bold text-center">Register</h1>
        {/* Form starts here */}
        <form className="space-y-6">
          {/* Name input */}
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" placeholder="your name" />
          </div>
          {/* Mobile input */}
          <div>
            <Label htmlFor="mobile">Mobile no.</Label>
            <Input id="mobile" placeholder="your mobile no." type="tel" />
          </div>
          {/* Email input */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="your email" type="email" />
          </div>
          {/* DOB input */}
          <div>
            <Label htmlFor="dob">Date of birth</Label>
            <Input id="dob" placeholder="your date-of-birth" type="date" />
          </div>
          {/* Password input */}
          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="your password"
              // checking the state if show and hide password is required
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-gray-400"
              // setting the state for show and hide password
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
          {/* confirm password input */}
          <div className="relative">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              placeholder="your password"
              //checking the state if show and hide password is required
              type={showConfirmPassword ? "text" : "password"}
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-gray-400"
              // setting the state for show and hide password
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOffIcon size={20} />
              ) : (
                <EyeIcon size={20} />
              )}
            </button>
          </div>
          <Button className="w-full" type="submit">
            Register
          </Button>
        </form>
        {/* Option to get back to Login if the user have an existing account */}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to={""} className="font-bold text-neutral-900 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
// Exporting the Register component
export default Register;
