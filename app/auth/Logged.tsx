"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { FC } from "react";
import { Session } from "next-auth";

const Logged: FC<{ session?: Session | null }> = ({ session }) => {
  const handleSignOut = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut({
      callbackUrl: "http://localhost:3000/",
    });
  };
  return (
    <li className="flex gap-8 items-center">
      <Link href={"/dashboard"}>

      <button
        className="bg-teal-600 text-white rounded-xl text-sm px-6 py-2 "
        >
        See My Posts
      </button>
        </Link>
      <button
        onClick={(e) => handleSignOut(e)}
        className="bg-gray-700 text-white rounded-xl text-sm px-6 py-2 "
      >
        Sign Out
      </button>
      <Link className="" href={"/dashboard"}>
        <Image
        priority
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
