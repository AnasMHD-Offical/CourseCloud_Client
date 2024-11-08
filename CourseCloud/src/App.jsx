import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";
import Student_Login from "./Pages/student/student_login";
import Student_Register from "./Pages/student/student_register";
import Instructor_Register from "./Pages/instructor/Instructor_Register";
import Instructor_Login from "./Pages/instructor/Instructor_Login";
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
import Instructor from "./Components/main/Instructor_Component";
import Instructor_Create_Course_1 from "./Pages/instructor/Instructor_Create_Course_1";
import Instructor_Profile from "./Pages/instructor/Instructor_Profile";
import Instructor_Create_Course_Plan from "./Pages/instructor/Instructor_Create_Course_Plan";
import Instructor_Create_Course_Curriculum from "./Pages/instructor/Instructor_Create_Course_Curriculum";
import Instructor_Create_Course_Preview from "./Pages/instructor/Instructor_Create_Course_Preview";
const LandingPage = lazy(() => import("./Pages/student/Student_Landing_Page"));
import Student_Login_Auth from "./Auth/Student_Login_Auth";
import Student_Auth from "./Auth/Student_Auth";
import LandingPageFallback from "./Components/fallback/LandingPageFallback";
import CartPage from "./Pages/student/Student_Cart";
import WishlistPage from "./Pages/student/Student_Wishlist";
import Student_Main from "./Pages/student/Student_Main";
import ProfilePage from "./Pages/student/Student_Profile";
const HomePage = lazy(() => import("./Pages/student/Student_Homepage"));
const CourseOverview = lazy(() =>
  import("./Pages/student/Student_Course_Overview")
);
const CategoryPage = lazy(() => import("./Pages/student/Student_CategoryPage"));
function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<LandingPageFallback />}>
          <Routes>
            <Route
              path="/"
              element={
                <Student_Auth>
                  <HomePage />
                </Student_Auth>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <Student_Login_Auth>
                  <Student_Login />
                </Student_Login_Auth>
              }
            />
            <Route path="overview/:id" element={<CourseOverview />} />
            <Route
              path="category/:id/:subcategory"
              element={<CategoryPage />}
            />
            <Route path="cart" element={<CartPage />} />
            <Route path="dashboard" element={<Student_Main/>}>
              <Route path="wishlist" element={<WishlistPage/>} />
              <Route path="profile" element={<ProfilePage/>} />
            </Route>
            <Route
              path="landing"
              element={
                <Student_Login_Auth>
                  <LandingPage />
                </Student_Login_Auth>
              }
            />
          </Routes>
        </Suspense>
        <Routes>
          <Route
            path="register"
            element={
              <Student_Auth>
                <Student_Register />
              </Student_Auth>
            }
          />
          {/* <Route
            path="overview"
            element={
              <Student_Login_Auth>
                <CourseOverview/>
              </Student_Login_Auth>
            }
          /> */}

          <Route path="forgot_password" element={<Student_Forgot_password />} />
          <Route path="password_reset" element={<Student_Password_Reset />} />
        </Routes>
        {/* Instructor Auth Routes */}
        <Routes>
          <Route path="/instructor/login" element={<Instructor_Login />} />
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
        {/* Instructor Routes */}
        <Routes>
          <Route path="/instructor" element={<Instructor />}>
            <Route path="profile" element={<Instructor_Profile />} />
            <Route
              path="create_course"
              element={<Instructor_Create_Course_1 />}
            >
              <Route index element={<Instructor_Create_Course_Plan />} />
              <Route
                path="2"
                element={<Instructor_Create_Course_Curriculum />}
              />
              <Route path="3" element={<Instructor_Create_Course_Preview />} />
            </Route>
          </Route>
        </Routes>
        {/* Admin Auth Routes */}
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
        {/* Admin Routes */}
        <Routes>
          <Route
            path="/admin"
            element={
              <Admin_Auth>
                <Admin />
              </Admin_Auth>
            }
          >
            <Route index element={<Admin_Dashboard />} />
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
            <Route path="profile" element={<Admin_Profile />} />
          </Route>
        </Routes>
      </Router>
      {/* Toaster component */}
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
