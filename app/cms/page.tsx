"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContentManagement = () => {
  const [blog, setBlog] = useState({
    id: "",
    userId: "",
    href: "",
    imageSrc: "",
    imageAlt: "",
    title: "",
    description: "",
    authorName: "",
    authorImage: "/placeholder-user.jpg",
    authorFallback: "",
    date: "",
    content: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle saving the blog data (e.g., send to a server or update local state)
    console.log("Blog Data:", blog);
    // Redirect to another page if necessary
    window.location.href = "/read-the-blog";
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Content Management</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          name="id"
          placeholder="ID"
          value={blog.id}
          onChange={handleChange}
          required
        />
        <Input
          name="userId"
          placeholder="User ID"
          value={blog.userId}
          onChange={handleChange}
          required
        />
        <Input
          name="href"
          placeholder="URL Slug"
          value={blog.href}
          onChange={handleChange}
          required
        />
        <Input
          name="imageSrc"
          placeholder="Image Source URL"
          value={blog.imageSrc}
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
        <Textarea
          name="content"
          placeholder="Content (HTML format)"
          value={blog.content}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground"
        >
          Save Blog Post
        </Button>
      </form>
    </div>
  );
};

export default ContentManagement;
