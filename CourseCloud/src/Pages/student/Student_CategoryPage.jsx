import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
// import { Switch } from "@/components/ui/switch";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
} from "framer-motion";
import { useRef } from "react";
import Footer from "@/Components/base/Footer";
import Header from "@/Components/base/Header";
import CourseContainer from "@/Components/base/CourseContainer";
import CourseCardxs from "@/Components/base/CourseCardxs";
import "../../Components/base/CustomStyle.css";
import { useParams } from "react-router-dom";
import { axios_instance } from "@/Config/axios_instance";
import CourseContainerManual from "@/Components/base/CourseContainerManual";

export default function CategoryPage() {
  const [viewMode, setViewMode] = useState();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [isLoading, setIsLoading] = useState(true);
  const [CoursesByCategory, setCoursesByCategory] = useState([]);
  const [CoursesBySubCategory, setCoursesBySubCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([
    { _id: "All", title: "All category" },
  ]);
  const [subcategories, setSubcategories] = useState([]);

  const courseGridRef = useRef(null);
  const isInView = useInView(courseGridRef, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const { id, subcategory } = useParams();

  const get_courses_by_category = async () => {
    try {
      const resposnse = await axios_instance.get(
        `/api/get_courses_by_category/${id}/${subcategory}`
      );
      const { success, message, BySubcategory, ByCategory } = resposnse?.data;
      if (success) {
        setCoursesByCategory(ByCategory);
        setCategoryName(ByCategory[0].category.title);
        setCoursesBySubCategory(BySubcategory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const get_category = async () => {
    try {
      const response = await axios_instance.get("api/get_category");
      console.log(response);
      // const {}
      setCategories(response?.data?.categories);
    } catch (error) {
      //   const { message } = error?.response?.data;
      console.log(error);

      //   toast.error(message);
    }
  };
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    get_courses_by_category();
    get_category();
  }, []);

  // const categories = [
  //   { id: "all", name: "All Categories" },
  //   { id: "development", name: "Development" },
  //   { id: "business", name: "Business" },
  //   { id: "finance", name: "Finance & Accounting" },
  //   { id: "it", name: "IT & Software" },
  //   { id: "design", name: "Design" },
  // ];

  // const subcategories = {
  //   all: [{ id: "all", name: "All Subcategories" }],
  //   development: [
  //     { id: "web", name: "Web Development" },
  //     { id: "mobile", name: "Mobile Development" },
  //     { id: "programming", name: "Programming Languages" },
  //     { id: "game", name: "Game Development" },
  //   ],
  //   business: [
  //     { id: "entrepreneurship", name: "Entrepreneurship" },
  //     { id: "communication", name: "Communication" },
  //     { id: "management", name: "Management" },
  //     { id: "sales", name: "Sales" },
  //   ],
  //   finance: [
  //     { id: "accounting", name: "Accounting & Bookkeeping" },
  //     { id: "crypto", name: "Cryptocurrency & Blockchain" },
  //     { id: "finance", name: "Finance" },
  //     { id: "investing", name: "Investing & Trading" },
  //   ],
  //   it: [
  //     { id: "network", name: "Network & Security" },
  //     { id: "hardware", name: "Hardware" },
  //     { id: "operating-systems", name: "Operating Systems" },
  //     { id: "other", name: "Other IT & Software" },
  //   ],
  //   design: [
  //     { id: "web-design", name: "Web Design" },
  //     { id: "graphic-design", name: "Graphic Design" },
  //     { id: "ux-ui", name: "UX/UI Design" },
  //     { id: "3d-animation", name: "3D & Animation" },
  //   ],
  // };

  const courses = [
    {
      id: 1,
      title: "The Complete 2023 Web Development Bootcamp",
      instructor: "Dr. Angela Yu",
      rating: 4.7,
      reviews: 240563,
      students: 967832,
      actual_price: 3499,
      originalPrice: 4999,
      thumbnail:
        "https://res.cloudinary.com/dtc1xcil8/image/upload/v1730710700/dehvw4jfovkrkmsldhwc.jpg",
      category: "development",
      subcategory: "web",
      level: "Beginner",
      duration: "65 hours",
      lastUpdated: "Last updated 04/2023",
      description:
        "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps",
    },
    {
      id: 2,
      title: "Machine Learning A-Z™: Hands-On Python & R In Data Science",
      instructor: "Kirill Eremenko, Hadelin de Ponteves",
      rating: 4.5,
      reviews: 154126,
      students: 692631,
      actual_price: 4199,
      originalPrice: 5999,
      thumbnail:
        "https://res.cloudinary.com/dtc1xcil8/image/upload/v1730710700/dehvw4jfovkrkmsldhwc.jpg",
      category: "it",
      subcategory: "other",
      level: "Intermediate",
      duration: "44 hours",
      lastUpdated: "Last updated 03/2023",
      description:
        "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
    },
    {
      id: 3,
      title: "The Complete Financial Analyst Course 2023",
      instructor: "365 Careers",
      rating: 4.6,
      reviews: 78953,
      students: 326715,
      actual_price: 3799,
      originalPrice: 5499,
      thumbnail:
        "https://res.cloudinary.com/dtc1xcil8/image/upload/v1730710700/dehvw4jfovkrkmsldhwc.jpg",
      category: "finance",
      subcategory: "finance",
      level: "All Levels",
      duration: "19 hours",
      lastUpdated: "Last updated 05/2023",
      description:
        "Excel, Accounting, Financial Statement Analysis, Business Analysis, Financial Math, PowerPoint: Everything is Included!",
    },
    {
      id: 4,
      title: "Ultimate AWS Certified Solutions Architect Associate 2023",
      instructor: "Stephane Maarek",
      rating: 4.7,
      reviews: 155732,
      students: 525641,
      actual_price: 4599,
      originalPrice: 6499,
      thumbnail:
        "https://res.cloudinary.com/dtc1xcil8/image/upload/v1730710700/dehvw4jfovkrkmsldhwc.jpg",
      category: "it",
      subcategory: "network",
      level: "Intermediate",
      duration: "27 hours",
      lastUpdated: "Last updated 06/2023",
      description:
        "Pass the AWS Certified Solutions Architect Associate Certification SAA-C03. Complete Amazon Web Services Cloud training!",
    },
  ];

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    const sub = categories
      .map((category) => category.sub_category)
      .flat()
      .filter(
        (sub) => (sub.status !== false, sub.category_id === value)
      );
    setSubcategories(sub);

    // setSubcategories(refinedSubcategories);
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedSubcategory("all");
    setPriceRange([0, 5000]);
    setSelectedRating("all");
    setSelectedLevel("all");
    setSearchQuery("");
  };

  const SkeletonCard = () => (
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
      <div className="p-4 space-y-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gray-50 text-gray-900`}>
      {/*Header  */}
      <Header />

      {/* Hero Banner */}
      <section
        className={`py-20 min-h-96 bg-gradient-to-br from-primary/10 via-purple-100 to-blue-50`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600  md:text-5xl font-bold mb-6 leading-tight"
            >
              Unlock Your Potential with CourseCloud
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8 opacity-90 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
            >
              Discover thousands of courses taught by expert instructors across
              various fields.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-black text-white  hover:bg-neutral-900"
              >
                Explore Courses
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ccourse From the selected subcategory */}
      <CourseContainerManual
        title={`Courses From ${subcategory}`}
        CourseData={CoursesBySubCategory}
      />

      {/* Courses From the selected category */}
      <CourseContainerManual
        title={
          categoryName
            ? `Courses Related to ${categoryName}`
            : "Courses Related to your Category"
        }
        CourseData={CoursesByCategory}
      />

      {/* Main Content */}
      <main className="mx-auto xl:px-4 pb-12 pt-8 bg-gradient-to-br from-primary/10 via-purple-100 to-blue-50">
        <h2 className="text-3xl md:text-4xl ms-10 md:ms-16 mb-6 font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Filter Courses
        </h2>
        <div className="px-10 flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-64 space-y-6"
          >
            <Card className={`p-6 shadow-lg rounded-xl sticky top-24`}>
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex justify-between items-center">
                  Filters
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 space-y-6">
                <div>
                  <Label className="text-lg mb-2">Category</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => handleCategoryChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All category" />  
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCategory !== "all" && (
                  <div>
                    <Label className="text-lg mb-2">Subcategory</Label>
                    <Select
                      value={selectedSubcategory}
                      onValueChange={(value) => setSelectedSubcategory(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {subcategories.map((subcategory) => (
                          <SelectItem
                            key={subcategory.id}
                            value={subcategory.title}
                          >
                            {subcategory.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label className="text-lg mb-2">Price Range</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000}
                    step={100}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>

                <div>
                  <Label className="text-lg mb-2">Rating</Label>
                  <RadioGroup
                    value={selectedRating}
                    onValueChange={setSelectedRating}
                    className="mt-2 space-y-2"
                  >
                    {["all", "5", "4", "3"].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={rating}
                          id={`rating-${rating}`}
                        />
                        <Label
                          htmlFor={`rating-${rating}`}
                          className="flex items-center cursor-pointer"
                        >
                          {rating === "all" ? (
                            <span>All Ratings</span>
                          ) : (
                            <>
                              <span className="ml-2 mr-1">{rating}</span>
                              {Array(parseInt(rating))
                                .fill(null)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                  />
                                ))}
                            </>
                          )}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-lg mb-2">Level</Label>
                  <RadioGroup
                    value={selectedLevel}
                    onValueChange={setSelectedLevel}
                    className="mt-2 space-y-2"
                  >
                    {["all", "beginner", "intermediate", "advanced"].map(
                      (level) => (
                        <div
                          key={level}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem value={level} id={`level-${level}`} />
                          <Label
                            htmlFor={`level-${level}`}
                            className="cursor-pointer capitalize"
                          >
                            {level === "all" ? "All Levels" : level}
                          </Label>
                        </div>
                      )
                    )}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Course Grid */}
          <div className="flex-1">
            <div className="flex w-full justify-between flex-col  sm:flex-row items-center mb-6">
              <h2 className="text-3xl font-bold mb-2 sm:mb-0">
                Featured Courses
              </h2>
              <div className="flex items-center space-x-4 w-full sm:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <motion.div
              ref={courseGridRef}
              initial="hidden"
              animate={controls}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className={
                "grid overflow-clip grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              }
            >
              <AnimatePresence>
                {isLoading
                  ? Array(6)
                      .fill(null)
                      .map((_, index) => (
                        <motion.div
                          key={`skeleton-${index}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <SkeletonCard />
                        </motion.div>
                      ))
                  : courses.map((course) => (
                      <motion.div
                        key={course.id}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <CourseCardxs course={course} />
                      </motion.div>
                    ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
