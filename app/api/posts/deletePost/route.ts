import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/db";
import { getServerSession } from "next-auth/next";

export async function POST(req: Request, res: Response) {
  const body: { id: string } = await req.json();
  const postID = body.id;
  // console.log({ postID });

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
    console.log({ result });
    return new Response(`Result: `, {
      status: 200,
    });
  } catch (error) {
    console.log({ error });
    return new Response("Error occured whilst deleting post", {
      status: 403,
    });
  }
}

// * this works
// http://localhost:3000/post/clgqijrr50001lztq45qvl1kz
