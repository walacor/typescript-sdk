"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DashboardLayout from "@/layout/dahboard.layout";
import Button from "@/components/single/Button";
import useReadSchema from "@/hooks/useReadSchema";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState<any>([]);
  const { readSchema, response, error, loading } = useReadSchema();

  useEffect(() => {
    readSchema();
  }, [readSchema]);

  useEffect(() => {
    setBlogs(response && response.data);
  }, [response]);

  const handleDelete = (id: string) => {
    setBlogs((prevBlogs: any) =>
      prevBlogs.filter((blog: any) => blog.id !== id)
    );
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">My Blogs</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <div className="space-y-6">
          {blogs &&
            blogs.map((blog: any) => (
              <div key={blog.id} className="bg-white shadow p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4">{blog.description}</p>
                <div className="flex justify-between items-center">
                  <div />
                  <div className="flex space-x-2 items-center">
                    <Link
                      className="hover:underline transition-all mr-2"
                      href={`/blog/${blog.id}`}
                    >
                      Read Blog
                    </Link>
                    <Button className="bg-primary text-primary-foreground">
                      Edit
                    </Button>
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
