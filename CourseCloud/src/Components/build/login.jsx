//Importing essestial components and modules
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axios_instance } from "../../Config/axios_instance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleLogin } from "@react-oauth/google";
import * as yup from "yup";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Axis3DIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Formik, Form, Field } from "formik";
import { toast } from "sonner";

//validation schema for login form
const form_validation = yup.object({
  email: yup
    .string()
    .email("Invalid Email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "password must be atleast 6 characters")
    .matches(/[A-Z]/, "Password must contain atleast one capital letter")
    .matches(/[\d]/, "Password must contain atleast one digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain atleast one special character"
    )
    .required("Password is required"),
});

// Login component
function Login({ current_role }) {
  //managing the role that was to change the submit route according to the role
  const [role, setRole] = useState("");
  //manageing the api routes to sent the data based on the role
  const [login_api, setLogin_api] = useState("");
  //state for manage the register route
  const [register_route, setResgister_route] = useState("");
  //Declaring the state for show and hide password in password input.
  const [showPassword, setShowPassword] = useState(false);

  //useEffect hooks for handle role based login
  useEffect(() => {
    setRole(current_role);
    //Setting the routes for specific roles
    if (role === "student") {
      setLogin_api("/api/student_login");
      setResgister_route("/register");
    } else if (role === "instructor") {
      setLogin_api("/api/instructor/instructor_login");
      setResgister_route("/instructor/register");
    } else if (role === "admin") {
      setLogin_api("/api/admin/admin_login");
    } else {
      setLogin_api("");
    }
  }, [role]);

  console.log(login_api);

  //Decalring functions for handle form submit
  const handle_Submit = async (values) => {
    try {
      //sending data to server in route :  /api/student_login
      const response = await axios_instance.post(login_api, values);
      //detructuring the success(bool),message(string) from the response
      const { success, message } = response?.data;
      //short circuting the success(bool) to show toaster
      success && toast.success(message);
    } catch (error) {
      //throw a toast error based on the error type
      const { message } = error?.response?.data;
      console.log(error);
      toast.error(message);
    }
  };

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
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={form_validation}
            onSubmit={handle_Submit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7">
                {/* email input */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm sm:text-base md:text-lg font-medium block"
                  >
                    Email
                  </label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    placeholder="your email"
                    type="email"
                    autoComplete="email"
                    className="h-10 sm:h-11 md:h-12 text-sm sm:text-base"
                  />
                  {/* Showing the validation error message for email */}
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
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
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      placeholder="your password"
                      autoComplete="current-password"
                      //Checking the state if show and hide password is required
                      type={showPassword ? "text" : "password"}
                      className="h-10 sm:h-11 md:h-12 text-sm sm:text-base pr-10"
                    />
                    <button
                      type="button"
                      // setting the state for show and hide password
                      onClick={() => setShowPassword(!showPassword)}
                      className={
                        errors.password
                          ? "absolute right-3 top-8 trForm -translate-y-6"
                          : "absolute right-3 top-1/2 trForm -translate-y-1/2"
                      }
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
                      ) : (
                        <EyeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
                      )}
                    </button>
                    {/* Showing the validation error message for password */}
                    {errors.password && touched.password && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </div>
                    )}
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
                  disabled={isSubmitting}
                  className="w-full bg-black text-white hover:bg-gray-800 h-10 sm:h-11 md:h-12 text-sm sm:text-base"
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6">
          {/* Option provided , when a user didn't have an account . He can navigate to the register page */}
          <p className="text-sm sm:text-base text-center">
            Don't have an account?{" "}
            <Link
              to={register_route}
              className="text-neutral-900 font-bold hover:underline"
            >
              Register
            </Link>
          </p>
          <div className="text-center text-sm sm:text-base">or</div>
          {/* Option to register and login with google */}
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

//Exporting the Login component
export default Login;
