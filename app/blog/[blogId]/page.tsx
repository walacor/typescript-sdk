"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { blogData } from "../../../data/blogData";
import DefaultLayout from "@/layout/default.layout";
import Image from "next/image";
import BaseMoreStories from "@/components/BaseMoreStories";

const BlogPost = () => {
  const params = useParams();
  const blogId = String(params && params.blogId);

  const blog = blogData.find((blog) => blog.id === blogId);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto py-12 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">{blog.title}</h1>
          <p className="text-gray-600 mb-6 text-center">{blog.description}</p>

          {!isImageLoaded && (
            <div className="w-full h-96 bg-muted animate-pulse rounded-md my-8" />
          )}

          <Image
            className={`my-8 transition-opacity duration-500 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            src={blog.imageSrc}
            alt={blog.title}
            width={800}
            height={500}
            onLoadingComplete={() => setIsImageLoaded(true)}
          />
          <div
            className="prose prose-lg dark:prose-invert flex flex-col gap-1 mx-auto"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <div className="mt-8 text-sm text-gray-600 text-center">
            <p>By {blog.authorName}</p>
            <p>{formatDate(blog.date)}</p>
          </div>
        </div>
        <BaseMoreStories currentBlogId={blogId} />
      </div>
    </DefaultLayout>
  );
};

export default BlogPost;
