"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Heart,
  Home,
  PlayCircle,
  Search,
  Settings,
  Share2,
  ShoppingBag,
  Star,
  User,
  Volume2,
  Check,
  X,
  Goal,
  Dot,
  FileEdit,
  Brain,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Link, useParams } from "react-router-dom";
import Header from "@/Components/base/Header";
import Footer from "@/Components/base/Footer";
import CourseContainer from "@/Components/base/CourseContainer";
import CallForTutor from "@/Components/base/CallForTutor";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { axios_instance } from "@/Config/axios_instance";

export default function Purshased_Course_Overview() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [CourseLessons, setCourseLessons] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [targetAudience, setTargetAudience] = useState([]);
  const [courses, setCourses] = useState();
  const [activeLesson, setActiveLesson] = useState("1");
  const [selectedNav, setSelectedNav] = useState("");
  const [video_url, setVideo_url] = useState("");
  const [thumbnail, setThumbnail] = useState("kpsd38m8mtl6nxtmujlr.jpg");
  const videoRef = useRef();

  const { id } = useParams();

  const get_course_by_id = async () => {
    try {
      const resposne = await axios_instance.get(`api/get_course/${id}`);
      const { success, course } = resposne?.data;
      if (success) {
        console.log(resposne);
        setCourses(course);
        setCourseLessons(course?.lessons);
        setObjectives(course.objectives);
        setRequirements(course.requirements);
        setTargetAudience(course.target_students);
        setVideo_url(course?.lessons[0].video_tutorial_link)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_course_by_id();
  }, []);

  const NavRoutes = [
    { href: "/", label: "Overview" },
    { href: "/quiz", label: "Lesson Quiz" },
    { href: "/assignments", label: "Assignments" },
    { href: "/ask_doubt", label: "Ask your doubts" },
    { href: "/notes", label: "Saved Notes" },
    { href: "/reviews", label: "Reviews & Ratings" },
  ];

  
  const handleSelecetedNav = (val) => {
    setSelectedNav(val);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTutorialChange = (url) => {
    setVideo_url(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <Header />

      <main className="container mx-auto px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
              <Link to="/" className="hover:text-purple-600">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/dashboard/courses" className="hover:text-purple-600">
                All courses
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span>{courses?.title}</span>
            </div>

            {/* Video Player */}
            <div
              className="relative aspect-video bg-black rounded-lg overflow-hidden mb-8"
              // onMouseEnter={() => setShowControls(true)}
              // onMouseLeave={() => setShowControls(false)}
            >
              <iframe
                ref={videoRef}
                src={`https://player.cloudinary.com/embed/?public_id=${video_url}&cloud_name=dtc1xcil8&player[showJumpControls]=true&player[pictureInPictureToggle]=true&player[controlBar][fullscreenToggle]=true&source[poster]=https%3A%2F%2Fres.cloudinary.com%2Fdtc1xcil8%2Fimage%2Fupload%2F${thumbnail}&source[chapters]=true&source[sourceTypes][0]=hls`}
                // src="https://player.cloudinary.com/embed/?public_id=mcfbvelvdwkqbpf0o24e&cloud_name=dtc1xcil8&player[showJumpControls]=true&player[pictureInPictureToggle]=true&player[colors][accent]=%23A00DFF&player[fontFace]=Ruda&source[chapters]=true&source[sourceTypes][0]=hls"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                undefined
                allowfullscreen
                className="w-full h-full"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                frameborder="0"
              ></iframe>

              {/* <AnimatePresence>
                {showControls && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-4 text-white">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:text-white/80"
                          onClick={togglePlay}
                        >
                          {isPlaying ? (
                            <X className="h-6 w-6" />
                          ) : (
                            <PlayCircle className="h-6 w-6" />
                          )}
                        </Button>
                        <div className="flex-1">
                          <Progress
                            value={(currentTime / duration) * 100}
                            className="h-1"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Volume2 className="h-4 w-4" />
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-20"
                          />
                        </div>
                        <span className="text-sm">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence> */}
            </div>

            <div>
              {/* Course Title and Info */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  {courses?.title ||
                    "Complete Full-stack development course 2024"}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= 4
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2">4.7 (3,245 reviews)</span>
                  </div>
                  <span>
                    {courses?.enrollment_count || "12,546"} students enrolled
                  </span>
                  <Badge variant="secondary">
                    {courses?.difficulty || "Beginner"}
                  </Badge>
                </div>
              </div>

              <div className="hidden lg:block">
                <Tabs
                  defaultValue="overview"
                  value={selectedNav}
                  onValueChange={(value) => handleSelecetedNav(value)}
                >
                  <TabsList className="flex w-full justify-between  text-white bg-gradient-to-r from-primary to-purple-600 gap-1 h-12 ps-2 rounded-full mb-7">
                    {NavRoutes.map((nav, index) => (
                      <TabsTrigger
                        key={index}
                        className="rounded-full h-9 "
                        value={nav.label}
                      >
                        {nav.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
              {/* What You'll Learn */}
              <div className="shadow shadow-purple-300 rounded-lg border p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  What You'll Learn
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {objectives.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Goal className="h-5 w-5 text-purple-800 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className=" bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Dot className="h-5 w-5 text-white" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who Can Learn */}
              <div className="shadow shadow-purple-300 rounded-lg border p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  Who Can Learn
                </h2>
                <div className="space-y-4">
                  {targetAudience.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Goal className="h-5 w-5 text-purple-800 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="shadow shadow-purple-300 rounded-lg border p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <div className="prose max-w-none">
                  <p>{courses?.description}</p>
                </div>
              </div>

              {/* Instructor */}
              <div className="shadow shadow-purple-300 rounded-lg border p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Your Instructor</h2>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={courses?.instructor_id?.profile || "Instructor"}
                      alt="Instructor"
                    />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">
                      {courses?.instructor_id?.name || "Akshay Saini"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {courses?.instructor_id?.proffession ||
                        "Senior Software Engineer at Meta"}
                    </p>
                    <p className="mt-2 text-sm">
                      {courses?.instructor_id?.about || "Description"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="shadow shadow-purple-300 rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-6">Student Reviews</h2>
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b pb-6 last:border-0">
                      <div className="flex items-center gap-4 mb-2">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" alt="Student" />
                          <AvatarFallback>S</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">Student Name</div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className="h-4 w-4 text-yellow-400 fill-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">
                        This course exceeded my expectations. The instructor
                        explains complex concepts in a way that's easy to
                        understand, and the projects helped reinforce my
                        learning.
                      </p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Load More Reviews
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Course Content Sidebar */}
          <div className="lg:w-96">
            <div className="sticky top-36">
              <div className="bg-white rounded-lg border overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="font-semibold">Course Content</h2>
                  <p className="text-sm text-gray-600 flex gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" /> {CourseLessons.length}{" "}
                      Lessons{" "}
                    </span>{" "}
                    <span className="flex items-center gap-1">
                      <FileEdit className="w-4 h-4" /> {CourseLessons.length}{" "}
                      Assignments{" "}
                    </span>{" "}
                    <span className="flex items-center gap-1">
                      <Brain className="w-4 h-4" /> {CourseLessons.length * 3}{" "}
                      Quizzes{" "}
                    </span>
                  </p>
                </div>
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue="1"
                    className="w-full"
                  >
                    {CourseLessons.map((lesson, index) => (
                      <AccordionItem key={lesson._id} value={lesson._id}>
                        <AccordionTrigger className="px-4 hover:no-underline hover:bg-gray-50">
                          <div className="flex items-start justify-between">
                            <span
                              className="font-medium"
                              onClick={() =>
                                handleTutorialChange(lesson.video_tutorial_link)
                              }
                            >
                              {lesson.title}
                            </span>
                            {""}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-1 p-2">
                            {lesson.description}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Call for Tutors */}
      <CallForTutor />

      {/* Related Courses */}
      <CourseContainer title={"Related Courses"} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
