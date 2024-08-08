"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/single/Input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "@/components/single/Button";
import Textarea from "@/components/single/Textarea";
import usePostSchema from "@/hooks/usePostSchema";
import { useUpdateRecord } from "@/hooks/useUpdateRecord";
import BaseUploadImage from "@/components/BaseUploadImage";
import { BlogData } from "@/schemas/blogSchema";

interface ContentManagementProps {
  initialBlog?: BlogData | null;
  setEditBlog?: React.Dispatch<React.SetStateAction<BlogData | null>>;
}

const ContentManagement: React.FC<ContentManagementProps> = ({
  initialBlog = null,
  setEditBlog,
}) => {
  const today = new Date().toISOString().split("T")[0];

  const [blog, setBlog] = useState<BlogData>({
    id: initialBlog?.id || String(new Date().getTime()),
    userId: initialBlog?.userId || "",
    imageSrc: initialBlog?.imageSrc || "",
    imageAlt: initialBlog?.imageAlt || "",
    title: initialBlog?.title || "",
    description: initialBlog?.description || "",
    authorName: initialBlog?.authorName || "",
    authorImage: initialBlog?.authorImage || "/placeholder-user.jpg",
    authorFallback: initialBlog?.authorFallback || "",
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
  } = useUpdateRecord(Number(process.env.NEXT_PUBLIC_WALACOR_BLOG_ETID));

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
        <Input
          name="title"
          placeholder="Title"
          value={blog.title}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Description"
          value={blog.description}
          onChange={handleChange}
          required
        />
        <Input
          name="authorName"
          placeholder="Author Name"
          value={blog.authorName}
          onChange={handleChange}
          required
        />
        <Input
          name="authorFallback"
          placeholder="Author Fallback Initials"
          value={blog.authorFallback}
          onChange={handleChange}
          required
        />
        <Input
          name="date"
          type="date"
          placeholder="Publication Date"
          value={blog.date}
          onChange={handleChange}
          required
        />
        <BaseUploadImage onUpload={handleImageUpload} />
        <Input
          name="imageAlt"
          placeholder="Image Alt Text"
          value={blog.imageAlt}
          onChange={handleChange}
          required
        />
        <ReactQuill
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
        <div className="flex space-x-4">
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground"
          >
            {postLoading || updateLoading ? "Saving..." : "Save Blog Post"}
          </Button>
          <Button
            type="button"
            className="w-full bg-secondary text-secondary-foreground"
            onClick={handlePublish}
          >
            {postLoading || updateLoading ? "Publishing..." : "Save & Publish"}
          </Button>
          {initialBlog && (
            <Button
              type="button"
              className="w-full bg-gray-500 text-white"
              onClick={handleCancelEdit}
            >
              Cancel Edit
            </Button>
          )}
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
