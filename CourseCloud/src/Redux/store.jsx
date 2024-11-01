//importing ES modules
import { configureStore } from "@reduxjs/toolkit";
import admin_slice from "./Slices/AdminSlice";
import student_slice from "./Slices/StudentSlice";
import instructor_slice from "./Slices/Instructor_Slice";
import course_plan from "./Slices/CoursePlan";
import course_curriculum from "./Slices/CourseCuriculum";
//Configuring redux store
const store = configureStore({
  reducer: {
    admin: admin_slice,
    student: student_slice,
    instructor: instructor_slice,
    course_plan: course_plan,
    course_curriculum: course_curriculum,
  },
});

//Exporting store and use it in the main for global access.
export default store;
