import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/db";
import { getServerSession } from "next-auth/next";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { comment, id }: any = body.commentData;
  const session = await getServerSession(authOptions);
  const user = await getServerSession(authOptions);
  // Get User
  const prismaUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
  });
  if (!session || !user)
    return new Response("Please sign in to make a comment!", {
      status: 401,
    });

  // ? VALIDATION
  if (comment.length > 300)
    return new Response("The character limit is 300!", {
      status: 403,
    });
  if (comment.length === 0)
    return new Response("Cannot leave comment blank!", {
      status: 401,
    });

  // Add Comment
  if (prismaUser) {
    try {
      const result = await prisma.comment.create({
        data: {
          content: comment,
          userId: prismaUser.id,
          postId: id,
        },
      });
      return new Response(`Comment Created ${JSON.stringify(result)}`);
    } catch (error) {
      return new Response("Error occured whilst creating post", {
        status: 403,
      });
    }
  }
}
