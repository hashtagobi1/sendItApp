"use client";

import axios from "axios";
import AddPost from "./components/AddPost";
import { useQuery } from "@tanstack/react-query";
import Posts from "./components/Posts";
import { Post } from "@/types/Posts";

const allPosts = async () => {
  const response = await axios.get("api/posts/getPost");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<Post[]>({
    queryFn: allPosts,
    queryKey: ["allPosts"],
  });

  if (error) return console.log(error);
  if (isLoading) return "Loading...";

  console.log(data);
  return (
    <main className="">
      <AddPost />
      {data
        ? data.map((post, id) => <Posts key={post.id} postData={post} />)
        : null}
    </main>
  );
}
