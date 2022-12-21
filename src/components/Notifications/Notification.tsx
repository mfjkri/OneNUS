import { Fragment, useEffect, useState } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Alert } from "@material-tailwind/react";

import { delay } from "utils/delay";

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

const default_ttl = {
  info: 2500,
  success: 1500,
  error: 3000,
  warning: 3000,
};

export type NotificationProps = {
  notification: {
    id: string;
    type: keyof typeof icons;
    title: string;
    message?: string;
    ttl?: number;
  };
  onDismiss: (id: string) => void;
};

export const Notification = ({
  notification: { id, type, title, message, ttl = default_ttl[type] },
  onDismiss,
}: NotificationProps) => {
  const [show, setShow] = useState(true);

  async function dismissNotification() {
    setShow(false);
    await delay(200);
    onDismiss(id);
  }

  const getColor = (type: keyof typeof icons) => {
    return type === "error"
      ? "deep-orange"
      : type === "warning"
      ? "amber"
      : type === "success"
      ? "green"
      : "light-blue";
    // return colors[type] || undefined;
  };

  useEffect(() => {
    setTimeout(() => {
      dismissNotification();
    }, ttl);
    //eslint-disable-next-line
  }, [onDismiss, id, ttl]);

  return (
    <Fragment>
      <Alert
        color={getColor(type)}
        className="pointer-events-auto"
        show={show}
        animate={{
          mount: { y: 0 },
          unmount: { y: -100 },
        }}
        icon={icons[type]}
        dismissible={{
          onClose: () => dismissNotification(),
        }}
      >
        <b>{title}</b> : {message}
      </Alert>
    </Fragment>
  );
};
