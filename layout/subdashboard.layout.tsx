"use client";

import React from "react";
import { useWalacorUser } from "@/hooks/user/useWalacorUser";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SubDashboardLayout({ children }: { children?: React.ReactNode }) {
  const { data: userData, loading } = useWalacorUser();
  const pathname = usePathname();

  if (loading) {
    return <div>Loading...</div>;
  }

  const hasAccess = (() => {
    if (userData && userData.userRole?.includes("AdminAccess")) return true;

    if (userData && userData.userRole?.includes("ReadWrite") && pathname && ["/dashboard", "/dashboard/role", "/dashboard/hooks", "/dashboard/my-blogs"].includes(pathname)) return true;

    if (pathname && ["/dashboard", "/dashboard/role", "/dashboard/hooks", "/dashboard/profile"].includes(pathname)) return true;

    return false;
  })();

  return (
    <>
      {hasAccess ? (
        <>
          {children}
          <div className="flex gap-1 w-full text-center justify-center text-xs text-gray-600">
            <p>by Walacor</p>
          </div>
        </>
      ) : (
        <div className="text-center py-8 mt-8 text-gray-600 px-8">
          <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
          <p className="text-gray-500">You do not have permission to view this page.</p>
          <Link href={"/dashboard/profile"} className="text-gray-500 hover:underline">
            Try assigning an &apos;Admin&apos; role with &apos;AdminAccess&apos; scope under the profile page. If there is no Admin role, create one under the roles page.
          </Link>
        </div>
      )}
    </>
  );
}
