import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChart: null,
  title: "",
  xAxis: "",
  yAxis: "",
  backgroundColor: "rgba(75, 192, 192, 0.2)",
  borderColor: "rgba(75, 192, 192, 1)",
};

const descriptiveAnalysisSlice = createSlice({
  name: "descriptiveAnalysis",
  initialState,
  reducers: {
    setSelectedChart: (state, action) => {
      state.selectedChart = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setXAxis: (state, action) => {
      state.xAxis = action.payload;
    },
    setYAxis: (state, action) => {
      state.yAxis = action.payload;
    },
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
    setBorderColor: (state, action) => {
      state.borderColor = action.payload;
    },
  },
});

export const {
  setSelectedChart,
  setTitle,
  setXAxis,
  setYAxis,
  setBackgroundColor,
  setBorderColor,
} = descriptiveAnalysisSlice.actions;

export default descriptiveAnalysisSlice.reducer;
