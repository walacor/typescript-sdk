import React from "react";
import Link from "next/link";
import BaseBlogCard from "@/components/BaseBlogCard";
import { blogData } from "../data/blogData";

export default function BaseBanner() {
  const featuredBlog = blogData[0];

  return (
    <section className="w-full pt-12 md:pt-24 lg:pt-32 p-8">
      <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
        <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
          <div>
            <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              The Ultimate Blog Starter Kit
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Beautifully designed components that you can copy and paste into
              your blog.
            </p>
            <div className="space-x-4 mt-6">
              <Link
                href="/read-the-blog"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Read the Blog
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-4 w-full">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm mt-8 md:mt-0">
              Featured Posts
            </div>
            <div className="flex flex-col items-center justify-center">
              <BaseBlogCard
                id={featuredBlog.id}
                key={featuredBlog.id}
                href={featuredBlog.href}
                imageSrc={featuredBlog.imageSrc}
                imageAlt={featuredBlog.imageAlt}
                title={featuredBlog.title}
                description={featuredBlog.description}
                authorName={featuredBlog.authorName}
                authorImage={featuredBlog.authorImage}
                authorFallback={featuredBlog.authorFallback}
                date={featuredBlog.date}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
