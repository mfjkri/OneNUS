import { configureStore } from "@reduxjs/toolkit";
import { notificationReducer } from "components/Notifications";

import { postReducer } from "features/posts";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
