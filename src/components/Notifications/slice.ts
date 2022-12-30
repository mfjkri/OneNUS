import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

export type Notif = {
  id: number;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message?: string;
  ttl?: number;
};

type InitState = {
  notifs: Notif[];
  currId: number;
};

const initState: InitState = { notifs: [], currId: 0 };

const notificationSlice = createSlice({
  name: "notifications",
  initialState: initState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notif, "id">>) => {
      state.notifs.push({ id: state.currId, ...action.payload });
      state.currId += 1;
    },
    dismissNotification: (state, action: PayloadAction<number>) => {
      state.notifs = state.notifs.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const { addNotification, dismissNotification } =
  notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
