import React from "react";
import blogData from "../data/blogs.json";
import BaseBlogCard from "@/components/BaseBlogCard";

interface BaseMoreStoriesProps {
  currentBlogId: string;
}

const BaseMoreStories: React.FC<BaseMoreStoriesProps> = ({ currentBlogId }) => {
  const currentIndex = blogData.findIndex((blog) => blog.id === currentBlogId);

  // Handle circular slicing
  const nextBlogs = [];
  for (let i = 1; i <= 3; i++) {
    nextBlogs.push(blogData[(currentIndex + i) % blogData.length]);
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">More Stories</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {nextBlogs.map((blog) => (
          <BaseBlogCard
            key={blog.id}
            id={blog.id}
            href={blog.href}
            imageSrc={blog.imageSrc}
            imageAlt={blog.imageAlt}
            title={blog.title}
            description={blog.description}
            authorName={blog.authorName}
            authorImage={blog.authorImage}
            authorFallback={blog.authorFallback}
            date={blog.date}
          />
        ))}
      </div>
    </div>
  );
};

export default BaseMoreStories;
