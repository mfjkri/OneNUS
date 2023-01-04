import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

export type UsersStateProps = {
  starredPosts: number[];
};

const initState: UsersStateProps = {
  starredPosts: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState: initState,
  reducers: {
    setStarredPosts: (state, action: PayloadAction<number[]>) => {
      state.starredPosts = action.payload;
    },
    starPost: (state, action: PayloadAction<number>) => {
      state.starredPosts.push(action.payload);
    },
    unstarPost: (state, action: PayloadAction<number>) => {
      state.starredPosts.filter((postId: number) => postId !== action.payload);
    },
  },
});

export const { setStarredPosts, starPost, unstarPost } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
