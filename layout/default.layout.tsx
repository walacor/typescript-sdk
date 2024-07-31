import BaseFooter from "@/components/BaseFooter";
import BaseHeader from "@/components/BaseHeader";
import React, { ReactNode } from "react";

export default function DefaultLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-col min-h-dvh">
      <div className="bg-primary text-primary-foreground p-4 text-center text-sm">
        Welcome to Walacor! Here you can interface with our data platform via
        your blog posts, profile, and settings.
      </div>
      <BaseHeader />
      <main className="flex-1">{children}</main>
      <BaseFooter />
    </div>
  );
}
