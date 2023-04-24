"use client";

import React from "react";
import PostCard from "@/app/components/PostCard";
import { useQuery } from "@tanstack/react-query";
import { Comments, Post } from "@/types/Posts";
import axios from "axios";
import Loading from "@/app/components/Loading";
import { PostType } from "@/types/PostType";
import AddComment from "@/app/components/AddComment";
import Image from "next/image";

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`api/posts/${slug}`);
  return response.data;
};

const PostDetail = ({ params }: { params: { slug: string } }) => {
  const { data, isLoading } = useQuery<PostType>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(params.slug),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="">
      {data ? (
        <div>
          <PostCard
            isUserPost={false}
            id={data?.id}
            content={data?.title}
            image={data.author.image}
            name={data.author.name}
            comments={data.comments}
            isComments={true}
          />
          <AddComment id={data?.id} />

          {data.comments?.map((comment, i) => {
            return (
              <div key={comment?.id} className="my-6 bg-white p-8 rounded-md">
                <div className="flex items-center gap-2">
                  <Image
                    width={24}
                    height={24}
                    src={comment?.user?.image}
                    alt="avatar"
                  />
                  <h3 className="font-bold">{comment?.user?.name}</h3>
                  <h3 className="text-sm">{comment?.createdAt}</h3>
                </div>
                <div className="border my-4 border-gray-400/20 rounded-md p-4">
                  <p className="">{comment.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default PostDetail;
