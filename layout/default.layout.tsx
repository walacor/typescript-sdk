import BaseFooter from "@/components/BaseFooter";
import BaseHeader from "@/components/BaseHeader";
import React, { ReactNode } from "react";

export default function DefaultLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-col min-h-dvh">
      <BaseHeader />
      <main className="flex-1">{children}</main>
      <BaseFooter />
    </div>
  );
}
