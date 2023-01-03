import { Fragment, useCallback, useEffect, useState } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Alert } from "@material-tailwind/react";
import { color } from "@material-tailwind/react/types/components/alert";

import { delay } from "utils/delay";

import { Notif } from "./slice";

/*
Notification component. DO NOT USE THIS COMPONENT DIRECTLY!
*/

const icons = {
  info: (
    <InformationCircleIcon
      className="h-6 w-6 text-blue-100"
      aria-hidden="true"
    />
  ),
  success: (
    <CheckCircleIcon className="h-6 w-6 text-green-100" aria-hidden="true" />
  ),
  warning: (
    <ExclamationCircleIcon
      className="h-6 w-6 text-orange-600"
      aria-hidden="true"
    />
  ),
  error: <XCircleIcon className="h-6 w-6 text-red-100" aria-hidden="true" />,
};

const colors = {
  info: "light-blue",
  success: "green",
  error: "deep-orange",
  warning: "amber",
};

const default_ttl = {
  info: 2500,
  success: 1500,
  error: 3000,
  warning: 3000,
};

export type NotificationProps = Notif & {
  onDismiss: (id: number) => void;
};

export const Notification = ({
  id,
  type,
  title,
  message,
  ttl = default_ttl[type],
  onDismiss,
}: NotificationProps) => {
  const [show, setShow] = useState(true);

  const dismissNotification = useCallback(async () => {
    setShow(false);
    await delay(200);
    onDismiss(id);
  }, [id, onDismiss]);

  useEffect(() => {
    setTimeout(() => {
      dismissNotification();
    }, ttl);
  }, [dismissNotification, ttl]);

  return (
    <Fragment>
      <Alert
        color={colors[type] as color}
        icon={icons[type]}
        show={show}
        className="pointer-events-auto"
        dismissible={{
          onClose: () => dismissNotification(),
        }}
        animate={{
          mount: { y: 0 },
          unmount: { y: -100 },
        }}
      >
        <b>{title}</b> : {message}
      </Alert>
    </Fragment>
  );
};
