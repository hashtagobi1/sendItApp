import { Comments } from "./Posts";

export type PostType = {
  id: string;
  title: string;
  updatedAt?: string;
  author: {
    email: string;
    id: string;
    image: string;
    name: string;
  };
  comments: Comments[];
};
