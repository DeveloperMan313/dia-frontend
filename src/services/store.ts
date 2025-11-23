import { configureStore } from "@reduxjs/toolkit";
import reducer from "./lampsSlice";

export default configureStore({
  reducer: reducer,
});
