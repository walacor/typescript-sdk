import Link from "next/link";
import { blogData } from "../../data/blogData";
import DefaultLayout from "@/layout/default.layout";
import BaseBlogCard from "@/components/BaseBlogCard";

export default function ReadTheBlog() {
  return (
    <DefaultLayout>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <main className="flex-1">
          <section className="bg-muted">
            <div className="container flex flex-col gap-8 px-4 py-12 items-center md:gap-16 md:px-6 md:py-16 lg:py-24">
              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm">
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
                  href={`blog/${blogData[0].id}`}
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Read More
                </Link>
              </div>
            </div>
          </section>
          <section className="py-12 md:py-16 lg:py-24">
            <div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:gap-7 md:px-6 lg:grid-cols-3 lg:gap-7">
              {blogData.map((blog) => (
                <BaseBlogCard
                  key={blog.id}
                  id={blog.id}
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
