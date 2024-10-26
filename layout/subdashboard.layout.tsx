"use client";

export default function SubDashboardLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="flex gap-1 w-full text-center justify-center text-xs text-gray-600">
        <p>by Walacor</p>
      </div>
    </>
  );
}
