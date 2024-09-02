import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  csvData: [],
  headers: [],
};

export const csvSlice = createSlice({
  name: "csv",
  initialState,
  reducers: {
    setCsvData: (state, action) => {
      state.csvData = action.payload.data;
      state.headers = action.payload.headers;
    },
  },
});

export const { setCsvData } = csvSlice.actions;

// Async action creator using Redux Thunk
export const setCsvDataAsync =
  ({ data, headers }) =>
  (dispatch) => {
    dispatch(setCsvData({ data, headers }));
  };

export default csvSlice.reducer;
