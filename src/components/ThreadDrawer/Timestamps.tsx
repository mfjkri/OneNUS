import { Tooltip } from "@material-tailwind/react";
import moment from "moment";

import { UTCEpochToLocalDate } from "utils/format";

export type TimestampsProps = {
  createdAt: number;
  createdText?: string;
  updatedAt?: number;
  updatedText?: string;
};

export const Timestamps = ({
  createdAt,
  createdText = "created",
  updatedAt,
  updatedText = "updated",
}: TimestampsProps) => {
  return (
    <div className="text-xs text-right text-gray-700 dark:text-gray-400">
      <div className="flex flex-row">
        <div className="grow"></div>
        <div className="w-fit">
          <Tooltip
            content={`${createdText}: ${UTCEpochToLocalDate(createdAt)}`}
            className="bg-secondary dark:bg-primary text-primary dark:text-secondary text-xs"
          >
            <p>{`${createdText} ${moment.unix(createdAt).fromNow()}`} </p>
          </Tooltip>
        </div>
      </div>
      {updatedAt && createdAt !== updatedAt && (
        <div className="flex flex-row">
          <div className="grow"></div>
          <div className="w-fit">
            <Tooltip
              content={`last ${updatedText}: ${UTCEpochToLocalDate(updatedAt)}`}
              className="bg-secondary dark:bg-primary text-primary dark:text-secondary text-xs"
            >
              <p>last {`${updatedText} ${moment.unix(updatedAt).fromNow()}`}</p>
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
};
