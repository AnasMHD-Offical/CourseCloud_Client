import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  PlusCircle,
  Upload,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
export default function Instructor_Create_Course_Preview() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  return (
    <>
      {/* Main Content */}
      <div className="max-w-5xl mx-auto sm:mx-2">
        {/* Course highlighter */}
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
          <div className="flex text-center sm:flex flex-col sm:flex-row  items-center ">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              3
            </div>
            <span className="ml-2">Course preview</span>
          </div>
        </div>
        {/* Course Preview Form */}
        <div className="space-y-6 ">
          <div>
            <h3 className="text-2xl font-semibold mb-1">Course Preview</h3>
            <p className="text-sm font-normal">
              Please complete the fields below with the specific details of your
              course.
            </p>
          </div>

          <div className="space-y-4 sm:border p-2 sm:p-4 rounded-lg">
            <div>
              <Label htmlFor="title" className="text-base">
                Course Title
              </Label>
              <Input
                id="title"
                className="h-11"
                placeholder="Eg. Learn the basics of python"
              />
            </div>

            <div>
              <Label htmlFor="subtitle" className="text-base">
                Course Subtitle
              </Label>
              <Input
                id="subtitle"
                className="h-11"
                placeholder="Eg. You will get to deep knowledge in python"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use a brief memorable statement to tell what will be done after
                completing your course.
              </p>
            </div>

            <div>
              <Label htmlFor="description" className="text-base">
                Course Description
              </Label>
              <Textarea
                id="description"
                placeholder="Eg. Learn how to design a website using HTML, CSS, JS"
                className="min-h-[100px]"
              />
              <p className="text-xs text-gray-500 mt-1">
                Course description should have 500 words
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Basic Info</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sub-category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web Development</SelectItem>
                    <SelectItem value="mobile">Mobile Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="primary" className="text-base">
                What is primarily taught in your course?
              </Label>
              <Input
                id="primary"
                className="h-11"
                placeholder="Eg. Web development"
              />
            </div>

            <div>
              <Label className="text-base">Course Thumbnail</Label>
              <div className="mt-2 flex items-start gap-4">
                <div className="relative w-40 aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="https://placehold.co/600x400"
                    alt="Course thumbnail placeholder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Thumbnail
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Upload your course here. It must meet our quality standards to
                be accepted. Important guidelines: 750x422 pixels; .jpg, .jpeg,.
                gif, or .png.
              </p>
            </div>

            <div>
              <Label htmlFor="price" className="text-base">
                Course Price
              </Label>
              <Input id="price" className="h-11" placeholder="Eg. Rs.7,999" />
            </div>
            <div className="mt-8 flex justify-between">
              <Button className="bg-black text-white px-4" onClick={()=>navigate("/instructor/create_course/2")}>
                <ArrowLeft className="ml-1 h-4 w-4" />
                Previous
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800">
                Add Course
                <PlusCircle className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
