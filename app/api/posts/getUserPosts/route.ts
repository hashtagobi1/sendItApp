import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/db";
import { getServerSession } from "next-auth/next";

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  const user = await getServerSession(authOptions);
  if (!session || !user)
    return new Response("Please sign in to make a post!", {
      status: 401,
    });
  // Get User Post
  try {
    if (session.user?.email) {
      const data = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
        include: {
          post: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              comments: true,
            },
          },
        },
      });
      return new Response(JSON.stringify(data), {
        status: 200,
      });
    }
  } catch (error) {
    return new Response("Error occured whilst getting your posts", {
      status: 403,
    });
  }
}
