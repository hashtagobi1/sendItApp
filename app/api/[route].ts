import { prisma } from "@/db";
import { NextApiRequest } from "next";

export async function GET(req: Request, res: Response) {
  const url = await req.url.split("/");
  const lastSegment = url.pop() || url.pop();
  // Get Data
  try {
    const data = await prisma.post.findUnique({
      where: {
        id: lastSegment,
      },
      include: {
        author: true,
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    return new Response("Error fetching posts", {
      status: 403,
    });
  }
}
