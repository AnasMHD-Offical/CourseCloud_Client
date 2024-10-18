import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BreadcrumbDemo } from "./Pages/sample";
import { Toaster } from "sonner";
import Student_Login from "./Pages/student/student_login";
import Student_Register from "./Pages/student/student_register";
import Instructor_Register from "./Pages/instructor/Instructor_Register";
import Instructor_Login from "./Pages/instructor/Instructor_Login";
import { OTP_Modal } from "./Components/build/OTP_Modal";
import Admin_Login from "./Pages/admin/Admin_Login";
import Student_Forgot_password from "./Pages/student/Student_Forgot_password";
import Student_Password_Reset from "./Pages/student/Student_Password_Reset";
import Instructor_Forgot_Password from "./Pages/instructor/Instructor_Forgot_Password";
import Instructor_Password_Reset from "./Pages/instructor/Instructor_Password_Reset";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Student_Login />} />
          <Route path="register" element={<Student_Register />} />
          <Route path="forgot_password" element={<Student_Forgot_password />} />
          <Route path="password_reset" element={<Student_Password_Reset />} />
        </Routes>
        <Routes>
          <Route path="/instructor" element={<Instructor_Login />} />
          <Route
            path="/instructor/register"
            element={<Instructor_Register />}
          />
          <Route
            path="/instructor/forgot_password"
            element={<Instructor_Forgot_Password />}
          />
          <Route
            path="/instructor/password_reset"
            element={<Instructor_Password_Reset />}
          />
        </Routes>
        <Routes>
          <Route path="/admin" element={<Admin_Login />} />
          <Route />
        </Routes>
      </Router>
      {/* Toaster component */}
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
