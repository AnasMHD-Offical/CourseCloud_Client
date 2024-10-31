import React, { useState } from "react";
import {
  Search,
  User,
  Plus,
  Upload,
  ArrowRight,
  Menu,
  CircleCheckBig,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CloudinaryUploadWidget_Videos from "@/Utils/CloudinaryVideoUpload";
import CloudinaryUploadWidget_Files from "@/Utils/CloudinaryFileUpload";
export default function Instructor_Create_Course_Curriculum() {
  const course_plan = useSelector(
    (state) => state?.course_plan?.Course_plan?.data
  );
  console.log(course_plan);
  const navigate = useNavigate();
  const [video_public_id, setVideo_public_id] = useState("");
  const [assignment_url, SetAssignment_url] = useState("");
  const [lessons, setLessons] = useState([
    {
      data: {
        title: "Lesson 1 : Introduction",
        description:
          "This video is a introduction of this whole course. Watch the full video. Let's kick off.",
      },
      video_url: " ",
      Assignment: " ",
    },
  ]);
  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    Assignment: "",
  });

  const addLesson = () => {
    console.log(video_public_id, "jiuuiyud");

    // setNewLesson({...newLesson,video_url:video_public_id})
    if (newLesson.title && newLesson.description) {
      setLessons([
        ...lessons,
        {
          data: newLesson,
          video_url: video_public_id,
          Assignment: assignment_url,
        },
      ]);
      setNewLesson({
        title: "",
        description: "",
        video_url: "",
        Assignment: "",
      });
    }
  };
  const setPublicId = (public_id) => {
    setVideo_public_id(public_id);
  };
  const setAssignmentFileUrl = (file_url) => {
    SetAssignment_url(file_url);
  };
  const handleNavigateCoursePreview = () => {
    console.log(video_public_id);
    navigate("/instructor/create_course/3")
  };
  console.log(lessons);

  return (
    // <div className="min-h-screen flex flex-col">
    // <div className="flex-1 flex">
    <div className="max-w-5xl mx-auto sm:mx-2">
      {/* Course navigation highlighter */}
      <div className="flex justify-between mb-8">
        <div className="text-center flex sm:flex flex-col sm:flex-row  items-center">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
            1
          </div>
          <span className="ml-2 font-semibold">Course plan</span>
        </div>
        <div className="flex text-center sm:flex flex-col sm:flex-row  items-center">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
            2
          </div>
          <span className="ml-2 font-semibold">Course curriculum</span>
        </div>
        <div className="flex text-center sm:flex flex-col sm:flex-row  items-center text-gray-400">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            3
          </div>
          <span className="ml-2">Course preview</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Course curriculum heading */}
        <div>
          <h3 className="text-xl font-semibold mb-1">Course Curriculum</h3>
          <p className="text-sm font-normal">
            {"Add course in the proper manner (First to last manner)"}
          </p>
        </div>
        {/* Lesson Adding */}
        <div className="space-y-4 sm:shadow-sm sm:border p-2 sm:p-4 rounded-lg">
          <div>
            <label htmlFor="course_title" className="text-lg font-medium">
              Enter lession no & title :{" "}
            </label>

            <Input
              id="course_title"
              placeholder="Enter lesson no. : Enter lesson title"
              className="h-11"
              value={newLesson.title}
              onChange={(e) =>
                setNewLesson({ ...newLesson, title: e.target.value })
              }
            />
            <p className="text-xs ms-1 mt-1 text-neutral-600">
              {
                "Follow the proper format that shown in the input eg: '<lesson_number> : <lesson_title>'"
              }
            </p>
          </div>
          <div>
            <label htmlFor="course_title" className="text-lg font-medium">
              Enter Lesson description :{" "}
            </label>
            <Textarea
              placeholder="Lesson description"
              value={newLesson.description}
              onChange={(e) =>
                setNewLesson({ ...newLesson, description: e.target.value })
              }
              rows={4}
            />
            <p className="text-xs ms-1 mt-1 text-neutral-600">
              {
                "Give a proper description about the lession. Student should understand, what are you trying to teach in this purticular lession"
              }
            </p>
          </div>
          <div className="flex flex-col gap-2 lg:flex-row justify-between">
            <div className="space-x-1 md:space-x-2">
              {/* Cloudinary upload widget component for tutorial uploads */}
              <CloudinaryUploadWidget_Videos setPublicId={setPublicId} />
              {/* Cloudinary upload widget component for Assignments file uploads */}
              <CloudinaryUploadWidget_Files
                setAssignmentFileUrl={setAssignmentFileUrl}
              />
            </div>
            <Button onClick={addLesson} className="bg-black text-white">
              Add Lesson
            </Button>
          </div>
        </div>
        {/* Added lession display */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold ms-1">Added Lessions</h3>
          {lessons.map((lesson, index) => (
            <div key={index} className="border rounded-md p-4 shadow ">
              <h4 className="font-semibold">{lesson.data.title}</h4>
              <p className="text-gray-600">{lesson.data.description}</p>
              <div className="flex gap-4 mt-2">
                {lesson.video_url && (
                  <button className="border p-2 rounded-lg flex gap-2 border-neutral-400">
                    <CircleCheckBig />
                    <p className="text-sm">Video tutorial uploaded</p>
                  </button>
                )}
                {lesson.Assignment && (
                  <button className="border p-2 rounded-lg flex gap-2 border-neutral-400">
                    <CircleCheckBig />
                    <p className="text-sm">Assignment uploaded</p>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Navigating to course preview component */}
      <div className="mt-8 flex justify-between">
        <Button
          className="bg-black text-white px-4"
          onClick={() => navigate("/instructor/create_course")}
        >
          <ArrowLeft className="ml-1 h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={handleNavigateCoursePreview}
          className="bg-black text-white px-8"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      {/* </div> */}
      {/* </div> */}

      {/* Footer */}
      {/* <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">CourseCloud</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Teach in Company</a></li>
                <li><a href="#" className="hover:underline">About us</a></li>
                <li><a href="#" className="hover:underline">Contact us</a></li>
                <li><a href="#" className="hover:underline">Ratings</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Career</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
                <li><a href="#" className="hover:underline">More</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Term & Conditions</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Cookie settings</a></li>
                <li><a href="#" className="hover:underline">Privacy policy</a></li>
                <li><a href="#" className="hover:underline">Sitemap</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>All copyright are reserved by LMS company</p>
            <p>lmscompany.com</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
