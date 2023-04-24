import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/db";
import { getServerSession } from "next-auth/next";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  console.log(body);
  const { post_comment, post_id }: any = body.data;

  const session = await getServerSession(authOptions);
  const user = await getServerSession(authOptions);
  if (!session || !user)
    return new Response("Please sign in to make a comment!", {
      status: 401,
    });

  return new Response("Ok", {
    status: 200,
  });

  // ? VALIDATION
  if (post_comment.length > 300)
    return new Response("The character limit is 300!", {
      status: 403,
    });
  if (post_comment.length === 0)
    return new Response("Please do not leave empty!", {
      status: 401,
    });

  // Get User
  const prismaUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  // Add Comment
  if (prismaUser) {
    try {
      const result = prisma.comment.create({
        data: {
          content: post_comment,
          userId: prismaUser.id,
          postId: post_id,
        },
      });
      return new Response(`Comment Created ${result}`);
    } catch (error) {
      return new Response("Error occured whilst creating post", {
        status: 403,
      });
    }
  }
}
