"use client";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { FC } from "react";

const Login: FC<{ session?: Session | null }> = ({ session }) => {
  return (
    <li className="list-none">
      <button
        onClick={() => signIn()}
        className="text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25"
      >
        Login
      </button>
    </li>
  );
};

export default Login;
