/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kXYbJsReJ8w
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="text-xl font-bold">Blog Starter Kit</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
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
              About
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
          <div className="relative md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-4 p-4">
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
                    About
                  </Link>
                  <Link
                    href="#"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    Contact
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8 px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div>
            <img
              src="/placeholder.svg"
              width={1200}
              height={600}
              alt="Featured Image"
              className="rounded-lg object-cover aspect-[2/1]"
            />
            <div className="mt-4 space-y-2">
              <div className="text-sm text-muted-foreground">
                Published on <time>June 1, 2023</time> by{" "}
                <Link
                  href="#"
                  className="font-medium hover:underline"
                  prefetch={false}
                >
                  John Doe
                </Link>
              </div>
              <h2 className="text-3xl font-bold">
                The Ultimate Guide to React Hooks
              </h2>
              <p className="text-muted-foreground">
                Discover the power of React Hooks and how they can revolutionize
                your web development workflow.
              </p>
            </div>
          </div>
          <div className="prose prose-lg dark:prose-invert">
            <h2>Introduction to React Hooks</h2>
            <p>
              React Hooks are a powerful feature introduced in React 16.8, which
              allow you to add state and lifecycle methods to functional
              components. Prior to Hooks, you had to use class components to
              manage state and lifecycle methods, but with Hooks, you can now do
              the same in functional components, making your code more concise
              and easier to understand.
            </p>
            <h2>The Most Useful React Hooks</h2>
            <p>Some of the most commonly used React Hooks include:</p>
            <ul>
              <li>
                <strong>useState</strong>: Allows you to add state to functional
                components.
              </li>
              <li>
                <strong>useEffect</strong>: Allows you to perform side effects
                in functional components, such as fetching data or setting up
                event listeners.
              </li>
              <li>
                <strong>useContext</strong>: Allows you to access the React
                context in your functional components.
              </li>
              <li>
                <strong>useReducer</strong>: Provides an alternative to useState
                for more complex state management.
              </li>
            </ul>
            <h2>Conclusion</h2>
            <p>Lorem ipsum</p>
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Link
                  href="#"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  prefetch={false}
                >
                  React
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  prefetch={false}
                >
                  JavaScript
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  prefetch={false}
                >
                  Web Development
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  prefetch={false}
                >
                  Tutorials
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Link
                  href="#"
                  className="flex items-center gap-4 hover:underline underline-offset-4"
                  prefetch={false}
                >
                  <img
                    src="/placeholder.svg"
                    width={80}
                    height={60}
                    alt="Recent Post"
                    className="rounded-lg object-cover aspect-[4/3]"
                  />
                  <div>
                    <h3 className="text-sm font-medium">
                      Mastering CSS Grid: A Comprehensive Guide
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      June 15, 2023
                    </div>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 hover:underline underline-offset-4"
                  prefetch={false}
                >
                  <img
                    src="/placeholder.svg"
                    width={80}
                    height={60}
                    alt="Recent Post"
                    className="rounded-lg object-cover aspect-[4/3]"
                  />
                  <div>
                    <h3 className="text-sm font-medium">
                      The Power of TypeScript: Enhancing Your JavaScript Skills
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      June 1, 2023
                    </div>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 hover:underline underline-offset-4"
                  prefetch={false}
                >
                  <img
                    src="/placeholder.svg"
                    width={80}
                    height={60}
                    alt="Recent Post"
                    className="rounded-lg object-cover aspect-[4/3]"
                  />
                  <div>
                    <h3 className="text-sm font-medium">
                      Optimizing Website Performance: Best Practices and
                      Techniques
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      May 25, 2023
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search blog posts..."
                  className="w-full rounded-lg bg-background pl-8"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="bg-muted text-muted-foreground py-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="text-sm">
            &copy; 2024 Blog Starter Kit. All rights reserved.
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Terms
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function MenuIcon(props: any) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
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
