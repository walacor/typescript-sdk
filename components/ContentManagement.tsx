"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/single/Input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "@/components/single/Button";
import Textarea from "@/components/single/Textarea";
import usePostSchema from "@/hooks/usePostSchema";
import { BlogData } from "@/schemas/blogSchema";
import { useUpdateRecord } from "@/hooks/useUpdateRecord";

interface ContentManagementProps {
  initialBlog?: BlogData;
  setEditBlog?: React.Dispatch<React.SetStateAction<BlogData | null>>;
}

const ContentManagement: React.FC<ContentManagementProps> = ({
  initialBlog,
  setEditBlog,
}) => {
  const initialBlogState: BlogData = initialBlog || {
    id: String(new Date().getTime()),
    userId: "",
    imageSrc: "",
    imageAlt: "",
    title: "",
    description: "",
    authorName: "",
    authorImage: "/placeholder-user.jpg",
    authorFallback: "",
    date: "",
    content: "",
    IsDeleted: false,
  };

  const [blog, setBlog] = useState<BlogData>(initialBlogState);

  const {
    postSchema,
    response: postResponse,
    error: postError,
    loading: postLoading,
  } = usePostSchema(Number(process.env.NEXT_PUBLIC_WALACOR_BLOG_ETID));

  const {
    updateRecord,
    loading: updateLoading,
    response: updateResponse,
    error: updateError,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (initialBlog) {
        await updateRecord(blog);
      } else {
        await postSchema(blog);
      }
      if (setEditBlog) {
        setEditBlog(null);
      }
    } catch (error) {
      console.error("Error submitting schema:", error);
    }
  };

  const isLoading = postLoading || updateLoading;
  const response = postResponse || updateResponse;
  const error = postError || updateError;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Content Management</h1>
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
        <Input
          name="imageSrc"
          placeholder="Image Source URL"
          value={blog.imageSrc.toString()}
          onChange={handleChange}
          required
        />
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
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground"
        >
          {isLoading ? "Saving..." : "Save Blog Post"}
        </Button>
        {response && <div>Response: {JSON.stringify(response)}</div>}
        {error && <div>Error: {error.message}</div>}
      </form>
    </div>
  );
};

export default ContentManagement;
