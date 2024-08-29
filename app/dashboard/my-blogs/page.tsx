"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DashboardLayout from "@/layout/dashboard.layout";
import Button from "@/components/single/Button";
import useReadSchemas from "@/hooks/schema/useReadSchemas";
import { BlogData } from "@/schemas/blogSchema";
import { useUpdateSchema } from "@/hooks/schema/useUpdateSchema";
import ContentManagement from "@/components/ContentManagement";
import { formatDate, formatTimestampToDateTime } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { successToastStyle, errorToastStyle } from "@/styles/toastStyles";
import { useGetUser } from "@/hooks/user/useGetUser";
import { useUser } from "@clerk/nextjs";

const MyBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [editBlog, setEditBlog] = useState<BlogData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<BlogData | null>(null);

  const { user: clerkUser } = useUser();
  const { data: userData, getUser } = useGetUser();
  const { readSchema, response } = useReadSchemas(
    Number(process.env.NEXT_PUBLIC_WALACOR_BLOG_ETID)
  );
  const { updateRecord } = useUpdateSchema(
    Number(process.env.NEXT_PUBLIC_WALACOR_BLOG_ETID)
  );

  useEffect(() => {
    if (clerkUser) {
      getUser({ UserName: clerkUser.fullName || clerkUser.id });
    }
    readSchema();
  }, [clerkUser, getUser, readSchema]);

  useEffect(() => {
    if (response) {
      setBlogs(response);
    }
  }, [response]);

  const canPerformActions = () => {
    if (userData && userData.length > 0) {
      const walacorUser = userData[0];
      return (
        walacorUser.UserType === "Author" ||
        walacorUser.UserType === "Site_Admin"
      );
    }
    return false;
  };

  const confirmDelete = async () => {
    if (blogToDelete) {
      const blogCopy = { ...blogToDelete, IsDeleted: true };
      try {
        await updateRecord(blogCopy);
        setShowModal(false);
        setBlogToDelete(null);
        toast.success("Blog deleted successfully!", successToastStyle);
      } catch (error) {
        console.error("Error deleting blog:", error);
        toast.error("Failed to delete blog.", errorToastStyle);
      }
    }
  };

  const handleDelete = (blog: BlogData) => {
    setBlogToDelete(blog);
    setShowModal(true);
  };

  const handleEdit = (blog: BlogData) => {
    setEditBlog(blog);
    toast.success("You can now edit the blog.", successToastStyle);
  };

  const handleTogglePublish = async (blog: BlogData) => {
    if (!canPerformActions()) {
      toast.error(
        "You do not have permission to publish/unpublish this blog.",
        errorToastStyle
      );
      return;
    }

    const updatedBlog = {
      ...blog,
      isPublished: !blog.isPublished,
      publishedDate: blog.isPublished ? null : new Date().toISOString(),
    };
    try {
      await updateRecord(updatedBlog);
      if (blog.isPublished) {
        toast.success("Blog unpublished successfully!", successToastStyle);
      } else {
        toast.success("Blog published successfully!", successToastStyle);
      }
    } catch (error) {
      console.error("Error toggling publish state:", error);
      toast.error("Failed to change publish status.", errorToastStyle);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">My Blogs</h1>
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
              <div key={blog.id} className="bg-white p-4">
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
                  {canPerformActions() && (
                    <div className="flex space-x-2 items-center">
                      <Button
                        className="bg-red-500 text-white"
                        onClick={() => handleDelete(blog)}
                      >
                        Delete
                      </Button>
                      <Button
                        className="bg-primary text-primary-foreground"
                        onClick={() => handleEdit(blog)}
                      >
                        Edit
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
                  )}
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
                      ? formatDate(
                          String(blog.publishedDate && blog.publishedDate)
                        )
                      : "Not Published"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]"
        >
          <div className="bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="mb-6">Do you really want to delete this blog?</p>
            <div className="flex justify-end space-x-2">
              <Button
                className="bg-gray-500 text-white"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button className="bg-red-500 text-white" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyBlogs;
