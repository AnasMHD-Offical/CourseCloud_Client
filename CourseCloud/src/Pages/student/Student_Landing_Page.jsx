import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  Search,
  ShoppingCart,
  Star,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  BookOpen,
  Users,
  Award,
  Heart,
  ArrowRight,
} from "lucide-react";
// import Image from "next/image"
// import Link from "next/link"
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { HeartFilledIcon } from "@radix-ui/react-icons";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "design", label: "Design" },
    { value: "development", label: "Development" },
    { value: "business", label: "Business" },
    { value: "marketing", label: "Marketing" },
    { value: "personal", label: "Personal Development" },
  ];
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const testimonials = [
    {
      name: "John Doe",
      role: "Web Developer",
      content:
        "CourseCloud has transformed my career. The courses are top-notch!",
      avatar: "https://placehold.co/600x400",
    },
    {
      name: "Jane Smith",
      role: "Data Scientist",
      content:
        "I've learned so much from the expert instructors. Highly recommended!",
      avatar: "https://placehold.co/600x400",
    },
    {
      name: "Alex Johnson",
      role: "UX Designer",
      content:
        "The practical projects have greatly improved my portfolio. Thank you, CourseCloud!",
      avatar: "https://placehold.co/600x400",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <motion.header
        className={`sticky top-0 z-50 bg-white/80 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? "shadow-md py-2" : "py-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            CourseCloud
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Categories
            </Link>
            <div className="relative group">
              <Input
                className="pl-10 pr-4 py-2 w-96 rounded-full border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all duration-300"
                placeholder="Search for anything"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors duration-300 w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Login / Sign up
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white shadow-lg rounded-b-lg mt-2 p-4"
            >
              <Link
                href="#"
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                Categories
              </Link>
              <div className="relative mt-2">
                <Input
                  className="pl-10 pr-4 py-2 w-full rounded-full"
                  placeholder="Search for anything"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative bg-gradient-to-r from-neutral-200/10 to-neutral-100 py-24 md:py-32 overflow-hidden px-10"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center relative z-10">
          <motion.div
            className="md:w-[61.8%] mb-8 md:mb-0 pr-0 md:pr-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mt-10 md:mt-0   text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Unlock Your Potential with CourseCloud
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Discover expert-led courses and transform your skills. Start your
              learning journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-primary hover:bg-primary/90"
              >
                Explore Courses
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2" /> Watch Demo
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="md:w-[38.2%]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dtc1xcil8/image/upload/v1730556641/dhil48sknbltoebtjupu.jpg"
                alt="Students learning"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
              <motion.div
                className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-lg font-bold">10,000+</p>
                <p className="text-sm text-gray-600">Active Students</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 mix-blend-multiply"></div>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50 px-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Why Choose CourseCloud?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Expert-led Courses",
                description:
                  "Learn from industry professionals and gain practical skills",
              },
              {
                icon: Users,
                title: "Collaborative Learning",
                description:
                  "Engage with peers and instructors in interactive sessions",
              },
              {
                icon: Award,
                title: "Recognized Certifications",
                description:
                  "Earn certificates valued by top employers worldwide",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <feature.icon className="w-12 h-12 text-primary  mb-4 " />
                <h3 className="text-xl font-semibold mb-2 from-primary  bg-clip-text text-transparent bg-gradient-to-r  to-purple-600">
                  {feature.title}
                </h3>
                <p className="from-black to-purple-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Courses */}
      <section className="py-16 md:py-24 px-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Trending Courses
            </h2>
            <Button
              variant="outline"
              className="text-primary border-primary hover:bg-primary/10 transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src="https://res.cloudinary.com/dtc1xcil8/image/upload/v1730556641/dhil48sknbltoebtjupu.jpg"
                        alt={`Course ${i}`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
                        <Heart className="w-5 h-5 text-center text-primary" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        Complete Life coach certification course 2024
                      </h3>
                      <div className="flex items-center text-sm text-yellow-500 mb-2">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        <span>4.5</span>
                        <span className="text-gray-500 ml-1">
                          (2.3k reviews)
                        </span>
                      </div>
                      <div className="font-bold text-xl text-primary">
                        Rs. 799
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button className="w-full rounded-full  text-white bg-gradient-to-r from-primary to-purple-600 hover:bg-primary-dark transition-colors duration-300">
                      Enroll Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 md:py-24 sm:px-16 md:px-18 lg:px-36 bg-gradient-to-r from-yellow-100 to-yellow-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="flex flex-col-reverse min-h-full lg:flex-row items-center rounded-3xl bg-white shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="md:w-[50.8%] h-4/6 px-2 p-8 md:p-12">
              <span className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold mb-4 animate-pulse">
                LIVE
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
                50% OFF
              </h2>
              <p className="text-xl mb-6">for Yoga class by Hira Malick</p>
              <Button
                size="lg"
                className="rounded-full px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white"
              >
                Book Now
              </Button>
            </div>
            <div className="w-[100%] lg:w-[49.2%] relative h-64 sm:h-96 lg:h-auto overflow-hidden">
              <img
                src="https://res.cloudinary.com/dtc1xcil8/image/upload/v1730557176/lxl2fjkpbpfmkmavnny2.jpg"
                alt="Yoga class"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 transform hover:scale-110"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Categories */}
      {/* <section className="py-16 md:py-24 px-10 bg-gray-50">
        {/* <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Explore Course Categories
          </h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 h-12 ps-2 rounded-full">
              <TabsTrigger className="rounded-full h-9" value="all">
                All Categories
              </TabsTrigger>
              <TabsTrigger className="rounded-full h-9" value="design">
                Design
              </TabsTrigger>
              <TabsTrigger className="rounded-full h-9" value="development">
                Development
              </TabsTrigger>
              <TabsTrigger className="rounded-full h-9" value="business">
                Business
              </TabsTrigger>
              <TabsTrigger className="rounded-full h-9" value="marketing">
                Marketing
              </TabsTrigger>
              <TabsTrigger className="rounded-full h-9" value="personal">
                Personal Development
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  "Web Design",
                  "Mobile App Development",
                  "Digital Marketing",
                  "Data Science",
                  "Business Strategy",
                  "UX/UI Design",
                  "Machine Learning",
                  "Content Creation",
                ].map((category, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <h3 className="font-semibold text-lg mb-2">{category}</h3>
                    <p className="text-sm text-gray-600">20+ Courses</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            {/* Add similar TabsContent for other categories */}
      {/* </Tabs> */}
      {/* </div> */}
      {/* </section> */}

      <section className="py-16 md:py-24 px-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Explore Course Categories
          </h2>

          {/* Mobile dropdown */}
          <div className="lg:hidden mb-8 rounded-full">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full rounded-3xl text-white bg-gradient-to-r from-primary to-purple-600 h-12 ps-6">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Desktop tabs */}
          <div className="hidden lg:block">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-3  text-white bg-gradient-to-r from-primary to-purple-600 lg:grid-cols-6 gap-4 h-12 ps-2 rounded-full">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.value}
                    className="rounded-full h-9 "
                    value={category.value}
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Content for selected category */}
          <div className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                "Web Design",
                "Mobile App Development",
                "Digital Marketing",
                "Data Science",
                "Business Strategy",
                "UX/UI Design",
                "Machine Learning",
                "Content Creation",
              ].map((category, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3 className="font-semibold text-lg mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    {category}
                  </h3>
                  <p className="text-sm text-gray-600">20+ Courses</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our top pick for you */}
      <section className="py-16 md:py-24 px-4 xl:px-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Our top pick for you
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden transform hover:scale-105 transition-all duration-300 bg-gradient-to-br from-primary/5 to-purple-500/5">
              <CardContent className="p-8 flex flex-col md:flex-row items-center">
                <div className="md:w-[38.2%] mb-6 md:mb-0">
                  <div className="relative">
                    <img
                      src="https://res.cloudinary.com/dtc1xcil8/image/upload/v1730556641/dhil48sknbltoebtjupu.jpg"
                      alt="Training course"
                      width={400}
                      height={300}
                      className="rounded-2xl shadow-lg"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-primary text-white p-4 rounded-lg shadow-lg">
                      <p className="text-lg font-bold">4.9</p>
                      <p className="text-sm">Rating</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-[61.8%] md:pl-12">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    Complete Full-stack Development course 2024
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Master web development with our comprehensive course. Learn
                    front-end, back-end, and everything in between.
                  </p>
                  <div className="font-bold text-3xl mb-6 text-primary">
                    Rs. 7999
                  </div>
                  <Button
                    size="lg"
                    className="rounded-full px-8 py-3 text-lg bg-primary hover:bg-primary-dark transition-colors duration-300"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of students and transform your skills today!
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="rounded-full px-8 py-3 text-lg bg-white text-primary hover:bg-gray-100 transition-colors duration-300"
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            What Our Students Say
          </h2>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto"
              >
                <p className="text-lg mb-4 italic">
                  &ldquo;{testimonials[activeSlide].content}&rdquo;
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonials[activeSlide].avatar}
                    alt={testimonials[activeSlide].name}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">
                      {testimonials[activeSlide].name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {testimonials[activeSlide].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={() =>
                setActiveSlide((prev) =>
                  prev === 0 ? testimonials.length - 1 : prev - 1
                )
              }
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={() =>
                setActiveSlide((prev) =>
                  prev === testimonials.length - 1 ? 0 : prev + 1
                )
              }
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white mt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <h3 className="font-bold text-2xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-600">
                CourseCloud
              </h3>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                Learn from the best tutors and institutions in the world. Expand
                your knowledge and boost your career with our curated courses.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Business
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Marketing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Finance
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Personal Development
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} CourseCloud. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
