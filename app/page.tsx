/**
 * v0 by Vercel.
 * @see https://v0.dev/t/mBooPTlaLS3
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Component() {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <MountainIcon className="size-6" />
          <span className="sr-only">Acme Blog</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Blog
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            CMS
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  The Ultimate Blog Starter Kit
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Beautifully designed components that you can copy and paste
                  into your blog.
                </p>
                <div className="space-x-4 mt-6">
                  <Link
                    href="/read-the-blog"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Read the Blog
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Manage Content
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Featured Posts
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Link
                    href="#"
                    className="group grid gap-2 bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    prefetch={false}
                  >
                    <img
                      src="/placeholder.svg"
                      width={400}
                      height={225}
                      alt="Post 1"
                      className="aspect-video object-cover"
                    />
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-semibold group-hover:underline">
                        Introducing the Ultimate Blog Starter Kit
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">
                        Discover the powerful features and customizable
                        components that will take your blog to the next level.
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="group grid gap-2 bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    prefetch={false}
                  >
                    <img
                      src="/placeholder.svg"
                      width={400}
                      height={225}
                      alt="Post 2"
                      className="aspect-video object-cover"
                    />
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-semibold group-hover:underline">
                        Mastering the Art of Blogging
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">
                        Learn the secrets to creating engaging and
                        thought-provoking blog content.
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="group grid gap-2 bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    prefetch={false}
                  >
                    <img
                      src="/placeholder.svg"
                      width={400}
                      height={225}
                      alt="Post 3"
                      className="aspect-video object-cover"
                    />
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-semibold group-hover:underline">
                        The Power of Storytelling in Blogging
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">
                        Discover how to captivate your audience with compelling
                        narratives.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
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
                  Discover a wealth of insights and inspiration from our
                  talented writers.
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                href="#"
                className="group grid gap-2 bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                prefetch={false}
              >
                <img
                  src="/placeholder.svg"
                  width={400}
                  height={225}
                  alt="Post 4"
                  className="aspect-video object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold group-hover:underline">
                    The Art of Crafting Compelling Blog Titles
                  </h3>
                  <p className="text-muted-foreground line-clamp-2">
                    Learn the secrets to writing irresistible blog titles that
                    grab your readers' attention.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <span>John Doe</span>
                  </div>
                </div>
              </Link>
              <Link
                href="#"
                className="group grid gap-2 bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                prefetch={false}
              >
                <img
                  src="/placeholder.svg"
                  width={400}
                  height={225}
                  alt="Post 5"
                  className="aspect-video object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold group-hover:underline">
                    Unlocking the Power of SEO for Bloggers
                  </h3>
                  <p className="text-muted-foreground line-clamp-2">
                    Discover proven strategies to optimize your blog content and
                    drive more traffic.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <span>Jane Smith</span>
                  </div>
                </div>
              </Link>
              <Link
                href="#"
                className="group grid gap-2 bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                prefetch={false}
              >
                <img
                  src="/placeholder.svg"
                  width={400}
                  height={225}
                  alt="Post 6"
                  className="aspect-video object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold group-hover:underline">
                    Mastering the Art of Guest Blogging
                  </h3>
                  <p className="text-muted-foreground line-clamp-2">
                    Learn how to leverage guest posting to expand your audience
                    and build your authority.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <span>Michael Johnson</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <article className="prose prose-gray mx-auto dark:prose-invert">
              <div className="space-y-2 not-prose">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
                  Mastering the Art of Blogging
                </h1>
                <p className="text-muted-foreground">
                  Posted on August 24, 2023 by John Doe
                </p>
              </div>
              <p>
                Blogging has become an essential part of the modern digital
                landscape, allowing individuals and businesses to share their
                ideas, experiences, and expertise with the world. However,
                mastering the art of blogging is no easy feat. It requires a
                combination of creativity, strategic thinking, and a deep
                understanding of your audience.
              </p>
              <p>
                In this blog post, we will explore the key elements of
                successful blogging and provide you with practical tips and
                strategies to help you elevate your blog to new heights.
              </p>
              <h2>Crafting Compelling Content</h2>
              <p>
                The foundation of any successful blog is the content itself.
                Your blog posts should be informative, engaging, and tailored to
                the needs and interests of your target audience. This means
                conducting thorough research, identifying pain points, and
                crafting content that provides genuine value to your readers.
              </p>
              <p>
                One of the most important aspects of content creation is
                storytelling. Weaving a narrative throughout your blog posts can
                help you connect with your audience on a deeper level, making
                your content more memorable and impactful.
              </p>
              <h2>Optimizing for Search Engines</h2>
              <p>
                In today's digital landscape, search engine optimization (SEO)
                is crucial for the success of your blog. By incorporating
                relevant keywords, optimizing your meta tags and descriptions,
                and creating a user-friendly website structure, you can increase
                the visibility of your blog and drive more organic traffic to
                your content.
              </p>
              <p>
                Additionally, leveraging social media platforms and building a
                strong online presence can further amplify the reach of your
                blog and help you connect with a wider audience.
              </p>
              <h2>Fostering Engagement and Community</h2>
              <p>
                Successful bloggers understand the importance of building a
                loyal community around their content. Encouraging interaction
                through comments, social media, and other engagement channels
                can help you better understand your audience, gather valuable
                feedback, and foster a sense of belonging.
              </p>
              <p>
                By consistently producing high-quality content, engaging with
                your readers, and continuously adapting to their needs, you can
                establish your blog as a trusted and authoritative resource in
                your niche.
              </p>
              <h2>Conclusion</h2>
              <p>
                Mastering the art of blogging is a journey, but with the right
                strategies and a commitment to providing value to your audience,
                you can create a thriving and successful blog. By focusing on
                compelling content, optimizing for search engines, and fostering
                a engaged community, you can transform your blog into a powerful
                platform for sharing your ideas and building your online
                presence.
              </p>
            </article>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Manage Your Blog with Ease
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our powerful CMS allows you to effortlessly create, edit, and
                publish your blog content.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Access the CMS
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
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
