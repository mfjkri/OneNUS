import { useAppSelector, useAppDispatch } from "hooks/typedRedux";

import { Notification } from "./Notification";
import { dismissNotification } from "./slice";

/*
Notifications component.
This component creates each Notification component and listens to 
notifications state in redux store.

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

/*
Usage (adding notification)

import { addNotification } from "components/Notifications";
...
newNotification = {type: ..., title: ...,message: ...}


1) Within a React component:
  import { useAppDispatch } from "hooks/typedRedux";
  ...
  const dispatch = useAppDispatch();
  dispatch(addNotification(newNotification));


2) Outside of React a component:
  import {store} from "stores/store"; 
  ...
  store.dispatch(addNotification(newNotification);
*/
