"use client";

import { UserPosts } from "@/types/UserPosts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loading from "../components/Loading";
import EditPost from "./EditPost";
import PostCard from "../components/PostCard";

const userPosts = async () => {
  const response = await axios.get("api/posts/getUserPosts");
  return response.data;
};

const MyPosts = () => {
  const { data, error, isLoading } = useQuery<UserPosts>({
    queryFn: userPosts,
    queryKey: ["userPosts"],
  });
  //   TODO: make this look sexier
  if (isLoading) {
    return (
      <div className="">
        <Loading />
        <Loading />
        <Loading />
      </div>
    );
  }
  console.log({ data });
  return (
    <div>
      {data?.post.map((post, i) => {
        return (
          <PostCard
            name={data.name}
            comments={post.comments}
            content={post.title}
            image={data.image}
            id={post.id}
            key={post.id}
            isUserPost={true}
          />
        );
      })}
    </div>
  );
};

export default MyPosts;
