"use client";

import { UserPosts } from "@/types/UserPosts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loading from "../components/Loading";
import EditPost from "./EditPost";
import PostCard from "../components/PostCard";
import Link from "next/link";

const userPosts = async () => {
  const response = await axios.get("api/posts/getUserPosts");
  return response.data;
};

const MyPosts = () => {
  const { data, error, isLoading } = useQuery<UserPosts>({
    queryFn: userPosts,
    queryKey: ["getUserPosts"],
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
  return (
    <div>
      {data ? (
        data?.post?.length > 0 ? (
          data?.post.map((post, i) => {
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
          })
        ) : (
          <div className="flex flex-col justify-center items-center">
            <h1 className="mt-20 text-2xl">You haven't posted anything!</h1>
            <Link href="/">
              <button className="underline my-10 cursor-pointer bg-white text-black px-4 py-2 rounded-lg ">Make a post</button>
            </Link>
          </div>
        )
      ) : null}
    </div>
  );
};

export default MyPosts;
