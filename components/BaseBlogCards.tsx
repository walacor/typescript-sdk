import React from "react";
import BlogPicture2 from "../assets/blog-post-2.jpg";
import BlogPicture3 from "../assets/blog-post-3.jpg";
import BlogPicture4 from "../assets/blog-post-4.jpg";
import BaseBlogCard from "@/components/BaseBlogCard";

export default function BaseBlogCards() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container space-y-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Latest Posts
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Explore Our Blog
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover a wealth of insights and inspiration from our talented
              writers.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 justify-center items-start">
          <BaseBlogCard
            href="#"
            imageSrc={BlogPicture2}
            imageAlt="Post 2"
            title="The Art of Crafting Compelling Blog Titles"
            description="Learn the secrets to writing irresistible blog titles that grab your readers' attention."
            authorName="John Doe"
            authorImage="/placeholder-user.jpg"
            authorFallback="JD"
          />
          <BaseBlogCard
            href="#"
            imageSrc={BlogPicture3}
            imageAlt="Post 3"
            title="Unlocking the Power of SEO for Bloggers"
            description="Discover proven strategies to optimize your blog content and drive more traffic."
            authorName="Jane Smith"
            authorImage="/placeholder-user.jpg"
            authorFallback="JS"
          />
          <BaseBlogCard
            href="#"
            imageSrc={BlogPicture4}
            imageAlt="Post 4"
            title="Mastering the Art of Guest Blogging"
            description="Learn how to leverage guest posting to expand your audience and build your authority."
            authorName="Michael Johnson"
            authorImage="/placeholder-user.jpg"
            authorFallback="MJ"
          />
        </div>
      </div>
    </section>
  );
}
