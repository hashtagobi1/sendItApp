"use client";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import React, { FC } from "react";

const Login: FC<{ session?: Session | null }> = ({ session }) => {
  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    signIn();
  };
  return (
    <li className="list-none">
      <button
        onClick={(e) => handleSignIn(e)}
        className="text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25"
      >
        Login
      </button>
    </li>
  );
};

export default Login;
