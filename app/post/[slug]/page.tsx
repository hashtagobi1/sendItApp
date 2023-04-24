"use client";

import React from "react";
import PostCard from "@/app/components/PostCard";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@/types/Posts";
import axios from "axios";
import Loading from "@/app/components/Loading";
import { PostType } from "@/types/PostType";
import AddComment from "@/app/components/AddComment";

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`api/posts/${slug}`);
  return response.data;
};

const PostDetail = ({ params }: { params: { slug: string } }) => {
  const { data, isLoading } = useQuery<PostType>({
    queryFn: async () => fetchDetails(params.slug),
    queryKey: ["getPostFromSlug"],
  });
  console.log({ data });
  console.log({ slug: params.slug });

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
        </div>
      ) : null}
    </div>
  );
};

export default PostDetail;
