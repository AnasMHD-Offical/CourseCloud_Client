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
import Admin_Forgot_Password from "./Pages/admin/Admin_Forgot_Password";
import Admin_Password_Reset from "./Pages/admin/Admin_Password_Reset";
import Admin_Category from "./Pages/admin/Admin_Category";
import User_Manangement from "./Components/build/User_Management";
import Admin from "./Components/main/Admin_Component";
import StudentManagement from "./Components/build/User_Management";
import Category from "./Components/build/Category";
import User_Management from "./Components/build/User_Management";

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
          <Route
            path="/admin/forgot_password"
            element={<Admin_Forgot_Password />}
          />
          <Route
            path="/admin/password_reset"
            element={<Admin_Password_Reset />}
          />
        </Routes>
        <Routes>
          <Route path="/admin" element={<Admin />}>
            <Route
              path="student_management"
              element={<User_Manangement keys={0} current_role={"Student"} />}
            />
            <Route
              path="instructor_management"
              element={<User_Management keys={1} current_role={"Instructor"} />}
            />
            <Route path="category_management" element={<Category />} />
          </Route>
        </Routes>
      </Router>
      {/* Toaster component */}
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
