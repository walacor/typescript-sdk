import React, { ReactNode } from "react";

export default function DefaultLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col justify-start items-center p-8">
      {children}
    </div>
  );
}
