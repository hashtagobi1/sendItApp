import React from "react";

const Loading = () => {
  return (
    <div className="h-28 border-2 border-gray-300 p-4 rounded-md mt-16  ">
      <div className="flex animate-pulse flex-row  h-full space-x-5">
        <div className="w-12 justify-center mt-1 bg-gray-400 h-12 rounded-full "></div>
        <div className="flex flex-col space-y-3">
          <div className="w-full bg-gray-400 h-8 rounded-md "></div>
          <div className="w-32 bg-gray-400 h-6 rounded-md "></div>
          <div className="w-24 bg-gray-400 h-4 rounded-md "></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
