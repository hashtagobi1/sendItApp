"use client";

import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { Comments, Post } from "@/types/Posts";
import { TrashIcon } from "@heroicons/react/24/solid";
import Toggle from "../dashboard/Toggle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import moment from "moment";

const PostCard: FC<{
  image: string;
  name: string;
  content: string;
  id: string;
  comments?: any[];
  isUserPost?: boolean;
  isComments?: boolean;
  postData?: Post;
}> = ({
  image,
  name,
  content,
  id,
  comments,
  isComments,
  isUserPost = false,
  postData,
}) => {
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();
  let toastID = "toast";

  const { mutate } = useMutation(
    // "async (id: string) => await axios.delete(`/api/posts/deletePost?id=${id}`),"

    async (post_id: string) =>
      await axios.post("api/posts/deletePost", {
        id: post_id,
      }),
    {
      onError: (error) => {
        toast.error("Woops! there was an Error removing your post. 😖", {
          id: toastID,
        });
      },
      onSuccess: (data) => {
        toast.success("Poof! Your post has been deleted 🗑️", {
          id: toastID,
        });
        queryClient.invalidateQueries(["getAllPosts"]);
        queryClient.invalidateQueries(["getUserPosts"]);
      },
    }
  );

  const deletePost = () => {
    toast.loading("Deleting post... ⏳", {
      id: toastID,
    });
    mutate(id);
  };
  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex items-center gap-2">
          {image ? (
            <Image
              className="rounded-full"
              width={32}
              height={32}
              priority
              src={image}
              alt="avatar"
            />
          ) : (
            <div className="w-8 flex h-8  rounded-full  bg-blue-500"></div>
          )}
        </div>
        <div className="flex justify-between">
          <h3 className="font-bold my-2 text-gray-700">{name}</h3>
          <h3 className="text-sm">
            {moment(postData?.createdAt).format(
              "dddd, MMMM Do YYYY, h:mm:ss a"
            )}
          </h3>
        </div>
        <div className="my-8">
          <p className="break-all">{content}</p>
        </div>
        <div className="flex gap-4 cursor-pointer justify-between items-center">
          {/* {isComments ?? ( */}
          <Link
            href={{
              pathname: `/post/${id}`,
            }}
          >
            <p className="text-sm  font-bold text-gray-700">
              {comments?.length === 1
                ? `${comments?.length} Comment`
                : `${comments?.length} Comments`}
            </p>
          </Link>
          <Link
            href={{
              pathname: `/post/${id}`,
            }}
          >
            <h6 className="underline hover:cursor-pointer text-sm  font-bold text-gray-700">
              View Comments
            </h6>
          </Link>

          {/* )} */}
          {isUserPost ? (
            <button
              onClick={(e) => {
                setToggle(true);
              }}
              className="text-sm  flex  justify-between items-center font-bold py-1 px-4 rounded-lg  bg-gray-200 text-red-500"
            >
              <TrashIcon className="h-4 w-4 mr-3 " />
              Delete
            </button>
          ) : null}
        </div>
      </div>
      {toggle && (
        <Toggle id={id} deletePost={deletePost} setToggle={setToggle} />
      )}
    </>
  );
};

export default PostCard;
