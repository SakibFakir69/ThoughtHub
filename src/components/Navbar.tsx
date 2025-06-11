"use client";

import { linkTypes } from "@/types/linkType";
import { link } from "fs";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

function Navbar() {
  // add font

  // usepathname

  const pathname = usePathname();
  console.log(pathname);

  const links: linkTypes = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Blog", path: "/blog" },
    { id: 3, name: "About", path: "/about" },
    { id: 4, name: "Contact", path: "/contact" },
  ];

  return (
    <div className="flex justify-between p-4  fixed z-50 bg-black backdrop-blur-3xl w-full top-0 left-0">
      <section className="flex space-x-4 text-white">
        {/* navbar */}
        <h2 className="font-medium">AIInsight</h2>

        {links.map((link, key) => (
          <nav key={link.id}>
            <Link
              href={link.path}
              className={`${
                link.path === pathname
                  ? "h-8 w-18 text-blue-500  p-2 rounded font-light"
                  : " font-light text-black"
              }`}
            >
              {link.name}
            </Link>
          </nav>
        ))}
      </section>

      <section>
        {/* profile */}
        <div className="flex gap-x-4 items-center justify-center ">
          <button className="btn btn-primary">Create Post</button>
          <h2 className="h-10 w-10 rounded-full border-stone-200"></h2>
        </div>
      </section>
    </div>
  );
}

export default Navbar;
