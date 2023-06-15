import { HomeData } from "../api/types";
import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
export type HomeDataState = {
  selectedData?: HomeData;
};

const initialState: HomeDataState = {};

export const homeDataSlice = createSlice({
  name: "homeData",
  initialState,
  reducers: {
    setSelectedData: (
      state: HomeDataState,
      action: PayloadAction<HomeData>
    ) => {
      state.selectedData = action.payload;
    },
  },
});

export const { setSelectedData } = homeDataSlice.actions;
export const homeDataReducer = homeDataSlice.reducer;

export const store = configureStore({
  reducer: {
    homeData: homeDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
