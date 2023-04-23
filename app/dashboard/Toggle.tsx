"use client";

import React, { FC } from "react";

const Toggle: FC<{
  deletePost: () => void;
  setToggle: (toggle: boolean) => void;
  id: string;
}> = ({ deletePost, setToggle, id }) => {
  // console.log({ToDelete:id})
  return (
    <div
      onClick={(e) => {
        setToggle(false);
      }}
      className="fixed bg-black/50 w-full z-20 left-0 top-0 h-full"
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2 className="text-xl">
          Are you sure you want to delete this post? 😢
        </h2>

        <h3 className="text-red-600 text-sm opacity-75">
          This will permanently delete this post forever, like....
        </h3>
        <div className="flex justify-around">
          <button
            onClick={deletePost}
            className="bg-red-600 text-sm rounded-xl text-white py-2 px-4"
          >
            Delete Post
          </button>
          <button
            onClick={(e) => {
              setToggle(false);
            }}
            className="bg-gray-600 text-sm rounded-xl text-white py-2 px-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toggle;
