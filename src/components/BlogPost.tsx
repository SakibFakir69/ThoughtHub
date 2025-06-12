import React, { useState } from "react";

interface postProps {
  title: string;
  description: string;
  tags: string[];
  likes: number;
  views: number;

}

export default function BlogPost({
  title,
  description,
  tags,
  likes,
  views,

}: postProps) {


  return (
    <div className=" ">


      

      <div className="border flex flex-col gap-y-5 p-2 rounded shadow border-black/10" >
        <div>
          {title.length > 40 ? (
            <div>
              <h2 className="font-semibold text-xl w-full ">
                {title.slice(0, 38)}..
              </h2>
            </div>
          ) : (
            <div>
              <h2 className="font-semibold text-xl w-full ">{title}</h2>
            </div>
          )}

          {description.length > 160 ? (
            <div className="h-24 mt-3">
              <p>{description.slice(0, 150)} ...</p>
            </div>
          ) : (
            <div className="h-24 mt-3">
              <p>{description}</p>
            </div>
          )}
        </div>

        <div className="flex gap-x-4">
          {tags.map((tag, key) => (
            <span className="border p-0.5 border-black/10 rounded">{tag}</span>
          ))}
        </div>

        <div className="flex gap-4">
          <span className="border  border-black/10 ">{likes}</span>
          <span className="border  border-black/4 ">{views}</span>
        </div>

        <div className="w-full">
          <button className="bg-blue-600 text-white w-full p-2 cursor-pointer">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}
