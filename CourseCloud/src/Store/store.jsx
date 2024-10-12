//importing ES modules 
import { configureStore } from "@reduxjs/toolkit";

//Configuring redux store
const store = configureStore({
    reducer: ()=>{}
})

//Exporting store and use it in the main for global access.
export default store