import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/db";
import { getServerSession } from "next-auth/next";

export async function POST(req: Request, res: Response) {
  const body: { id: string } = await req.json();
  const postID = body.id;

  const session = await getServerSession(authOptions);
  const user = await getServerSession(authOptions);
  if (!session || !user)
    return new Response("Please sign in to make a post!", {
      status: 401,
    });

  try {
    const result = await prisma.post.delete({
      where: {
        id: postID,
      },
    });
    return new Response(`Result: ${result}`, {
      status: 200,
    });
  } catch (error) {
    return new Response("Error occured whilst deleting post", {
      status: 403,
    });
  }
}
