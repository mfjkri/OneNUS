import { Table } from "components/Elements";

import { MockUser, PostsData } from "mock/posts";

export const PostsList = () => {
  return (
    <Table<MockUser>
      data={PostsData}
      columns={[
        {
          title: "Username",
          field: "username",
        },
        {
          title: "ID",
          field: "id",
        },
      ]}
    />
  );
};
