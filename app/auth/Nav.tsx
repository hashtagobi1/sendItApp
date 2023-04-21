import React from "react";
import Link from "next/link";
import Login from "./Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Logged from "./Logged";

const Nav = async () => {
  // * used to protect back_end routes
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center py-8">
      <Link href="/">
        <h1 className="font-bold text-lg">Send it!</h1>
      </Link>

      <ul className="flex items-center gap-6">
        {session ? <Logged session={session} /> : <Login session={session} />}
      </ul>
    </nav>
  );
};

export default Nav;
