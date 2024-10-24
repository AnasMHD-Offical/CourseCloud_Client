import React, { useState } from "react";
import {
  Search,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Admin_Auth from "@/Auth/Admin_Auth";
import { admin_logout } from "@/Redux/Slices/AdminSlice";
import { toast } from "sonner";
import { axios_instance } from "@/Config/axios_instance";

export default function Admin() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios_instance.post("/api/admin/admin_logout");
      const { success, message } = response?.data;
      if (success) {
        localStorage.removeItem("admin_data");
        dispatch(admin_logout());
        toast.success(message);
      }
    } catch (error) {
      const { message } = error?.response?.data;
      console.log(error);
      toast.error(message);
    }
  };

  const SidebarContent = () => (
    <nav className="bg-white">
      <ul className="space-y-2">
        {[
          { path: "dashboard", label: "Dashboard" },
          { path: "profile", label: "Profile" },
          { path: "student_management", label: "Student Management" },
          { path: "instructor_management", label: "Instructor Management" },
          { path: "course_management", label: "Course Management" },
          { path: "category_management", label: "Category Management" },
        ].map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              //   className={(isActive) => `
              //       ? "bg-neutral-950 text-white"
              //       : "text-gray-700 hover:bg-gray-200"
              //   }`}
              className={({ isActive }) =>
                isActive
                  ? `block px-4 py-2 rounded-md bg-neutral-950 text-white `
                  : "block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200"
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-md flex items-center justify-center"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" /> Logout
      </button>
    </nav>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border">
        <div className="max-w-7xl mx-auto xl:ms-1 px-4 sm:px-6 lg:px-8 xl:pe-0  py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[260px] sm:w-[300px]">
                <div className="py-4">
                  <SidebarContent />
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-2xl font-bold text-gray-900">CourseCloud</h1>
          </div>
          {/* <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="w-64 h-9 pl-5 pr-4 py-2 border border-neutral-950 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-neutral-800"
              />
              <button className="absolute right-0 top-0 h-9 w-9  border rounded-full bg-white border-neutral-800">
                <Search className="absolute left-2 top-2 h-5 w-5 text-neutral-600 " />
              </button>
            </div>
            <User className="h-6 w-6 text-gray-500" />
          </div> */}
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar - hidden on mobile, visible on larger screens */}
        <aside className="hidden md:block w-64 bg-white p-4 shadow-sm shadow-neutral-400 rounded-md my-2 mx-2">
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8">
          <Admin_Auth>
            <Outlet />
          </Admin_Auth>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">CourseCloud</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Teach in Company
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Ratings
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Career
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    More
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Term & Conditions</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Cookie settings
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>
              &copy; {new Date().getFullYear()} CourseCloud. All rights reserved
              by LMS company.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
