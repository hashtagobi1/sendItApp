import React from "react";
import Link from "next/link";
import Login from "./Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Logged from "./Logged";
import Image from "next/image";

const Nav = async () => {
  // * used to protect back_end routes
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center py-8">
      <Link href="/" className="flex justify-center items-center">
        <h1 className="font-bold text-lg mr-3">Send it!</h1>

        <Image
          src="/images/paper_plane.png"
          alt="logo"
          width={32}
          height={32}
        />
      </Link>

      <ul className="flex items-center gap-6">
        {session ? <Logged session={session} /> : <Login session={session} />}
      </ul>

    </nav>
  );
};

export default Nav;
