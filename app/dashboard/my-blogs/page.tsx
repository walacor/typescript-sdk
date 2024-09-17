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
import {
  faArrowUpRightFromSquare,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { successToastStyle, errorToastStyle } from "@/styles/toastStyles";
import { useGetUser } from "@/hooks/user/useGetUser";
import { useUser } from "@clerk/nextjs";
import useReadBlogRevisions from "@/hooks/schema/useReadBlogRevisions";
import { diffWords } from "diff";

const MyBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [editBlog, setEditBlog] = useState<BlogData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<BlogData | null>(null);
  const [openRevisions, setOpenRevisions] = useState<{
    [key: string]: boolean;
  }>({});
  const [includePreviousRevision, setIncludePreviousRevision] = useState<{
    [key: string]: boolean;
  }>({});
  const [revisions, setRevisions] = useState<{ [key: string]: BlogData[] }>({});

  const { user: clerkUser } = useUser();
  const { data: userData, getUser } = useGetUser();
  const { readSchema, response } = useReadSchemas(
    Number(process.env.NEXT_PUBLIC_WALACOR_BLOG_ETID)
  );
  const { updateRecord } = useUpdateSchema(
    Number(process.env.NEXT_PUBLIC_WALACOR_BLOG_ETID)
  );

  const {
    revisions: fetchedRevisions,
    error: revisionError,
    loading: revisionLoading,
  } = useReadBlogRevisions(
    Number(process.env.NEXT_PUBLIC_WALACOR_BLOG_ETID),
    blogs.length > 0 ? blogs[0].id : ""
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

  const toggleRevisions = (blogId: string) => {
    setOpenRevisions((prevOpen) => ({
      ...prevOpen,
      [blogId]: !prevOpen[blogId],
    }));

    if (!revisions[blogId] && fetchedRevisions) {
      setRevisions((prevRevisions) => ({
        ...prevRevisions,
        [blogId]: fetchedRevisions,
      }));
    }
  };

  const toggleIncludePrevious = (blogId: string) => {
    setIncludePreviousRevision((prevInclude) => ({
      ...prevInclude,
      [blogId]: !prevInclude[blogId],
    }));
  };

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
      toast.success(
        blog.isPublished
          ? "Blog unpublished successfully!"
          : "Blog published successfully!",
        successToastStyle
      );
    } catch (error) {
      console.error("Error toggling publish state:", error);
      toast.error("Failed to change publish status.", errorToastStyle);
    }
  };

  const createHighlightedDiff = (oldText: string, newText: string) => {
    const diff = diffWords(oldText, newText);
    const result = [] as any;

    let added = false;
    let removed = false;

    diff.forEach((part, index) => {
      if (part.added) {
        if (removed) {
          result.push(
            <span key={`arrow-${index}`} className="mx-1 text-gray-600">
              {"->"}
            </span>
          );
        }
        result.push(
          <span key={`added-${index}`} className="text-green-500">
            {part.value}
          </span>
        );
        added = true;
        removed = false;
      } else if (part.removed) {
        result.push(
          <span key={`removed-${index}`} className="text-red-500">
            {part.value}
          </span>
        );
        removed = true;
        added = false;
      } else {
        result.push(
          <span key={`normal-${index}`} className="">
            {part.value}
          </span>
        );
        added = false;
        removed = false;
      }
    });

    return result;
  };

  const compareWithPreviousRevision = (
    revisions: BlogData[],
    blogId: string
  ) => {
    return revisions.map((revision, index) => {
      const previousRevision = revisions[index + 1];
      if (!previousRevision) return null;

      const reversedIndex = revisions.length - index;

      return (
        <div key={index} className="mb-4">
          <div className="p-4 border">
            <div className="text-xs opacity-50 mb-1">
              Revision #{reversedIndex - 1}
            </div>
            <h5 className="font-semibold mb-2">{revision.title}</h5>
            <p className="text-gray-600">{revision.description}</p>

            {includePreviousRevision[blogId] && (
              <>
                <div className="text-xs opacity-50 mb-1">Previous Revision</div>
                <div className="p-4 mb-4 border border-red-300">
                  <h5 className="font-semibold mb-2 text-red-500">
                    {createHighlightedDiff(
                      previousRevision.title,
                      revision.title
                    )}
                  </h5>
                  <p className="text-gray-600">
                    {createHighlightedDiff(
                      previousRevision.description,
                      revision.description
                    )}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-semibold mb-6">My Blogs</h1>
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
                  <div className="flex justify-between items-center mt-4">
                    <Button
                      className="hover:underline transition-all mr-2 flex items-center gap-1 opacity-50 hover:opacity-100 mb-2 text-xs"
                      onClick={() => toggleRevisions(blog.id)}
                    >
                      {openRevisions[blog.id]
                        ? "Hide Revisions"
                        : "See Revisions"}
                      <FontAwesomeIcon
                        icon={
                          openRevisions[blog.id] ? faChevronUp : faChevronDown
                        }
                      />
                    </Button>
                  </div>
                  <span className="opacity-50 text-xs mt-4">
                    Created: {formatTimestampToDateTime(blog.CreatedAt)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div />
                  <span className="opacity-50 text-xs mt-2">
                    Published:{" "}
                    {blog.isPublished
                      ? formatDate(String(blog.publishedDate))
                      : "Not Published"}
                  </span>
                </div>

                {openRevisions[blog.id] && revisions[blog.id] && (
                  <div className="mt-4 p-4">
                    <h3 className="font-semibold mb-2">Previous Revisions:</h3>

                    <label className="flex items-center space-x-2 mb-4">
                      <span className="text-xs font-medium">
                        Include Previous Revision
                      </span>

                      <span
                        onClick={() => toggleIncludePrevious(blog.id)}
                        className={`${
                          includePreviousRevision[blog.id]
                            ? "bg-primary"
                            : "bg-gray-400"
                        } relative inline-block w-8 h-4 rounded-full transition cursor-pointer shadow-sm`}
                      >
                        <span
                          className={`${
                            includePreviousRevision[blog.id]
                              ? "translate-x-3 bg-gray-100"
                              : "translate-x-0 bg-gray-100"
                          } absolute left-1 top-0 bottom-0 m-auto w-3 h-3 rounded-full transition transform`}
                        />
                      </span>
                    </label>

                    {compareWithPreviousRevision(
                      revisions[blog.id].slice().reverse(),
                      blog.id
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
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
