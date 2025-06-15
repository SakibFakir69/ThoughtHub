// app/api/user-post/route.ts

import { connctDB } from "@/lib/DB";
import Post from "@/lib/model/post";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connctDB(); // Ensure DB is connected

    const data = await Post.find({}).limit(6); // Fetch all posts
    console.log(data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("GET /api/user-post error:", error);

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

/// post

export const POST = async (request: Request, response: Response) => {
  try {
        await connctDB(); // Ensure DB is connected
    const data =await request.json();
    const newpost =await Post.create(data);
    console.log(newpost);

    

   return NextResponse.json({ message: "Post created", data: newpost},{status:201});
  } catch (error) {
    console.log(error);
  return  NextResponse.json({ message: "failed post created" },{status:500});
  }
};
