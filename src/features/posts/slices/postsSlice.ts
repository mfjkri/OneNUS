import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

import { DefaultSortOrder, SortOrderTypes } from "components/Pagination";
import { POSTS_PER_PAGE } from "config";

import { PostSortOptions } from "../types";

export type PostsStateProps = {
  pageNumber: number;
  perPage: number;
  filterTag: string;
  sortOption: string;
  sortOrder: SortOrderTypes;
};

const initState: PostsStateProps = {
  pageNumber: 1,
  perPage: POSTS_PER_PAGE,
  filterTag: "-",
  sortOption: PostSortOptions.defaultOption,
  sortOrder: DefaultSortOrder,
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initState,
  reducers: {
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    resetPageNumber: (state) => {
      state.pageNumber = initState.pageNumber;
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload;
    },
    setFilterTag: (state, action: PayloadAction<string>) => {
      state.filterTag = action.payload;
    },
    setSortOption: (state, action: PayloadAction<string>) => {
      state.sortOption = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<SortOrderTypes>) => {
      state.sortOrder = action.payload;
    },
    toggleSortOrder: (state) => {
      state.sortOrder =
        state.sortOrder === SortOrderTypes.ascending
          ? SortOrderTypes.descending
          : SortOrderTypes.ascending;
    },
    resetSortOrder: (state) => {
      state.sortOrder = initState.sortOrder;
    },
    resetState: (state) => {
      return initState;
    },
  },
});

export const {
  setPageNumber,
  resetPageNumber,
  setPerPage,
  setFilterTag,
  setSortOption,
  setSortOrder,
  toggleSortOrder,
  resetSortOrder,
  resetState,
} = postsSlice.actions;
export const postReducer = postsSlice.reducer;
