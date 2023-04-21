"use client";

import { Post } from "@/types/Posts";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const Posts: FC<{
  postData: Post;
}> = ({ postData }) => {
  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        {postData.author.image ? (
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={postData.author.image}
            alt="avatar"
          />
        ) : (
          <div className="w-8 flex h-8  rounded-full  bg-blue-500"></div>
        )}
      </div>
      <h3 className="font-bold text-gray-700">{postData.author.name}</h3>
      <div className="my-8">
        <p className="break-all">{postData.title}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/posts/${postData.id}`}>
          <p className="text-sm font-bold text-gray-700">
            {postData.comments.length === 1
              ? `${postData.comments.length} Comment`
              : `${postData.comments.length} Comments`}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Posts;
