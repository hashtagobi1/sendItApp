export type Post = {
  title: string;
  id: string;
  createdAt: string;
  author: {
    name: string;
    image: string;
  };
  comments: Comments[];
};

export type Comments = {
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  };
};
