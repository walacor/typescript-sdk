"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/single/Input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "@/components/single/Button";
import Textarea from "@/components/single/Textarea";
import usePostSchema from "@/hooks/usePostSchema";
import { useUpdateSchema } from "@/hooks/useUpdateSchema";
import BaseUploadImage from "@/components/BaseUploadImage";
import { BlogData } from "@/schemas/blogSchema";
import { useAuth, useUser } from "@clerk/nextjs";
import { formatDate } from "@/lib/utils";

interface ContentManagementProps {
  initialBlog?: BlogData | null;
  setEditBlog?: React.Dispatch<React.SetStateAction<BlogData | null>>;
}

const ContentManagement: React.FC<ContentManagementProps> = ({
  initialBlog = null,
  setEditBlog,
}) => {
  const today = new Date().toISOString().split("T")[0];
  const { userId } = useAuth();
  const { user } = useUser();

  const [blog, setBlog] = useState<BlogData>({
    id: initialBlog?.id || String(new Date().getTime()),
    userId: userId || "",
    imageSrc: initialBlog?.imageSrc || "",
    imageAlt: initialBlog?.imageAlt || "",
    title: initialBlog?.title || "",
    description: initialBlog?.description || "",
    authorName:
      String(user?.firstName) + " " + String(user?.lastName) ||
      String(user?.fullName) ||
      "Anonymous",
    authorImage: String(user?.imageUrl) || "/placeholder-user.jpg",
    authorFallback:
      String(user?.firstName).slice(0, 1).toUpperCase() +
        " " +
        String(user?.lastName).slice(0, 1).toUpperCase() || "",
    date: initialBlog?.date || today,
    content: initialBlog?.content || "",
    IsDeleted: initialBlog?.IsDeleted || false,
    CreatedAt: initialBlog?.CreatedAt || Date.now(),
    UpdatedAt: initialBlog?.UpdatedAt || Date.now(),
    isPublished: initialBlog?.isPublished || false,
    publishedDate: initialBlog?.publishedDate || null,
  });

  const {
    postSchema,
    response: postResponse,
    error: postError,
    loading: postLoading,
  } = usePostSchema(Number(process.env.NEXT_PUBLIC_WALACOR_BLOG_ETID));

  const {
    updateRecord,
    response: updateResponse,
    error: updateError,
    loading: updateLoading,
  } = useUpdateSchema(Number(process.env.NEXT_PUBLIC_WALACOR_BLOG_ETID));

  useEffect(() => {
    if (initialBlog) {
      setBlog(initialBlog);
    }
  }, [initialBlog]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
  };

  const handleEditorChange = (content: string) => {
    setBlog((prevBlog) => ({ ...prevBlog, content }));
  };

  const handleImageUpload = (url: string) => {
    setBlog((prevBlog) => ({ ...prevBlog, imageSrc: String(url) }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting blog:", blog);
    try {
      if (initialBlog) {
        await updateRecord(blog);
        if (setEditBlog) setEditBlog(null);
      } else {
        await postSchema(blog);
        console.log("HERE");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handlePublish = async () => {
    const updatedBlog = {
      ...blog,
      isPublished: true,
      publishedDate: new Date().toISOString(),
    };
    console.log("Publishing blog:", updatedBlog);
    try {
      if (initialBlog) {
        await updateRecord(updatedBlog);
        if (setEditBlog) setEditBlog(null);
      } else {
        await postSchema(updatedBlog);
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  const handleCancelEdit = () => {
    if (setEditBlog) setEditBlog(null);
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className={`${initialBlog ? "" : "mb-6"} text-3xl font-bold`}>
        {initialBlog ? "" : "Create Blog"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2>Title of Blog</h2>
        <Input
          name="title"
          placeholder="Title"
          value={blog.title}
          onChange={handleChange}
          required
        />
        <h2>Brief Description of Blog</h2>
        <Textarea
          name="description"
          placeholder="Description"
          value={blog.description}
          onChange={handleChange}
          required
        />
        <BaseUploadImage onUpload={handleImageUpload} />

        <h2>Blog Content & Structure</h2>
        <ReactQuill
          className="bg-white"
          value={blog.content}
          onChange={handleEditorChange}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline"],
              ["link", "image"],
              [{ align: [] }],
              [{ color: [] }, { background: [] }],
              ["clean"],
            ],
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "list",
            "bullet",
            "indent",
            "link",
            "image",
            "align",
            "color",
            "background",
          ]}
        />

        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full bg-secondary text-secondary-foreground border-2 border-black hover:bg-black hover:text-white transition-all"
          >
            {postLoading || updateLoading ? "Saving..." : "Save Blog Post"}
          </Button>
          <Button
            type="button"
            className="w-full bg-secondary text-secondary-foreground border-2 border-black hover:bg-black hover:text-white transition-all"
            onClick={handlePublish}
          >
            {postLoading || updateLoading ? "Publishing..." : "Save & Publish"}
          </Button>
          {initialBlog && (
            <Button
              type="button"
              className="w-full bg-none text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white transition-all"
              onClick={handleCancelEdit}
            >
              Cancel Edit
            </Button>
          )}
        </div>

        <div className="flex justify-between gap-2 w-full">
          <span className="text-xs opacity-50">
            Author:{" "}
            {String(user?.firstName) + " " + String(user?.lastName) ||
              "Anonymous"}
          </span>
          <span className="text-xs opacity-50">Date: {formatDate(today)}</span>
        </div>

        {(postResponse || updateResponse) && (
          <div>Response: {JSON.stringify(postResponse || updateResponse)}</div>
        )}
        {(postError || updateError) && (
          <div>Error: {(postError || updateError)?.message}</div>
        )}
      </form>
    </div>
  );
};

export default ContentManagement;
