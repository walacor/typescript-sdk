import BaseFooter from "@/components/BaseFooter";
import BaseHeader from "@/components/BaseHeader";
import React, { ReactNode } from "react";

export default function DefaultLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-col min-h-dvh">
      <BaseHeader />
      <div className="bg-primary text-primary-foreground p-4 text-center">
        Welcome to your Dashboard! Here you can manage your blog posts, profile,
        and settings.
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
