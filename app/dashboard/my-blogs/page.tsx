"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DashboardLayout from "@/layout/dashboard.layout";
import Button from "@/components/single/Button";
import useReadSchema from "@/hooks/useReadSchema";
import { BlogData } from "@/schemas/blogSchema";
import { useUpdateRecord } from "@/hooks/useUpdateRecord";
import ContentManagement from "@/components/ContentManagement";
import { formatDate, formatTimestampToDateTime } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

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

  const handleTogglePublish = async (blog: BlogData) => {
    let updatedBlog = {
      ...blog,
      isPublished: !blog.isPublished,
      publishedDate: blog.isPublished ? null : new Date().toISOString(),
    };
    try {
      await updateRecord(updatedBlog);
    } catch (error) {
      console.error("Error toggling publish state:", error);
    }
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
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <Link
                  target="_blank"
                  className="hover:underline transition-all mr-2 flex items-center gap-1 opacity-50 hover:opacity-100 mb-2"
                  href={`/blog/${blog.id}`}
                >
                  <span>Read Blog</span>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </Link>
                <p className="text-gray-600 mb-4">{blog.description}</p>
                <div className="flex justify-between items-center">
                  <div />
                  <div className="flex space-x-2 items-center">
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
                    <Button
                      className={`${
                        blog.isPublished
                          ? "bg-gray-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                      onClick={() => handleTogglePublish(blog)}
                    >
                      {blog.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div />
                  <span className="opacity-50 text-xs mt-4">
                    Created: {formatTimestampToDateTime(blog.CreatedAt)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div />
                  <span className="opacity-50 text-xs mt-2">
                    Published:{" "}
                    {blog.isPublished
                      ? formatTimestampToDateTime(
                          Number(blog.publishedDate && blog.publishedDate)
                        )
                      : "Not Published"}
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
