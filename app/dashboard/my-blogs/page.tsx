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
  faCheckCircle,
  faChevronDown,
  faChevronUp,
  faRedo,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { successToastStyle, errorToastStyle } from "@/styles/toastStyles";
import { useGetUser } from "@/hooks/user/useGetUser";
import { useUser } from "@clerk/nextjs";
import useReadBlogRevisions from "@/hooks/schema/useReadBlogRevisions";
import { diffWords } from "diff";
import { Tooltip } from "@/components/single/Tooltip";

const MyBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [editBlog, setEditBlog] = useState<BlogData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState<BlogData | null>(
    null
  );
  const [revisionToDelete, setRevisionToDelete] = useState<BlogData | null>(
    null
  );
  const [blogToDelete, setBlogToDelete] = useState<BlogData | null>(null);
  const [openRevisions, setOpenRevisions] = useState<{
    [key: string]: boolean;
  }>({});
  const [includePreviousRevision, setIncludePreviousRevision] = useState<{
    [key: string]: boolean;
  }>({});
  const [showDeletedRevisions, setShowDeletedRevisions] = useState(false);

  const { user: clerkUser } = useUser();
  const { data: userData, getUser } = useGetUser();
  const userId = clerkUser?.id || "";

  const { response, error, loading, readSchema } = useReadSchemas(
    Number(process.env.NEXT_PUBLIC_WALACOR_BLOG_ETID),
    userId
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
    readSchema();
  }, [readSchema]);

  useEffect(() => {
    if (response) {
      setBlogs(response);
      fetchRevisions();
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
      try {
        const blogCopy = { ...blogToDelete, IsDeleted: true };
        await updateRecord(blogCopy);

        const relatedRevisions = blogRevisions?.filter(
          (revision) => revision.id === blogToDelete.id
        );
        if (relatedRevisions) {
          for (const revision of relatedRevisions) {
            await updateRecord({ ...revision, IsDeleted: true });
          }
        }

        setShowModal(false);
        setBlogToDelete(null);
        toast.success(
          "Blog and its revisions deleted successfully!",
          successToastStyle
        );
      } catch (error) {
        console.error("Error deleting blog and revisions:", error);
        toast.error("Failed to delete blog and revisions.", errorToastStyle);
      }
    }
  };

  const confirmDeleteRevision = async () => {
    if (revisionToDelete) {
      try {
        await updateRecord({ ...revisionToDelete, IsDeleted: true });
        setRevisionToDelete(null);
        toast.success("Revision deleted successfully!", successToastStyle);
      } catch (error) {
        console.error("Error deleting revision:", error);
        toast.error("Failed to delete revision.", errorToastStyle);
      }
    }
  };

  const handleDelete = (blog: BlogData) => {
    setBlogToDelete(blog);
    setShowModal(true);
  };

  const handleDeleteRevision = (revision: BlogData) => {
    setRevisionToDelete(revision);
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

  const promoteToLive = async (blogId: string, revision: BlogData) => {
    try {
      const currentLiveVersion = blogs.find((blog) => blog.liveVersion);
      if (currentLiveVersion) {
        await updateRecord({
          ...currentLiveVersion,
          liveVersion: false,
          isPublished: false,
        });
      }

      await updateRecord({
        ...revision,
        id: blogId,
        liveVersion: true,
        isPublished: true,
      });
      toast.success("Revision promoted to live version!", successToastStyle);
    } catch (error) {
      toast.error("Failed to promote revision.", errorToastStyle);
      console.error("Error promoting revision:", error);
    }
  };

  const promoteWithoutPublishing = async (
    blogId: string,
    revision: BlogData
  ) => {
    try {
      const currentLiveVersion = blogs.find((blog) => blog.liveVersion);
      if (currentLiveVersion) {
        await updateRecord({
          ...currentLiveVersion,
          liveVersion: false,
          isPublished: false,
        });
      }

      await updateRecord({
        ...revision,
        id: blogId,
        liveVersion: true,
        isPublished: false,
      });
      toast.success(
        "Revision selected as live version (not published)!",
        successToastStyle
      );
    } catch (error) {
      toast.error(
        "Failed to select revision as live version.",
        errorToastStyle
      );
      console.error("Error selecting revision as live version:", error);
    }
  };

  const groupedRevisions = blogRevisions?.reduce((acc: any, revision: any) => {
    const blogId = revision.id.toString();
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
                {openRevisions[blog.id] && (
                  <div className="mt-4 p-4">
                    <div className="flex items-center mb-4">
                      <label className="mr-2 text-sm font-semibold flex items-center">
                        Show Changes:
                        <Tooltip text="This feature is to show the changes between the current revision and the previous revision. This is useful for seeing what has changed between revisions." />
                      </label>
                      <input
                        type="checkbox"
                        checked={includePreviousRevision[blog.id] || false}
                        onChange={() => toggleIncludePrevious(blog.id)}
                        className="toggle-checkbox"
                      />
                    </div>
                    <div className="flex items-center mb-4">
                      <label className="mr-2 text-sm font-semibold flex items-center">
                        Show Data in Walacor
                        <Tooltip text="This feature is to show off Walacor's robust data platform in that they store ALL history and maintain an indefinite audit log, etc." />
                      </label>
                      <input
                        type="checkbox"
                        checked={showDeletedRevisions}
                        onChange={(e) =>
                          setShowDeletedRevisions(e.target.checked)
                        }
                        className="toggle-checkbox"
                      />
                    </div>
                    <h3 className="font-semibold mb-2">Revision History:</h3>
                    <div className="space-y-4">
                      {groupedRevisions[blog.id] &&
                        groupedRevisions[blog.id]
                          .reverse()
                          .filter(
                            (revision: BlogData) =>
                              showDeletedRevisions || !revision.IsDeleted
                          )
                          .map((revision: BlogData, index: number) => {
                            const previousRevision =
                              groupedRevisions[blog.id][index + 1];
                            const isLive = revision.liveVersion;
                            return (
                              <div
                                key={index}
                                className={`border p-4 rounded shadow-sm ${
                                  isLive
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-300"
                                } ${
                                  revision.IsDeleted
                                    ? "bg-gray-100 opacity-50"
                                    : ""
                                }`}
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <div className="text-sm text-gray-600">
                                    <strong>Revision ID:</strong> {revision.id}
                                  </div>
                                  {isLive && (
                                    <div className="text-xs text-green-600 font-semibold">
                                      Current Version
                                    </div>
                                  )}
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
                                {includePreviousRevision[blog.id] &&
                                previousRevision ? (
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
                                <div className="mt-4 flex items-center space-x-2">
                                  {isLive ? (
                                    <Button className="bg-green-500 text-white cursor-not-allowed">
                                      Current Version
                                      <FontAwesomeIcon
                                        className="ml-2"
                                        icon={faCheckCircle}
                                      />
                                    </Button>
                                  ) : (
                                    <Button
                                      className={`bg-primary text-primary-foreground hover:bg-primary-hover hover:text-primary-hover ${
                                        revision.IsDeleted
                                          ? "cursor-not-allowed opacity-50"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        setShowPublishModal(revision)
                                      }
                                      disabled={revision.IsDeleted}
                                    >
                                      Select Version
                                      <FontAwesomeIcon
                                        className="ml-2"
                                        icon={faRedo}
                                      />
                                    </Button>
                                  )}
                                  {!isLive && (
                                    <Button
                                      className={`bg-red-500 text-white hover:bg-red-600 ${
                                        revision.IsDeleted
                                          ? "cursor-not-allowed opacity-50"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        handleDeleteRevision(revision)
                                      }
                                      disabled={revision.IsDeleted}
                                    >
                                      Delete
                                      <FontAwesomeIcon
                                        className="ml-2"
                                        icon={faTrash}
                                      />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Blog Confirmation Modal */}
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

      {/* Delete Revision Confirmation Modal */}
      {revisionToDelete && (
        <div
          onClick={() => setRevisionToDelete(null)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6">Do you really want to delete this revision?</p>
            <div className="flex justify-end space-x-2">
              <Button
                className="bg-gray-500 text-white"
                onClick={() => setRevisionToDelete(null)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-500 text-white"
                onClick={confirmDeleteRevision}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Publish Confirmation Modal */}
      {showPublishModal && (
        <div
          onClick={() => setShowPublishModal(null)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Confirm Version Selection
            </h2>
            <p className="mb-6">
              Do you want to select this revision as the live version?
            </p>
            <div className="flex justify-end space-x-2">
              <Button
                className="bg-gray-500 text-white"
                onClick={() => setShowPublishModal(null)}
              >
                Cancel
              </Button>
              <Button
                className="bg-green-500 text-white"
                onClick={() => {
                  if (showPublishModal) {
                    promoteToLive(showPublishModal.id, showPublishModal);
                    setShowPublishModal(null);
                  }
                }}
              >
                Select Version & Publish
              </Button>
              <Button
                className="bg-primary text-white"
                onClick={() => {
                  if (showPublishModal) {
                    promoteWithoutPublishing(
                      showPublishModal.id,
                      showPublishModal
                    );
                    setShowPublishModal(null);
                  }
                }}
              >
                Select Version & Do Not Publish
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyBlogs;
