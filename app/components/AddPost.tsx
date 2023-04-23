"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";

const AddPost: FC<{}> = ({}) => {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  let toastPostID: string = "_DEFAULT";

  const { mutate } = useMutation(
    async (title: string) => {
      await axios.post("api/posts/addPost", {
        title,
      });
    },

    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data, {
            id: toastPostID,
          });
        }
        setIsDisabled(false);
        setIsLoading(false);
      },
      onSuccess: (data) => {
        setTitle("");
        setIsDisabled(false);
        setIsLoading(false);
        queryClient.invalidateQueries(["allPosts"]);
        toast.success("Post created 🔥!", {
          id: toastPostID,
        });
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    setIsLoading(true);
    mutate(title);
    toastPostID = toast.loading("Creating post...", { id: toastPostID });
  };

  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Whats on your mind?"
          className="p-4 text-lg rounded-md my-2 bg-gray-200 "
        ></textarea>
      </div>

      <div className="flex items-center justify-between gap-2 ">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >
          {`${title.length}`}/300
        </p>
        <button
          disabled={isDisabled}
          className="text-sm flex bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          {isLoading ? (
            <svg
              className={`${
                isLoading ? "animate-spin -ml-1 mr-3 h-5 w-5 text-white" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : null}
          {isLoading ? "Loading..." : "Create Post"}
        </button>
      </div>
    </form>
  );
};

export default AddPost;
