"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DashboardLayout from "@/layout/dashboard.layout";
import Button from "@/components/single/Button";
import useReadSchema from "@/hooks/useReadSchema";
import { BlogData } from "@/schemas/blogSchema";
import { useUpdateRecord } from "@/hooks/useUpdateRecord";
import ContentManagement from "@/components/ContentManagement";
import { formatTimestampToDateTime } from "@/lib/utils";

const MyBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [editBlog, setEditBlog] = useState<BlogData | null>(null);
  const { readSchema, response, error, loading } = useReadSchema(
    Number(process.env.NEXT_PUBLIC_WALACOR_BLOG_ETID)
  );

  const { updateRecord } = useUpdateRecord(
    Number(process.env.NEXT_PUBLIC_WALACOR_BLOG_ETID)
  );

  useEffect(() => {
    readSchema();
  }, [readSchema]);

  useEffect(() => {
    if (response) {
      setBlogs(response);
    }
  }, [response]);

  const handleDelete = async (blog: BlogData) => {
    let blogCopy = { ...blog, IsDeleted: true };
    try {
      await updateRecord(blogCopy);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleEdit = (blog: BlogData) => {
    setEditBlog(blog);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">My Blogs</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {editBlog ? (
          <div>
            <ContentManagement
              initialBlog={editBlog}
              setEditBlog={setEditBlog}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {blogs
              .filter((blog) => !blog.IsDeleted)
              .map((blog) => (
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
                      <Button
                        className="bg-primary text-primary-foreground"
                        onClick={() => handleEdit(blog)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="bg-red-500 text-white"
                        onClick={() => handleDelete(blog)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div />
                    <span className="opacity-50 text-xs mt-4">
                      Created: {formatTimestampToDateTime(blog.CreatedAt)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyBlogs;
