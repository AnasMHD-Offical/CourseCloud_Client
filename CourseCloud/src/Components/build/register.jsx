//Exporting essential modules and components
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik, Field, Form } from "formik";
import { axios_instance } from "@/Config/axios_instance";
import { OTP_Modal } from "./OTP_Modal";
import { toast } from "sonner";

//Declaring form validation schema
const form_validation = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Name should only contain alphabet or whitespace ")
    .required("Name is required"),
  mobile: yup
    .string()
    .min(10, "Mobile number must be 10 digits")
    .matches(/[0-9]/, "Mobile number must be in integer")
    .required("Mobile number is required"),
  email: yup
    .string()
    .email("Invalid Email address")
    .required("Email is required"),
  dob: yup.date().required("Date of birth is required"),
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must be same")
    .required("Confirm password is required"),
});
//Declaring react component for register
function Register({ current_role }) {
  //State for manage role of admin,student,instructor
  const [role, setRole] = useState("");
  //state to manage server request api based on roles
  const [register_api, setRegister_api] = useState("");
  //State to manage the login navigate route based on the role
  const [login_route, setLogin_route] = useState("");
  //state to manage the otp sending based on role
  const [send_otp_route, setSend_otp_route] = useState("");
  //state to manage otp validation based on role
  const [validate_otp_route, setValidate_otp_route] = useState("");
  //state for managing form_data
  const [form_data, setForm_data] = useState(null);
  //state for manange otp_modal_open
  const [is_modal_open, setIs_modal_open] = useState(false);
  //Declaring states for show password and hide password functionality in password input
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //Declaring navigate
  const navigate = useNavigate();
  //use effect hook to handle some role based functionalities
  useEffect(() => {
    setRole(current_role);
    if (role === "student") {
      //setting student_register route api based on student
      setRegister_api("/api/student_register");
      //setting login route api based on student
      setLogin_route("/");
      //setting otp_send route api based on student
      setSend_otp_route("/api/send_otp");
      //setting validate_otp route api based on student
      setValidate_otp_route("/api/validate_otp");
    } else if (role === "instructor") {
      //setting instructor_register route api based on instructor role
      setRegister_api("/api/instructor/instructor_register");
      //setting login route api based on instructor role
      setLogin_route("/instructor");
      //setting send_otp route api based on instructor role
      setSend_otp_route("/api/instructor/send_otp");
      //setting validate_otp route api based on instructor role
      setValidate_otp_route("/api/instructor/validate_otp");
    } else {
      setRegister_api("");
    }
  }, [role]);

  //Decalring functions for handle form submit
  const handle_Submit = async (values) => {
    //setting form data with formik values
    setForm_data(values);

    //destructuring email and name from form_data

    try {
      //send a request to the sent_otp server api .
      const response = await axios_instance.post(send_otp_route, {
        email: values.email,
        name: values.name,
        For: "registration",
      });
      console.log(response);
      
      const { message, success } = response?.data;
      //checking the response resolved or not and proceed the otp_modal open
      if (success) {
        toast.success(message);
        setIs_modal_open(true);
      }
    } catch (error) {
      //throw toast error corresponding to the error type
      const { message } = error?.response?.data;
      toast.error(message);
      console.log(error);
    }
  };
  //Decalring function to validate otp
  const handle_validate_otp = async (otp) => {
    try {
      //destructuring email from form data
      const { email } = form_data;
      //sending a request to validate the entered otp from otp_modal to server route /api/validate_otp
      const response = await axios_instance.post(validate_otp_route, {
        email: email,
        otp: otp,
        For: "registration",
      });
      //destructuring success(bool) and message(string)
      const { message, success } = response?.data;
      console.log(response);
      //checking if the otp is valid and if it valid call the handle_form_submit for furthur student register procedures
      if (success) {
        toast.success(message);
        handle_form_submit();
      }
    } catch (error) {
      //throw an toaster error based on the error type.
      const { message } = error?.response?.data;
      toast.error(message);
    }
  };
  //function to handle the resend otp logic
  const handle_resend_otp = async () => {
    //dectructuring email and name from form data
    const { email, name } = form_data;
    try {
      //sending request a to server to resent otp to the given email
      const response = await axios_instance.post(send_otp_route, {
        email: email,
        name: name,
        For: "registration",
      });
      const { message, success } = response?.data;
      //checking the response and if it resolved then toast a success and open the otp entring modal
      if (success) {
        toast.success(message);
        setIs_modal_open(true);
      }
    } catch (error) {
      //throwing error based on the errror type
      const { message } = error?.response?.data;
      if (error.status === 409) {
        toast.error(message);
      } else if (error.status === 500) {
        toast.error(message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  //After verifing the otp sent a request including students data to register.
  const handle_form_submit = async () => {
    try {
      //client request to student_register route after otp_validation
      const response = await axios_instance.post(register_api, form_data);
      const { success, message } = response?.data;
      //checking if the response is resolved then close the OTP modal and toast a success message
      if (success) {
        toast.success(message);
        setIs_modal_open(false);
        navigate("/");
      }
    } catch (error) {
      //throw error based on the rejection and toast an error message.
      const { message } = error?.response?.data;
      toast.error(message);
      console.log(error);
    }
  };

  //Component register
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
        {/* Heading for register */}
        <h1 className="text-3xl font-bold text-center">Register</h1>
        {/* Form starts here */}
        <Formik
          initialValues={{
            name: "",
            mobile: "",
            email: "",
            dob: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={form_validation}
          onSubmit={handle_Submit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-6">
              {/* Name input */}
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Field
                  as={Input}
                  id="fullName"
                  name="name"
                  placeholder="your name"
                />
                {/* validation error throwing */}
                {errors.name && touched.name && (
                  <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                )}
              </div>
              {/* Mobile input */}
              <div>
                <Label htmlFor="mobile">Mobile no.</Label>
                <Field
                  as={Input}
                  id="mobile"
                  placeholder="your mobile no."
                  name="mobile"
                  type="text"
                  maxLength="10"
                />
                {/* validation error throwing */}
                {errors.mobile && touched.mobile && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.mobile}
                  </div>
                )}
              </div>
              {/* Email input */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Field
                  as={Input}
                  id="email"
                  placeholder="your email"
                  type="email"
                  name="email"
                />
                {/* validation error throwing */}
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              {/* DOB input */}
              <div>
                <Label htmlFor="dob">Date of birth</Label>
                <Field
                  as={Input}
                  id="dob"
                  placeholder="your date-of-birth"
                  type="date"
                  name="dob"
                />
                {/* validation error throwing */}
                {errors.dob && touched.dob && (
                  <div className="text-red-500 text-sm mt-1">{errors.dob}</div>
                )}
              </div>
              {/* Password input */}
              <div className="relative">
                <Label htmlFor="password">Password</Label>
                <Field
                  as={Input}
                  id="password"
                  placeholder="your password"
                  name="password"
                  // checking the state if show and hide password is required
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-gray-400"
                  // setting the state for show and hide password
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </button>
                {/* validation error throwing */}
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                )}
              </div>
              {/* confirm password input */}
              <div className="relative">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Field
                  as={Input}
                  id="confirmPassword"
                  placeholder="your password"
                  name="confirmPassword"
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
                {/* validation error throwing */}
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                Register
              </Button>
            </Form>
          )}
        </Formik>
        <OTP_Modal
          // props passing to the OTP_Modal component
          isOpen={is_modal_open}
          onClose={() => setIs_modal_open(false)}
          email={form_data ? form_data.email : "email"}
          verify_otp={handle_validate_otp}
          resend_otp={handle_resend_otp}
        />
        {/* Option to get back to Login if the user have an existing account */}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link
            to={login_route}
            className="font-bold text-neutral-900 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
// Exporting the Register component
export default Register;
