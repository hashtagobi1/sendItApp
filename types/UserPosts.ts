import { Comments } from "./Posts";
export type UserPosts = {
  email: string;
  id: string;
  image: string;
  name: string;
  post: {
    createdAt: string;
    id: string;
    title: string;
    comments?: Comments[];
  }[];
};
