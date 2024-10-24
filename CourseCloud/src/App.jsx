import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { BreadcrumbDemo } from "./Pages/sample";
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
import Admin from "./Components/main/Admin_Component";
import Category from "./Components/build/Category";
import Admin_Student_Management from "./Pages/admin/Admin_Student_Management";
import Admin_Instructor_Managment from "./Pages/admin/Admin_Instructor_Managment";
import Admin_Login_Auth from "./Auth/Admin_Login_Auth";
import Admin_Auth from "./Auth/Admin_Auth";
import Admin_Profile from "./Pages/admin/Admin_Profile";
import Admin_Dashboard from "./Pages/admin/Admin_Dashboard";
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
          <Route
            path="/admin/login"
            element={
              <Admin_Login_Auth>
                <Admin_Login />
              </Admin_Login_Auth>
            }
          />
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
          <Route
            path="/admin"
            element={
              <Admin_Auth>
                <Admin />
              </Admin_Auth>
            }
          >
            <Route path="dashboard" element={<Admin_Dashboard/>}/>
            <Route
              path="student_management"
              element={
                <Admin_Student_Management
                  keys={0}
                  current_role={"Student"}
                  route={"/api/admin/get_all_student"}
                />
              }
            />
            <Route
              path="instructor_management"
              element={
                <Admin_Instructor_Managment
                  keys={1}
                  current_role={"Instructor"}
                  route={"/api/admin/get_all_instructor"}
                />
              }
            />
            <Route path="category_management" element={<Category />} />
            <Route path="profile" element={<Admin_Profile/>} />
          </Route>
        </Routes>
      </Router>
      {/* Toaster component */}
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
