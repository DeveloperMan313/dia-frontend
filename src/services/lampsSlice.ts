import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Lamp } from "../types";

const lampsSlice = createSlice({
  name: "lamps",
  initialState: {
    lamps: null as Lamp[] | null,
    filterName: "",
  },
  reducers: {
    setLamps(state, action: PayloadAction<Lamp[] | null>) {
      state.lamps = action.payload;
    },
    setFilterName(state, action: PayloadAction<string>) {
      state.filterName = action.payload;
    },
  },
});

export const useLamps = () =>
  useSelector(
    (state: ReturnType<typeof lampsSlice.getInitialState>) => state.lamps,
  );

export const useFilterName = () =>
  useSelector(
    (state: ReturnType<typeof lampsSlice.getInitialState>) => state.filterName,
  );

export const { setLamps, setFilterName } = lampsSlice.actions;

export default lampsSlice.reducer;
