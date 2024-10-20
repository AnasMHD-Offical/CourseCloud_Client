import React, { useEffect, useState } from "react";
import {
  Search,
  User,
  LogOut,
  PlusCircle,
  ChevronDown,
  Pencil,
  Trash2,
  Menu,
  CirclePlus,
  Delete,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { axios_instance } from "@/Config/axios_instance";
import { toast } from "sonner";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

//Form validation schema
const form_validation = yup.object({
  title: yup
    .string()
    .matches(/[A-Za-z ]/, "Title must be alphabet")
    .required("Title is required"),
  description: yup.string().required("Description is required"),
});

// Category component
export default function Category() {
  //state for manage category
  const [categories, setCategories] = useState([]);
  //state for manange the updates that done with category to get real time data of category
  const [is_category_changed, SetIs_category_changed] = useState(false);
  //State for manage is the form changes to edit or add category
  const [is_edit, setIs_edit] = useState(false);
  //state for manage the add or edit button text and headings are changed based on editing category or adding category
  const [btn_change, setBtn_change] = useState("Add");
  //state for managing form initial value in formik reinitializing
  const [form_initial_value, setForm_initial_value] = useState({
    title: "",
    description: "",
  });
  const [is_sub_edit, setIs_sub_edit] = useState(false);
  const [is_sub_btn_change, setIs_sub_btn_changed] = useState("Add");
  const [sub_form_initial_value, setSub_form_initial_value] = useState({
    title: "",
    description: "",
  });
  //State for managing category_id for edit each category.
  const [category_id, setCategory_id] = useState();
  const [sub_id, setSub_id] = useState();
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    //function for get categories that added on db
    const get_all_category = async () => {
      try {
        const response = await axios_instance.get(
          "/api/admin/get_all_categories"
        );
        console.log(response);
        setCategories(response?.data?.all_categories);
      } catch (error) {
        console.log(error);
      }
    };
    get_all_category();
  }, [is_category_changed]);

  //Function to handle add category
  const addCategory = async (values) => {
    try {
      const title_trimed = values.title.trim();
      if (title_trimed !== "") {
        const response = await axios_instance.post(
          "api/admin/add_category",
          values
        );
        console.log(response);
        const { success, message } = response?.data;
        if (success) {
          SetIs_category_changed(!is_category_changed);
          console.log(categories);
          toast.success(message);
          setForm_initial_value({
            title: "",
            description: "",
          });
        }
      }
    } catch (error) {
      const { message } = error?.response?.data;
      toast.error(message);
      console.log(error);
      SetIs_category_changed(!is_category_changed);
    }
  };

  //Function to handle edit category
  const editCategory = async (values) => {
    try {
      const response = await axios_instance.put("api/admin/edit_category", {
        data: values,
        id: category_id,
      });
      const { success, message } = response?.data;
      if (success) {
        toast.success(message);
        setIs_edit(false);
        setBtn_change("Add");
        setCategory_id("");
        setForm_initial_value({
          title: "",
          description: "",
        });
        SetIs_category_changed(!is_category_changed);
      }
    } catch (error) {
      const { message } = error?.response?.data;
      console.log(error);
      toast.error(message);
      SetIs_category_changed(!is_category_changed);
    }
  };

  //Handle the change based on edit or add
  const handle_edit_category = (category) => {
    setIs_edit(true);
    setBtn_change("Edit");
    setForm_initial_value({
      title: category.title,
      description: category.description,
    });
    setCategory_id(category._id);
    SetIs_category_changed(!is_category_changed);
  };

  //handle unlisting of category
  const handle_category_delete = async (category) => {
    try {
      const response = await axios_instance.patch(
        "/api/admin/delete_category",
        { _id: category._id }
      );
      console.log(response);
      const { success, message } = response?.data;
      if (success) {
        toast.success(message);
        SetIs_category_changed(!is_category_changed);
      }
    } catch (error) {
      const { message } = error?.response?.data;
      toast.error(message);
      console.log(error);
    }
  };
  //handle listing of category
  const handle_category_listing = async (category) => {
    try {
      const response = await axios_instance.patch(
        "/api/admin/listing_category",
        { _id: category._id }
      );
      console.log(response);
      const { success, message } = response?.data;
      if (success) {
        toast.success(message);
        SetIs_category_changed(!is_category_changed);
      }
    } catch (error) {
      const { message } = error?.response?.data;
      toast.error(message);
      console.log(error);
    }
  };

  //Function to handle adding sub category
  const addSubcategory = async (category_id, values) => {
    const title_trimed = values.title.trim();

    if (title_trimed !== "") {
      console.log(values), "hdhjejgruitqiwetyr";
      try {
        const response = await axios_instance.put(
          "api/admin/add_sub_category",
          { data: values, id: category_id }
        );
        console.log(response);

        // const sub_categories = [...response?.data?.sub_category];
        const { success, message } = response?.data;
        if (success) {
          toast.success(message);
          setSub_form_initial_value({
            title: "",
            description: "",
          });
          SetIs_category_changed(!is_category_changed);
        }
        console.log(response);
      } catch (error) {
        const { message } = error?.response?.data;
        console.log(error);
        toast.error(message);
        SetIs_category_changed(!is_category_changed);
      }
      //   setCategories(
      //     categories.map((category) =>
      //       category.id === parentId
      //         ? {
      //             ...category,
      //             subcategories: [
      //               ...category.subcategories,
      //               {
      //                 ...newSubcategory,
      //                 id: Date.now().toString(),
      //                 subcategories: [],
      //               },
      //             ],
      //           }
      //         : category
      //     )
      //   );
      //   setNewSubcategory({ title: "", description: "" });
    }
  };

  //Function to edit sub category
  const edit_subcategory = async (category_id, values) => {
    try {
      console.log(values);
      console.log("Id :", category_id);
      console.log("sub", sub_id);

      const resposne = await axios_instance.put("api/admin/edit_sub_category", {
        data: values,
        _id: category_id,
        sub_id: sub_id,
      });
      const { message, success } = resposne?.data;
      if (success) {
        toast.success(message);
        setIs_sub_btn_changed("Add");
        setIs_sub_edit(false);
        setSub_form_initial_value({
          title: "",
          description: "",
        });
        SetIs_category_changed(!is_category_changed);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      SetIs_category_changed(!is_category_changed);
    }
  };

  //Function to handle sub category datas edits 
  const handle_edit_Sub_category = (subcategory) => {
    setIs_sub_btn_changed("Edit");
    setIs_sub_edit(true);
    setSub_form_initial_value({
      title: subcategory.title,
      description: subcategory.description,
    });
    setSub_id(subcategory._id);
  };
  //Fucntion to handle sub category listing
  const handle_sub_category_unlist = async (sub_category, category_id) => {
    try {
      console.log("SUb", sub_category);
      console.log("Id", category_id);
      const response = await axios_instance.put(
        "api/admin/delete_sub_category",
        { id: category_id, data: sub_category }
      );
      console.log(response);
      const { success, message } = response?.data;
      if (success) {
        toast.success(message);
        SetIs_category_changed(!is_category_changed);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  //Function to handle sub category unlisting
  const handle_sub_category_listing = async (sub_category, category_id) => {
    try {
      console.log("SUb", sub_category);
      console.log("Id", category_id);
      const response = await axios_instance.put(
        "api/admin/listing_sub_category",
        { id: category_id, data: sub_category }
      );
      console.log(response);
      const { success, message } = response?.data;
      if (success) {
        toast.success(message);
        SetIs_category_changed(!is_category_changed);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  //   const SidebarContent = () => (

  //     <nav>
  //       <ul className="space-y-2">
  //         {[
  //           "Dashboard",
  //           "Profile",
  //           "Student Management",
  //           "Instructor Management",
  //           "Course Management",
  //           "Category Management",
  //         ].map((item, index) => (
  //           <li key={index}>
  //             <a
  //               href="#"
  //               className={`block px-4 py-2 rounded-md ${
  //                 item === "Category Management"
  //                   ? "bg-blue-500 text-white"
  //                   : "text-gray-700 hover:bg-gray-200"
  //               }`}
  //             >
  //               {item}
  //             </a>
  //           </li>
  //         ))}
  //       </ul>
  //       <button className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-md flex items-center justify-center">
  //         <LogOut className="mr-2 h-4 w-4" /> Logout
  //       </button>
  //     </nav>
  //   );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[265px] sm:w-[300px] bg-neutral-100"
              >
                <aside className="w-56 bg-neutral-100 py-4 px-1">
                  <nav>
                    <ul className="space-y-2">
                      {[
                        "Dashboard",
                        "Profile",
                        "Student Management",
                        "Instructor Management",
                        "Course Management",
                        "Category Management",
                      ].map((item, index) => (
                        <li key={index}>
                          <button
                            href="#"
                            className={`block py-2 w-full rounded-md ${
                              item === "Category Management"
                                ? "bg-neutral-950 text-white"
                                : "text-gray-700 hover:bg-neutral-950 hover:text-neutral-50"
                            }`}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <button className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-md flex items-center justify-center">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </button>
                </aside>
              </SheetContent>
            </Sheet>
            <h1 className="text-2xl font-bold text-gray-900">CourseCloud</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search courses"
                className="w-64 h-9 pl-5 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-neutral-800"
              />
              <button className="absolute right-0 top-0 h-9 w-9  border rounded-full bg-neutral-50 hover:border-neutral-800">
                <Search className="absolute left-2 top-2 h-5 w-5 text-neutral-600 " />
              </button>
            </div>
            <User className="h-6 w-6 text-neutral-950" />
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar - hidden on mobile, visible on larger screens */}
        <aside className="hidden w-64 md:block xl:w-80 lg:w-72 bg-neutral-50 border-r border-t p-4">
          <nav>
            <ul className="space-y-2">
              {[
                "Dashboard",
                "Profile",
                "Student Management",
                "Instructor Management",
                "Course Management",
                "Category Management",
              ].map((item, index) => (
                <li key={index}>
                  <button
                    href="#"
                    className={`block py-2 w-full rounded-md ${
                      item === "Category Management"
                        ? "bg-neutral-950 text-white"
                        : "text-gray-700 hover:bg-neutral-950 hover:text-neutral-50"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <button className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-md flex items-center justify-center">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Category Management</h2>

            {/* Add Category Form */}
            <Formik
              initialValues={form_initial_value}
              validationSchema={form_validation}
              onSubmit={is_edit ? editCategory : addCategory}
              enableReinitialize={true}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8">
                  <h3 className="text-lg font-semibold mb-4">{`${btn_change} Category`}</h3>
                  <div className="mb-3">
                    <Field
                      as={Input}
                      id="title"
                      name="title"
                      placeholder="Enter category title"
                      className="mb-1"
                    />
                    {errors.title && touched.title && (
                      <div className="text-sm text-red-500 mb-1">
                        {errors.title}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <Field
                      as={Textarea}
                      id="description"
                      name="description"
                      placeholder="Write something about your category"
                      className="mb-1"
                    />
                    {errors.description && touched.description && (
                      <div className="text-sm text-red-500 mb-1">
                        {errors.description}
                      </div>
                    )}
                  </div>
                  <Button type="submit" disabled={isSubmitting}>
                    <PlusCircle className="mr-2 h-4 w-4" />{" "}
                    {`${btn_change} Category`}
                  </Button>
                </Form>
              )}
            </Formik>

            {/* Added Categories */}
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4">Added Categories</h3>
              <Accordion
                type="single"
                collapsible
                className="w-full border rounded-md"
              >
                {categories.map((category) => (
                  <AccordionItem
                    key={category._id}
                    value={category._id}
                    className="px-3 py-1"
                  >
                    <div className="flex justify-between px-2 items-center">
                      <AccordionTrigger className="text-base p-2 flex gap-3">
                        {category.title}
                      </AccordionTrigger>
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handle_edit_category(category)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => category.status ? handle_category_delete(category) : handle_category_listing(category) }
                        >
                          {category.status ? (
                            <Delete className="h-4 w-4" />
                          ) : (
                            <CirclePlus className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <AccordionContent>
                      <p className="mb-4">{category.description}</p>
                      <Formik
                        initialValues={sub_form_initial_value}
                        validationSchema={form_validation}
                        onSubmit={(values) =>
                          is_sub_edit
                            ? edit_subcategory(category._id, values)
                            : addSubcategory(category._id, values)
                        }
                        enableReinitialize={true}
                      >
                        {({ errors, touched, isSubmitting }) => (
                          <Form className="space-y-4 mb-1">
                            <div className="mb-3">
                              <Field
                                as={Input}
                                id="title"
                                name="title"
                                placeholder="Enter subcategory title"
                              />
                              {errors.title && touched.title && (
                                <div className="text-sm text-red-500 mb-1">
                                  {errors.title}
                                </div>
                              )}
                            </div>
                            <div className="mb-4">
                              <Field
                                as={Textarea}
                                id="description"
                                name="description"
                                placeholder="Write something about your subcategory"
                              />
                              {errors.description && touched.description && (
                                <div className="text-sm text-red-500 mb-1">
                                  {errors.description}
                                </div>
                              )}
                            </div>
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="mb-2"
                            >
                              <PlusCircle className="mr-2 h-4 w-4" />{" "}
                              {`${is_sub_btn_change}
                              Subcategory`}
                            </Button>
                          </Form>
                        )}
                      </Formik>
                      {category.sub_category.map((subcategory) => (
                        <div
                          key={subcategory._id}
                          className="mb-4 p-4 border rounded-md"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold">
                              {subcategory.title}
                            </h4>
                            <div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handle_edit_Sub_category(subcategory)
                                }
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  subcategory.status
                                    ? handle_sub_category_unlist(
                                        subcategory,
                                        category._id
                                      )
                                    : handle_sub_category_listing(
                                        subcategory,
                                        category._id
                                      )
                                }
                              >
                                {subcategory.status ? (
                                  <Delete className="h-4 w-4" />
                                ) : (
                                  <CirclePlus className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                          <p>{subcategory.description}</p>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">CourseCloud</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Teach in Company
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Ratings
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Career
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    More
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Terms & Conditions</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Cookie settings
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>
              &copy; {new Date().getFullYear()} CourseCloud. All rights reserved
              by LMS company.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
