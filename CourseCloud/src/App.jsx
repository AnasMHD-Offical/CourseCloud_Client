import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BreadcrumbDemo } from "./Pages/sample";
import Student_Login from "./Pages/student/student_login";
import Student_Register from "./Pages/student/student_register";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Student_Login/>} />
          <Route path="/register" element={<Student_Register/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
