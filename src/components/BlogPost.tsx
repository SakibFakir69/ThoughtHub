import React from "react";

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

      <div className="border">
        <h2>{title}</h2>
        <p>{description}</p>

        <div>
          {tags.map((tag, key) => (
            <span>{tag}</span>
          ))}
        </div>

        <div>
          <span>{likes}</span>
          <span>{views}</span>
        </div>
      </div>
    </div>
  );
}
