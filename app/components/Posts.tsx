"use client";

import { Post } from "@/types/Posts";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import PostCard from "./PostCard";

const Posts: FC<{
  postData: Post;
}> = ({ postData }) => {
  return (
    <PostCard
      id={postData.id}
      comments={postData.comments}
      image={postData.author.image}
      name={postData.author.name}
      isUserPost={false}
      content={postData.title}
    />
  );
};

export default Posts;
