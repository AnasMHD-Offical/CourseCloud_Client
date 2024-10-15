import axios from "axios";

//Configuring the base url of CourseCloud server API
export const axios_instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers:{
    "Content-Type":"application/json"
  }
});

