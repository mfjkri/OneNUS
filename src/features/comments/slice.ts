import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

import { DefaultSortOrder, SortOrderTypes } from "components/Pagination";
import { COMMENTS_PER_PAGE } from "config";

import { CommentSortOptions } from "./types";

export type CommentsStateProps = {
  perPage: number;
  sortOption: string;
  sortOrder: SortOrderTypes;
};

const initState: CommentsStateProps = {
  perPage: COMMENTS_PER_PAGE,
  sortOption: CommentSortOptions.defaultOption,
  sortOrder: DefaultSortOrder,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState: initState,
  reducers: {
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
  setPerPage,
  setSortOption,
  setSortOrder,
  toggleSortOrder,
  resetSortOrder,
  resetState,
} = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
