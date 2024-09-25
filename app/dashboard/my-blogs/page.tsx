"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DashboardLayout from "@/layout/dashboard.layout";
import Button from "@/components/single/Button";
import useReadSchemas from "@/hooks/schema/useReadSchemas";
import { BlogData } from "@/schemas/blogSchema";
import { useUpdateSchema } from "@/hooks/schema/useUpdateSchema";
import ContentManagement from "@/components/ContentManagement";
import { formatTimestampToDateTime } from "@/lib/utils";
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

  const { user: clerkUser } = useUser();
  const { data: userData, getUser } = useGetUser();
  const { response, error, loading, readSchema } = useReadSchemas(
    Number(process.env.NEXT_PUBLIC_WALACOR_BLOG_ETID)
  );
  const { updateRecord } = useUpdateSchema(
    Number(process.env.NEXT_PUBLIC_WALACOR_BLOG_ETID)
  );

  const {
    response: blogRevisions,
    loading: revisionsLoading,
    error: revisionsError,
    fetchSchemas: fetchRevisions,
  } = useReadBlogRevisions(Number(process.env.NEXT_PUBLIC_WALACOR_BLOG_ETID));

  useEffect(() => {
    if (clerkUser) {
      getUser({ UserName: clerkUser.fullName || clerkUser.id });
    }
  }, [clerkUser, getUser]);

  useEffect(() => {
    readSchema(); // Fetch the main blog data using readSchema
  }, [readSchema]);

  useEffect(() => {
    if (response) {
      setBlogs(response); // Update blogs state with fetched data
      fetchRevisions(); // Fetch revisions only after blogs are set
    }
  }, [response, fetchRevisions]);

  const toggleRevisions = (blogId: string) => {
    setOpenRevisions((prevOpen) => ({
      ...prevOpen,
      [blogId]: !prevOpen[blogId],
    }));
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
    const result: JSX.Element[] = [];

    diff.forEach((part, index) => {
      if (part.added) {
        result.push(
          <span key={`added-${index}`} className="bg-green-200">
            {part.value}
          </span>
        );
      } else if (part.removed) {
        result.push(
          <span key={`removed-${index}`} className="bg-red-200">
            {part.value}
          </span>
        );
      } else {
        result.push(<span key={`normal-${index}`}>{part.value}</span>);
      }
    });

    return result;
  };

  // Group blog revisions by blog id
  const groupedRevisions = blogRevisions?.reduce((acc: any, revision: any) => {
    const blogId = revision.id.toString(); // Ensure the ID is a string
    if (!acc[blogId]) {
      acc[blogId] = [];
    }
    acc[blogId].push(revision);
    return acc;
  }, {});

  return (
    <DashboardLayout>
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-semibold mb-6">My Blogs</h1>

        {loading ? (
          <div className="space-y-6">Loading...</div>
        ) : editBlog ? (
          <ContentManagement initialBlog={editBlog} setEditBlog={setEditBlog} />
        ) : (
          <div className="space-y-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white p-4 border rounded shadow">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <Link
                  target="_blank"
                  href={`/blog/${blog.id}`}
                  className="hover:underline transition-all mr-2 flex items-center gap-1 opacity-50 hover:opacity-100 mb-2"
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
                        className={
                          blog.isPublished
                            ? "bg-gray-500 text-white"
                            : "bg-green-500 text-white"
                        }
                        onClick={() => handleTogglePublish(blog)}
                      >
                        {blog.isPublished ? "Unpublish" : "Publish"}
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <button
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
                  </button>
                  <span className="opacity-50 text-xs mt-4">
                    Created: {formatTimestampToDateTime(blog.CreatedAt)}
                  </span>
                </div>
                {/* Add the revision history here */}
                {openRevisions[blog.id] && (
                  <div className="mt-4 p-4">
                    <h3 className="font-semibold mb-2">Revision History:</h3>
                    <div className="space-y-4">
                      {groupedRevisions[blog.id] &&
                        groupedRevisions[blog.id].map(
                          (revision: any, index: number) => {
                            const previousRevision =
                              groupedRevisions[blog.id][index + 1];
                            return (
                              <div
                                key={index}
                                className="border p-4 rounded shadow-sm"
                              >
                                <div className="text-sm text-gray-600 mb-2">
                                  <strong>Revision ID:</strong> {revision._id}
                                </div>
                                <div className="text-sm text-gray-600 mb-2">
                                  <strong>Author:</strong> {revision.authorName}
                                </div>
                                <div className="text-sm text-gray-600 mb-2">
                                  <strong>Created At:</strong>{" "}
                                  {formatTimestampToDateTime(
                                    revision.CreatedAt
                                  )}
                                </div>
                                {previousRevision ? (
                                  <div className="mt-4">
                                    <h4 className="font-semibold mb-1">
                                      Changes:
                                    </h4>
                                    <div className="p-2 bg-gray-50 border rounded">
                                      <div className="mb-2">
                                        <strong>Title:</strong>{" "}
                                        {createHighlightedDiff(
                                          previousRevision.title,
                                          revision.title
                                        )}
                                      </div>
                                      <div className="mb-2">
                                        <strong>Description:</strong>{" "}
                                        {createHighlightedDiff(
                                          previousRevision.description,
                                          revision.description
                                        )}
                                      </div>
                                      <div className="mb-2">
                                        <strong>Content:</strong>{" "}
                                        {createHighlightedDiff(
                                          previousRevision.content,
                                          revision.content
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="mt-4">
                                    <h4 className="font-semibold mb-1">
                                      Revision Content:
                                    </h4>
                                    <div className="p-2 bg-gray-50 border rounded">
                                      <div className="mb-2">
                                        <strong>Title:</strong> {revision.title}
                                      </div>
                                      <div className="mb-2">
                                        <strong>Description:</strong>{" "}
                                        {revision.description}
                                      </div>
                                      <div className="mb-2">
                                        <strong>Content:</strong>{" "}
                                        {revision.content}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          }
                        )}
                    </div>
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
