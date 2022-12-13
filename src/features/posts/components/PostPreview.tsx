import React from "react";

import { Link } from "components/Elements";

import { Post } from "../types";
import { UTCEpochToLocalDate } from "utils/format";

// type PostPreviewColumnsType = {
//   title: string;
//   author: string;
//   repliesCount: number;
//   updatedAt: number;
//   tag: string;
// };

export const PostPreview = ({
  postEntry,
  entryIndex,
}: {
  postEntry: Post;
  entryIndex: number;
}) => {
  // TODO Make column spacing fixed and truncuate text
  let rowClasses =
    "px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap truncate max-w-2xl ";

  if (entryIndex % 2 === 0) {
    rowClasses += "bg-secondary2 ";
  }

  return (
    <React.Fragment>
      <td key="Title0" className={rowClasses}>
        <Link to="">
          <u className="text-primary hover:text-accent">{postEntry.title}</u>
        </Link>
      </td>
      <td key="Author1" className={rowClasses + "text-center"}>
        {postEntry.author}
      </td>
      <td key="Replies2" className={rowClasses + "text-center"}>
        {postEntry.repliesCount}
      </td>
      <td key="Last Updated3" className={rowClasses + "text-center"}>
        {UTCEpochToLocalDate(postEntry.updatedAt)}
      </td>
      <td key="Tags4" className={rowClasses + "text-center"}>
        {postEntry.tag}
      </td>
    </React.Fragment>
  );
};
