import { useEffect, useState } from "react";
import {
  ArrowDownUp,
  ArrowDownUpIcon,
  BookOpen,
  ChevronRight,
  Filter,
  GraduationCap,
  Heart,
  Home,
  LayoutDashboard,
  Library,
  ListFilter,
  LogOut,
  Medal,
  Search,
  User,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import PurshacedCourseContainer from "@/Components/base/PurshacedCourseContainer";
import { axios_instance } from "@/Config/axios_instance";
import { useSelector } from "react-redux";
import CourseContainer from "@/Components/base/CourseContainer";
import ContainerSkelton from "@/Components/fallback/ContainerSkeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";

export default function All_Course_Component() {
  const student_id = useSelector(
    (state) => state?.student?.student_data?.student?._id
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("enrolled");
  const [isOpen, setIsOpen] = useState(false);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [courseMetadata, setCourseMatadata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //   const searchParams = useSearchParams();
  const page = 1;
  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/courses", icon: BookOpen, label: "All courses" },
    { href: "/wishlist", icon: Heart, label: "Wishlist" },
    { href: "/certificates", icon: Medal, label: "Certificates" },
    { href: "/learning", icon: GraduationCap, label: "Learning" },
  ];

  const get_purchased_courses = async () => {
    try {
      const response = await axios_instance.get(
        `api/get_purchased_courses/${student_id}`,
      );
      const { message, success, purchased_courses, Courses_duration } =
        response?.data;
      if (success) {
        setPurchasedCourses(purchased_courses?.courses);
        setCourseMatadata(Courses_duration);
        setIsLoading(false);
        console.log(response?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    get_purchased_courses();
  }, []);

  return (
    <main className="flex-1 md:pt-0 pt-1 overflow-auto bg-gradient-to-br to-primary/10 from-purple-50 via-blue-50">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="sticky top-0 z-10 bg-transparent border-b"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between ">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              <Library className="h-6 w-6" />
            </Button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-lg"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b">
                      <Link
                        href="/"
                        className="flex items-center gap-2 font-bold text-2xl"
                      >
                        <div className="h-8 w-8 rounded-full bg-primary" />
                        CourseCloud
                      </Link>
                      <Button variant="ghost" size="icon" onClick={toggleMenu}>
                        <X className="h-6 w-6" />
                      </Button>
                    </div>
                    <ScrollArea className="flex-1 px-3 py-4">
                      <div className="space-y-1">
                        {navItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                            onClick={toggleMenu}
                          >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-1">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          onClick={toggleMenu}
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </Button>
                      </div>
                    </ScrollArea>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "tween" }}
                className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
                onClick={toggleMenu}
              />
            )}
            <h1 className="text-2xl font-bold">All Courses</h1>
          </div>
        </div>
      </motion.header>

      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="container mx-auto px-6 py-4"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li>
            <Link to="/" className="hover:text-foreground transition-colors">
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          <li>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li>
            <span className="text-foreground font-medium" aria-current="page">
              All Course
            </span>
          </li>
        </ol>
      </motion.nav>

      <div className="container px-4 py-2 lg:px-8">
        <div className="mt-4">
          <Tabs
            className="mt-6"
            defaultValue={activeTab}
            onValueChange={setActiveTab}
          >
            {/* <TabsList>
              <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative bg-white rounded-full">
                <Search className="absolute  left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="w-full rounded-full pl-8 sm:w-[300px]"
                  placeholder="Search courses..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[180px] border rounded-full shadow-md bg-slate-50">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="AlphaAsc">Course : A-Z</SelectItem>
                    <SelectItem value="AlphaDes">Course : Z-A</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-full md:w-[180px] border rounded-full shadow-md bg-slate-50">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="free">Free courses</SelectItem>
                    <SelectItem value="paid">Paid Courses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div> */}
            <TabsContent className="mt-6" value={activeTab}>
              {isLoading ? (
                <ContainerSkelton />
              ) : (
                <PurshacedCourseContainer
                  title={"All Purchased Courses"}
                  courses={purchasedCourses}
                  course_metadata={courseMetadata}
                />
              )}
            </TabsContent>
          </Tabs>
          {/* <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div> */}

          <CourseContainer title={"Top picks for you"} />
        </div>
      </div>
    </main>
  );
}
