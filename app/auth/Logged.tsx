"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { FC } from "react";
import { Session } from "next-auth";

const Logged: FC<{ session?: Session | null }> = ({ session }) => {
  return (
    <li className="flex gap-8 items-center">
      <p className="mr-4">Welcome {session?.user?.name}</p>
      <button
        onClick={() =>
          signOut({
            callbackUrl: "http://localhost:3000/",
          })
        }
        className="bg-gray-700 text-white text-sm px-6 py-2 "
      >
        Sign Out
      </button>
      <Link className="" href={"/dashboard"}>
        <Image
          alt={`profile picture for ${session?.user?.name}`}
          width={50}
          className="rounded-full w-14  hover:shadow-2xl"
          height={50}
          src={session?.user?.image ?? ""}
        />
      </Link>
    </li>
  );
};

export default Logged;
