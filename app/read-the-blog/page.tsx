import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import blogData from "../../data/blogs.json";
import DefaultLayout from "@/layout/default.layout";
import BaseBlogCard from "@/components/BaseBlogCard";

export default function ReadTheBlog() {
  return (
    <DefaultLayout>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <main className="flex-1">
          <section className="border-b">
            <div className="container flex flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:gap-16 md:px-6 md:py-16 lg:py-24">
              <div className="flex-1">
                <img
                  src="https://images-walacor.s3.us-west-2.amazonaws.com/blog-post-1.jpg"
                  width={800}
                  height={500}
                  alt="Featured Post"
                  className="aspect-[16/10] w-full rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                    Featured
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Introducing the Ultimate Blog Starter Kit
                  </h1>
                </div>
                <p className="text-muted-foreground">
                  Discover the powerful features and customizable components
                  that will take your blog to the next level.
                </p>
                <Link
                  href="/blog/1"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Read More
                </Link>
              </div>
            </div>
          </section>
          <section className="py-12 md:py-16 lg:py-24">
            <div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:gap-12 md:px-6 lg:grid-cols-3 lg:gap-16">
              {blogData.map((blog) => (
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
          </section>
        </main>
      </div>
    </DefaultLayout>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
