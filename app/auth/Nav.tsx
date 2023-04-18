import React from "react";
import Link from "next/link";
import Login from "./Login";
type Props = {};

const Nav = async (props: Props) => {
  return (
    <nav className="flex justify-between items-center py-8">
      <Link href="/">
        <h1 className="font-bold text-lg">Send it!</h1>
      </Link>

      <ul className="flex items-center gap-6">
        <Login />
      </ul>
    </nav>
  );
};

export default Nav;
