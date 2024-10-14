import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BreadcrumbDemo } from "./Pages/sample";
import Student_Login from "./Pages/student/student_login";
import Student_Register from "./Pages/student/student_register";
import Instructor_Register from "./Pages/instructor/Instructor_Register";
import Instructor_Login from "./Pages/instructor/Instructor_Login";
import Otp from "./Components/build/otp";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Student_Login />} />
          <Route path="register" element={<Student_Register />} />
          <Route path="verify_otp" element={<Otp/>}/>
        </Routes>
        <Routes>
          <Route path="/instructor" element={<Instructor_Login />}>
            <Route path="register" element={<Instructor_Register />}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
