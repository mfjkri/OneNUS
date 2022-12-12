import { axios } from "lib/axios";

import { CreatePostReponse } from "../types";

export type NewPostDetails = {
  title: string;
  tag: string;
  text: string;
};

export const createPost = (
  data: NewPostDetails
): Promise<CreatePostReponse> => {
  return axios.post("/posts/create", data);
};
