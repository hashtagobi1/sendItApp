import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import MyPosts from "./MyPosts";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("api/auth/signin");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome back {session?.user?.name}</h1>
      <MyPosts />
    </div>
  );
};

export default Dashboard;
