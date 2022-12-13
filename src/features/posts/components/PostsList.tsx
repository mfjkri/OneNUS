import { Post } from "../types";
import { PostPreview } from "./PostPreview";

export const PostsList = ({ posts }: { posts: Post[] }) => {
  const columnClasses =
    "px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-center ";

  return (
    <div className="flex flex-col">
      <div className="-my-2 sm:-mx-6 lg:-mx-8">
        <div className="inline-block w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-auto border-b border-primary2 shadow sm:rounded-lg">
            <table className="table-auto min-w-full divide-y bg-secondary">
              <thead className="bg-primary">
                <tr>
                  <th key="title" scope="col" className={columnClasses}></th>
                  <th key="author" scope="col" className={columnClasses}>
                    Author
                  </th>
                  <th key="commentsCount" scope="col" className={columnClasses}>
                    Replies
                  </th>
                  <th key="commentedAt" scope="col" className={columnClasses}>
                    Last Commented
                  </th>
                  <th key="tag" scope="col" className={columnClasses}>
                    Tags
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((entry: Post, entryIndex: number) => (
                  <tr
                    key={entry?.id || entryIndex}
                    className="odd:bg-white even:bg-gray-100"
                  >
                    {<PostPreview postEntry={entry} entryIndex={entryIndex} />}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
