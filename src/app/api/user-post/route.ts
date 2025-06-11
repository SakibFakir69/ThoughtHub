// app/api/user-post/route.ts

import { connctDB } from '@/lib/DB';
import Post from '@/lib/model/post';

export const GET = async () => {
  try {
    await connctDB(); // Ensure DB is connected

    const data = await Post.find({}).limit(6) // Fetch all posts
    console.log(data)

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
