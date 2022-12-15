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

type PostPreviewProps = {
  postEntry: Post;
  entryIndex: number;
};

export const PostPreview = ({ postEntry }: PostPreviewProps) => {
  // TODO Make column spacing fixed and truncuate text
  let rowClasses =
    "px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap truncate max-w-2xl text-primary dark:text-secondary ";

  return (
    <>
      <td key="title" className={rowClasses}>
        <Link to={`./${postEntry.id}`}>
          <u className="hover:text-accent text-primary dark:text-secondary dark:hover:text-accent">
            {postEntry.title}
          </u>
        </Link>
      </td>
      <td key="author" className={rowClasses + "text-center"}>
        {postEntry.author}
      </td>
      <td key="commentsCount" className={rowClasses + "text-center"}>
        {postEntry.commentsCount}
      </td>
      <td key="commentedAt" className={rowClasses + "text-center"}>
        {postEntry.commentedAt
          ? UTCEpochToLocalDate(postEntry.commentedAt)
          : "-"}
      </td>
      <td key="tag" className={rowClasses + "text-center"}>
        {postEntry.tag}
      </td>
    </>
  );
};
