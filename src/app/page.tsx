"use client";

import BlogPost from "@/components/BlogPost";
import NewsLetters from "@/components/NewsLetters";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface postProps {
  title: string;
  description: string;
  tags: string[];
  likes: number;
  views: number;
}

export default function Home() {
  const [ count , setcount ] = useState<number>(0);
  const [data, setdata] = useState<postProps[]>([]);
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setloading(true);

      try {
        const res = await axios.get("http://localhost:3000/api/user-post");
        setdata(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    fetchData();
    setcount((prev)=> prev+1)
  }, []);
  console.log(count);

  return (
    <div className="">
      <section className="grid md:grid-cols-3 grid-cols-1 gap-4 p-4  py-10">
        {data?.map((post, key) => (
          <div  >
            <BlogPost
            key={key}
              title={post.title}
              description={post.description}
              likes={post.likes}
              views={post.views}
              tags={post.tags}
            />
          
          </div>
        ))}
      </section>

      {/* news letter */}

      <section>
        {/* <NewsLetters/> */}
      </section>






    </div>
  );
}
