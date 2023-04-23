"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import { EditProps } from "@/types/EditPost";
import Toggle from "./Toggle";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const EditPost: FC<EditProps> = ({ avatar, content, id, name, comments }) => {
  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div>
          <Image priority width={32} height={32} src={avatar} alt={avatar} />
          <h3 className="font-bold text-gray-700">{name}</h3>
          <div className="my-8">
            <p className="break-all">{content}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPost;
