export type EditProps = {
  id: string;
  avatar: string;
  name: string;
  content: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};
