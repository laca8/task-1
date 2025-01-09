import { configureStore } from "@reduxjs/toolkit";
import doctorSlice from "./slicer/doctorSlicer";
const store = configureStore({
  reducer: {
    doctorSlice: doctorSlice,
  },
});
export default store;
