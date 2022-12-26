import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

import { DefaultSortOrder, SortOrderTypes } from "components/Pagination";
import { COMMENTS_PER_PAGE } from "config";

import { CommentSortOptions } from "../types";

const initState = {
  pageNumber: 1,
  perPage: COMMENTS_PER_PAGE,
  sortOption: CommentSortOptions.defaultOption,
  sortOrder: DefaultSortOrder,
};

const commentsSlice = createSlice({
  name: "comments",
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
  setSortOption,
  setSortOrder,
  toggleSortOrder,
  resetSortOrder,
  resetState,
} = commentsSlice.actions;
export const commentReducer = commentsSlice.reducer;
