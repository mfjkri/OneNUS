import { configureStore } from "@reduxjs/toolkit";

import { postReducer } from "features/posts";
import { commentReducer } from "features/comments/slices";
import { notificationReducer } from "components/Notifications";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    comments: commentReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
