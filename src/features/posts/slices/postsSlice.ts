import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

import { POSTS_PER_PAGE } from "config";

import { SortTypes } from "../types";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    pageNumber: 1,
    perPage: POSTS_PER_PAGE,
    filterTag: "-",
    sortBy: SortTypes[SortTypes.ByNew],
  },
  reducers: {
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload;
    },
    setFilterTag: (state, action: PayloadAction<string>) => {
      state.filterTag = action.payload;
    },
    setSortby: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setPageNumber, setPerPage, setFilterTag, setSortby } =
  postsSlice.actions;
export const postReducer = postsSlice.reducer;
