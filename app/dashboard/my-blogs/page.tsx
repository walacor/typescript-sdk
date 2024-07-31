"use client";

import React, { useState } from "react";
import Link from "next/link";
import { blogData } from "@/data/blogData";
import DashboardLayout from "@/layout/dahboard.layout";
import Button from "@/components/single/Button";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState(
    blogData.filter((blog) => blog.userId === "1")
  );

  const handleDelete = (id: string) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">My Blogs</h1>
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white shadow p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.description}</p>
              <div className="flex justify-between items-center">
                <Link className="hover:underline" href={`/blog/${blog.id}`}>
                  Read Blog
                </Link>
                <div className="flex space-x-2">
                  <Button className="bg-blue-500 text-white">Edit</Button>
                  <Button
                    className="bg-red-500 text-white"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyBlogs;
