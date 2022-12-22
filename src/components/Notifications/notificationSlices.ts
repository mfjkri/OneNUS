import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { nanoid } from "nanoid";

export type NotificationProps = {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message?: string;
  ttl?: number;
};

type InitState = {
  notifications: NotificationProps[];
};

const initState: InitState = { notifications: [] };

const notificationSlices = createSlice({
  name: "notifications",
  initialState: initState,
  reducers: {
    addNotification: (
      state,
      action: PayloadAction<Omit<NotificationProps, "id">>
    ) => {
      state.notifications.push({ id: nanoid(), ...action.payload });
    },
    dismissNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const { addNotification, dismissNotification } =
  notificationSlices.actions;
export const notificationReducer = notificationSlices.reducer;
