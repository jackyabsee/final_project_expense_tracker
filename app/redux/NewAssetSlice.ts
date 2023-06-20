import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NewAssetState {
  data: any[];
}

const initialState: NewAssetState = {
  data: [],
};

const newAssetSlice = createSlice({
  name: "newAsset",
  initialState: initialState,
  reducers: {
    addItem(state: NewAssetState, action: PayloadAction<any>) {
      state.data.push(action.payload);
    },
  },
});

export const { addItem } = newAssetSlice.actions;
export const newAssestReducer = newAssetSlice.reducer;
