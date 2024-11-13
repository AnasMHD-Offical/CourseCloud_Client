import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, GraduationCap, Users, PieChart } from "lucide-react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { axios_instance } from "@/Config/axios_instance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Dummy data for charts
const enrollmentData = [
  { month: "Jan", students: 120 },
  { month: "Feb", students: 150 },
  { month: "Mar", students: 200 },
  { month: "Apr", students: 180 },
  { month: "May", students: 250 },
  { month: "Jun", students: 300 },
];

const revenueData = [
  { month: "Jan", revenue: 5000 },
  { month: "Feb", revenue: 6000 },
  { month: "Mar", revenue: 8000 },
  { month: "Apr", revenue: 7500 },
  { month: "May", revenue: 9000 },
  { month: "Jun", revenue: 11000 },
];

export default function InstructorDashboard() {
  const [createdCourses, setCreatedCourses] = useState([]);
  const instructor_id = useSelector(
    (state) => state?.instructor?.instructor_data?.instructor?._id
  );
  const navigate = useNavigate();
  const get_courses = async () => {
    try {
      const response = await axios_instance.get(
        `api/instructor/get_created_courses/${instructor_id}`
      );
      const { success, courses } = response?.data;
      if (success) {
        setCreatedCourses(courses);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    get_courses();
  }, []);
  return (
    <>
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r to-primary from-purple-800">
            Instructor Dashboard
          </h1>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Total Students",
                value: "1,234",
                icon: Users,
                color: "bg-blue-500",
              },
              {
                title: "Active Courses",
                value: "12",
                icon: BookOpen,
                color: "bg-green-500",
              },
              {
                title: "Total Revenue",
                value: "$12,345",
                icon: PieChart,
                color: "bg-purple-500",
              },
              {
                title: "Avg. Course Rating",
                value: "4.8",
                icon: GraduationCap,
                color: "bg-yellow-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {item.title}
                        </p>
                        <h2 className="text-3xl font-bold text-gray-800">
                          {item.value}
                        </h2>
                      </div>
                      <div className={`p-3 rounded-full ${item.color}`}>
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r to-primary from-purple-800">
                  Student Enrollment
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="students"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r to-primary from-purple-800">
                  Revenue
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#82ca9d"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Courses */}
          <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r to-primary from-purple-800">
                Recent Created Courses
              </h3>
              <div className="space-y-4">
                {createdCourses.map((course, index) => (
                  <motion.div
                    key={course}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <div className="w-60 h-auto sm:w-28 sm:h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
                      {course?.thumbnail ? (
                        <img
                          src={course?.thumbnail || ""}
                          alt=""
                          objectfit="cover"
                          className="rounded-md"
                        />
                      ) : (
                        <BookOpen className="h-8 w-8 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold bg-clip-text text-transparent bg-gradient-to-r to-primary from-purple-800">
                        {course?.title || "Advanced Web Development"}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {course?.enrollment_count
                          ? `${course?.enrollment_count} students enrolled`
                          : "32 students enrolled"}
                      </p>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Button variant="outline" className="hover:bg-indigo-50">
                        View Details
                      </Button>
                      <Button
                        onClick={() =>
                          navigate(`/instructor/edit_course/`, {
                            state: course._id,
                          })
                        }
                      >
                        Edit Course
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
