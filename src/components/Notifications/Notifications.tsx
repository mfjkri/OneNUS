import { useAppSelector, useAppDispatch } from "hooks/typedRedux";

import { Notification } from "./Notification";
import { dismissNotification } from "./notificationSlices";

/*
Notifications component.
This component creates Notification components and is maanged by the NotificationsStore.

Attributes:
  None
*/
export const Notifications = () => {
  const notifications = useAppSelector((state) => state.notifications.notifs);

  const dispatch = useAppDispatch();
  const dismiss = (id: number) => dispatch(dismissNotification(id));

  return (
    <div
      aria-live="assertive"
      className="z-50 flex flex-col fixed inset-0 space-y-4 items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
    >
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          onDismiss={dismiss}
          {...notification}
        />
      ))}
    </div>
  );
};
