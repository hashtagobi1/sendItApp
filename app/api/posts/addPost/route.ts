import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/db";
import { getServerSession } from "next-auth/next";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const title: string = body.title;
  const session = await getServerSession(authOptions);
  const user = await getServerSession(authOptions);
  if (!session || !user)
    return new Response("Please sign in to make a post!", {
      status: 401,
    });

  // ? VALIDATION
  if (title.length > 300)
    return new Response("The character limit is 300!", {
      status: 403,
    });
  if (title.length === 0)
    return new Response("Please do not leave empty!", {
      status: 403,
    });

  // Get User
  const prismaUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  // Create Post
  if (prismaUser) {
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser.id,
        },
      });

      return new Response(`Result: ${result}`, {
        status: 200,
      });
    } catch (error) {
      return new Response("Error occured whilst creating post", {
        status: 403,
      });
    }
  }

  return new Response(`You sent a message that says: ${body.title}`, {});
}
