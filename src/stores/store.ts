import { configureStore } from "@reduxjs/toolkit";

import { postsReducer } from "features/posts";
import { commentsReducer } from "features/comments";
import { usersReducer } from "features/users";
import { notificationsReducer } from "components/Notifications";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
