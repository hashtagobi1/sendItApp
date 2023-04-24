"use client";

import React, { FC, use, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

type CommentData = {
  comment: string;
  id: string;
};

const AddComment: FC<{ id: string }> = ({ id }) => {
  const [comment, setComment] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  let toastID = "comments";

  // const { mutate } = useMutation(
  //   async (commentData: CommentData) => {
  //     await axios.post(`/api/posts/addComment`, {
  //       commentData,
  //     });
  //   },
  //   {
  //     onError: (error) => {
  //       console.log({ error });
  //       setIsLoading(false);
  //       setIsDisabled(false);
  //       if (error instanceof AxiosError) {
  //         toast.error(`Failed to add comment 🚫:  ${error.response?.data}`, {
  //           id: toastID,
  //         });
  //       }
  //     },
  //     onSuccess: (data) => {
  //       setComment("");
  //       setIsDisabled(false);
  //       setIsLoading(false);
  //       queryClient.invalidateQueries(["getPostFromSlug"]);
  //       toast.success("Comment Added ✅", { id: toastID });
  //     },
  //   }
  // );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    // setIsDisabled(true);
    // setIsLoading(true);
    toast.loading("Adding comment.... ⏳", { id: toastID });
    // mutate({
    //   comment,
    //   id,
    // });
  };
  return (
    <form className="my-8 ">
      <h3>Comments</h3>

      <div className="flex flex-col my-2">
        <input
          onChange={(e) => {
            setComment(e.target.value);
          }}
          value={comment}
          type="text"
          name="comment"
          className="p-4 text-lg rounded-md my-2"
        />
        <div className="flex items-center  justify-between gap-2">
          {/* <button
            disabled={isDisabled}
            onClick={submitComment}
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
            {isLoading ? "Loading..." : "Add Comment  💬"}
          </button> */}
          <button onClick={submitComment}>Click</button>
          <p
            className={`font-bold text-sm ${
              comment.length > 300 ? "text-red-700" : "text-gray-700"
            }`}
          >
            {`${comment.length}`}/300
          </p>
        </div>
      </div>
    </form>
  );
};

export default AddComment;
