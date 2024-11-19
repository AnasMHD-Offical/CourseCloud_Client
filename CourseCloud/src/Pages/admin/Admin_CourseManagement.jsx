"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const courses = [
  {
    id: 1,
    title: "Complete Full stack development course 2024",
    instructor: "Andrew Kim",
    rating: 4.7,
    students: 21,
    duration: "240+ hours",
    price: 8599,
    image:
      "https://res.cloudinary.com/dtc1xcil8/image/upload/v1730953909/kpsd38m8mtl6nxtmujlr.jpg",
  },
  {
    id: 1,
    title: "Complete Full stack development course 2024",
    instructor: "Andrew Kim",
    rating: 4.7,
    students: 21,
    duration: "240+ hours",
    price: 8599,
    image:
      "https://res.cloudinary.com/dtc1xcil8/image/upload/v1730953909/kpsd38m8mtl6nxtmujlr.jpg",
  },
  {
    id: 1,
    title: "Complete Full stack development course 2024",
    instructor: "Andrew Kim",
    rating: 4.7,
    students: 21,
    duration: "240+ hours",
    price: 8599,
    image:
      "https://res.cloudinary.com/dtc1xcil8/image/upload/v1730953909/kpsd38m8mtl6nxtmujlr.jpg",
  },
];

export default function Admin_Course_Management() {
  return (
    <div className="p-2 pt-1 min-h-screen">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link href="/admin" className="text-gray-500">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
          </li>
          <li className="flex items-center text-gray-700">Course Management</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold mb-6">Course Management</h1>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="relative group">
          <Input
            onChange={""}
            className="pl-10 pr-4 py-2 w-full rounded-full bg-slate-50 border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all duration-300"
            placeholder="Search for courses"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors duration-300 w-4 h-4" />
        </div>
        <div className="flex space-x-4 w-full md:w-auto">
          <Select>
            <SelectTrigger className="w-full md:w-[180px] border rounded-full shadow-md bg-slate-50">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-[180px] border rounded-full shadow-md bg-slate-50">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-60 md:w-36 md:h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-500">By {course.instructor}</p>
              <div className="flex items-center mt-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm">{course.rating}</span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-sm text-gray-500">
                  {course.students} students • {course.duration} • 2024
                  Bestselling
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className="font-bold">Rs.{course.price}</span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button size="sm">Block</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination
      <div className="flex justify-center mt-8">
        <nav className="inline-flex rounded-md shadow">
          <Button variant="outline" size="icon">
            1
          </Button>
          <Button variant="outline" size="icon">
            2
          </Button>
          <Button variant="outline" size="icon">
            3
          </Button>
          <Button variant="outline" size="icon">
            4
          </Button>
          <Button variant="outline" size="icon">
            5
          </Button>
        </nav>
      </div> */}
    </div>
  );
}
