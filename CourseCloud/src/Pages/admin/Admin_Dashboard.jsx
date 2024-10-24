import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { DollarSign, TrendingUp, User, GraduationCap } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/Components/ui/breadcrumb";
const kpiData = [
  {
    title: "Total Students",
    value: "12990",
    icon: User,
    color: "text-lime-600",
  },
  {
    title: "Total Instructors",
    value: "642",
    icon: GraduationCap,
    color: "text-sky-500",
  },
  {
    title: "Total Profit",
    value: "Rs.123099.34",
    icon: DollarSign,
    color: "text-red-500",
  },
  {
    title: "Growth Rate",
    value: "54%",
    icon: TrendingUp,
    color: "text-green-500",
  },
];

const profitData = [
  { name: "Week 1", value1: 5000, value2: 2400 },
  { name: "Week 2", value1: 3500, value2: 1398 },
  { name: "Week 3", value1: 7000, value2: 2800 },
  { name: "Week 4", value1: 6780, value2: 3908 },
];

const MonthlyEnrollment = [
  { name: "SEP", a: 1000 },
  { name: "OCT", a: 3000 },
  { name: "NOV", a: 2000 },
  { name: "DEC", a: 2780 },
  { name: "JAN", a: 1890 },
  { name: "FEB", a: 2390 },
];

const pieChartData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function Admin_Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-2 pt-1 bg-white min-h-screen">
      <div className="items-center justify-between mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link href="/">Admin</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
            {/* ... */}
          </BreadcrumbList>
        </Breadcrumb>
        <h2 className="text-2xl mt-2 font-bold mb-6">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {kpiData.map((item, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-6">
              <div
                className={`rounded-full p-3 mr-4 ${item.color} bg-opacity-10`}
              >
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {item.title}
                </p>
                <h2 className="text-2xl font-bold">{item.value}</h2>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              <div className="flex justify-between items-center">
                  <span>Last month profilt</span>
                <span className="text-2xl font-bold">Rs.37.5K</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-green-500 mr-2">
                +2.45%
              </span>
              <span className="text-sm text-gray-500">On track</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={profitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value1"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="value2"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Monthly Enrollments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={MonthlyEnrollment}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="a" stackId="a" barSize={32} fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid sm:grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Daily Traffic
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">2,579</div>
              <div className="text-sm text-green-500">+2.45%</div>
              <div className="mt-4 h-32 bg-gray-100"></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                <div className="flex justify-between items-center">
                  <span>Your Pie Chart</span>
                  <Select defaultValue="monthly">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
