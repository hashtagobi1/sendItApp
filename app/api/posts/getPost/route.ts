import { prisma } from "@/db";

export async function GET(req: Request, res: Response) {
  // Get Data
  try {
    const data = await prisma.post.findMany({
      include: {
        author: true,
        comments: true,
        _count: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log({ data });

    return new Response(JSON.stringify(data));
  } catch (error) {
    console.log(error);
    return new Response("Error fetching posts", {
      status: 403,
    });
  }
}
