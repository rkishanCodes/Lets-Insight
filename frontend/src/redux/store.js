import { configureStore } from "@reduxjs/toolkit";
import descriptiveAnalysisReducer from "./slices/descriptiveAnalysisSlice";
import exploratoryDataAnalysisReducer from "./slices/exploratoryDataAnalysisSlice";

import csvReducer from "./slices/csvSlice";

const store = configureStore({
  reducer: {
    descriptiveAnalysis: descriptiveAnalysisReducer,
    exploratoryDataAnalysis: exploratoryDataAnalysisReducer,
    csv: csvReducer,
  },
});

export default store;
