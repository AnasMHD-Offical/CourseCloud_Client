import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BreadcrumbDemo } from "./Pages/sample";
import {Toaster} from "sonner"
import Student_Login from "./Pages/student/student_login";
import Student_Register from "./Pages/student/student_register";
import Instructor_Register from "./Pages/instructor/Instructor_Register";
import Instructor_Login from "./Pages/instructor/Instructor_Login";
import Otp from "./Components/build/otp";
import { OTP_Modal } from "./Components/build/OTP_Modal";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Student_Login/>} />
          <Route path="register" element={<Student_Register/>} />
          <Route path="verify_otp" element={<OTP_Modal isOpen={true} email={"anasachu006@gmail.com"}/>}/>
        </Routes>
        <Routes>
          <Route path="/instructor" element={<Instructor_Login />}/>
          <Route path="/instructor/register" element={<Instructor_Register />}/>
        </Routes>
      </Router>
      {/* Toaster component */}
      <Toaster richColors position="top-center"/>
    </>
  );
}

export default App;
