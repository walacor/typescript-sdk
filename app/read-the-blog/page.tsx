import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="text-lg font-bold">Acme Blog</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="#"
              className="text-sm font-medium hover:underline hover:underline-offset-4"
              prefetch={false}
            >
              Blog
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline hover:underline-offset-4"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline hover:underline-offset-4"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
          <div className="relative flex-1 md:max-w-md">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-muted pl-8"
            />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="border-b">
          <div className="container flex flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:gap-16 md:px-6 md:py-16 lg:py-24">
            <div className="flex-1">
              <img
                src="/placeholder.svg"
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
                  The Future of Web Development
                </h1>
              </div>
              <p className="text-muted-foreground">
                Explore the latest trends and technologies shaping the future of
                web development.
              </p>
              <Link
                href="#"
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
            <Card>
              <CardContent>
                <img
                  src="/placeholder.svg"
                  width={800}
                  height={500}
                  alt="Blog Post"
                  className="aspect-[16/10] w-full rounded-lg object-cover"
                />
                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div>John Doe</div>
                    <div>•</div>
                    <div>May 1, 2023</div>
                  </div>
                  <h3 className="text-xl font-bold">
                    Mastering React: A Comprehensive Guide
                  </h3>
                  <p className="line-clamp-3 text-muted-foreground">
                    Dive into the world of React, the popular JavaScript library
                    for building user interfaces. Learn how to create
                    high-performance, scalable web applications with React's
                    powerful features and ecosystem.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <img
                  src="/placeholder.svg"
                  width={800}
                  height={500}
                  alt="Blog Post"
                  className="aspect-[16/10] w-full rounded-lg object-cover"
                />
                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div>Jane Smith</div>
                    <div>•</div>
                    <div>April 15, 2023</div>
                  </div>
                  <h3 className="text-xl font-bold">
                    Exploring the Power of Serverless Computing
                  </h3>
                  <p className="line-clamp-3 text-muted-foreground">
                    Discover the benefits of serverless computing and how it can
                    revolutionize your web development workflow. Learn how to
                    build scalable, cost-effective applications with serverless
                    technologies like AWS Lambda, Azure Functions, and Google
                    Cloud Functions.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <img
                  src="/placeholder.svg"
                  width={800}
                  height={500}
                  alt="Blog Post"
                  className="aspect-[16/10] w-full rounded-lg object-cover"
                />
                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div>Sarah Johnson</div>
                    <div>•</div>
                    <div>March 28, 2023</div>
                  </div>
                  <h3 className="text-xl font-bold">
                    Optimizing Web Performance: Strategies and Tools
                  </h3>
                  <p className="line-clamp-3 text-muted-foreground">
                    Learn how to optimize your web applications for
                    lightning-fast performance. Explore techniques like code
                    splitting, image optimization, and lazy loading, as well as
                    the best tools and frameworks to measure and improve your
                    site's speed.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <img
                  src="/placeholder.svg"
                  width={800}
                  height={500}
                  alt="Blog Post"
                  className="aspect-[16/10] w-full rounded-lg object-cover"
                />
                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div>Michael Brown</div>
                    <div>•</div>
                    <div>February 12, 2023</div>
                  </div>
                  <h3 className="text-xl font-bold">
                    Building Accessible Web Applications
                  </h3>
                  <p className="line-clamp-3 text-muted-foreground">
                    Discover the importance of web accessibility and learn how
                    to create inclusive web applications that cater to users
                    with disabilities. Explore best practices, tools, and
                    techniques to ensure your website is accessible to all.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <img
                  src="/placeholder.svg"
                  width={800}
                  height={500}
                  alt="Blog Post"
                  className="aspect-[16/10] w-full rounded-lg object-cover"
                />
                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div>Emily Davis</div>
                    <div>•</div>
                    <div>January 5, 2023</div>
                  </div>
                  <h3 className="text-xl font-bold">
                    Mastering CSS: Advanced Techniques and Concepts
                  </h3>
                  <p className="line-clamp-3 text-muted-foreground">
                    Dive deep into the world of CSS and learn advanced
                    techniques to take your web designs to the next level.
                    Explore topics like responsive design, CSS-in-JS, and modern
                    layout methodologies to create stunning, visually appealing
                    interfaces.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <img
                  src="/placeholder.svg"
                  width={800}
                  height={500}
                  alt="Blog Post"
                  className="aspect-[16/10] w-full rounded-lg object-cover"
                />
                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div>David Lee</div>
                    <div>•</div>
                    <div>December 1, 2022</div>
                  </div>
                  <h3 className="text-xl font-bold">
                    Unleashing the Power of GraphQL: A Beginner's Guide
                  </h3>
                  <p className="line-clamp-3 text-muted-foreground">
                    Explore the benefits of GraphQL, a powerful query language
                    for APIs, and learn how to use it to build efficient,
                    flexible, and scalable web applications. Discover how
                    GraphQL can simplify your data fetching and improve the user
                    experience of your application.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <aside className="border-t bg-muted py-12 md:py-16 lg:py-24">
        <div className="container grid grid-cols-1 gap-12 px-4 md:grid-cols-3 md:gap-16 md:px-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold">Categories</h3>
              <div className="mt-4 space-y-2">
                <Link
                  href="#"
                  className="text-sm font-medium hover:underline hover:underline-offset-4"
                  prefetch={false}
                >
                  Web Development
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium hover:underline hover:underline-offset-4"
                  prefetch={false}
                >
                  Design
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium hover:underline hover:underline-offset-4"
                  prefetch={false}
                >
                  DevOps
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium hover:underline hover:underline-offset-4"
                  prefetch={false}
                >
                  Programming
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold">Popular Posts</h3>
              <div className="mt-4 space-y-4">
                <Link
                  href="#"
                  className="flex items-center gap-4"
                  prefetch={false}
                >
                  <img
                    src="/placeholder.svg"
                    width={80}
                    height={80}
                    alt="Popular Post"
                    className="aspect-square w-20 rounded-lg object-cover"
                  />
                  <div className="space-y-1">
                    <h4 className="text-base font-medium">
                      The Future of Web Development
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      May 1, 2023
                    </div>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4"
                  prefetch={false}
                >
                  <img
                    src="/placeholder.svg"
                    width={80}
                    height={80}
                    alt="Popular Post"
                    className="aspect-square w-20 rounded-lg object-cover"
                  />
                  <div className="space-y-1">
                    <h4 className="text-base font-medium">
                      Mastering React: A Comprehensive Guide
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      April 15, 2023
                    </div>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4"
                  prefetch={false}
                >
                  <img
                    src="/placeholder.svg"
                    width={80}
                    height={80}
                    alt="Popular Post"
                    className="aspect-square w-20 rounded-lg object-cover"
                  />
                  <div className="space-y-1">
                    <h4 className="text-base font-medium">
                      Exploring the Power of Serverless Computing
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      March 28, 2023
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-bold">Newsletter</h3>
              <p className="mt-4 text-muted-foreground">
                Subscribe to our newsletter to stay up-to-date with the latest
                blog posts and industry news.
              </p>
              <form className="mt-6 flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
            <div>
              <h3 className="text-xl font-bold">About the Author</h3>
              <div className="mt-4 flex items-center gap-4">
                <img
                  src="/placeholder.svg"
                  width={80}
                  height={80}
                  alt="Author"
                  className="aspect-square w-20 rounded-full object-cover"
                />
                <div className="space-y-1">
                  <h4 className="text-base font-medium">John Doe</h4>
                  <p className="text-sm text-muted-foreground">
                    John Doe is a web developer and tech enthusiast. He has been
                    building web applications for over a decade and is
                    passionate about sharing his knowledge with the community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <footer className="bg-muted py-6 text-sm text-muted-foreground">
        <div className="container flex items-center justify-between px-4 " />
      </footer>
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
