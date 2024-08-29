"use client";

import "@/app/globals.css";

import React, { ReactNode } from "react";
import Link from "next/link";
import DefaultLayout from "./default.layout";
import {
  FaHome,
  FaPlus,
  FaBlog,
  FaUser,
  FaDatabase,
  FaFish,
  FaJava,
} from "react-icons/fa";
import { useCheckAndAddUser } from "@/hooks/user/useCheckAndAddUser";
import { usePathname, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const sidebarItems = [
  {
    name: "Home",
    href: "/dashboard",
    icon: <FaHome />,
    description: "Dashboard overview",
  },
  {
    name: "Create",
    href: "/dashboard/create",
    icon: <FaPlus />,
    description: "Create new content",
  },
  {
    name: "My Blogs",
    href: "/dashboard/my-blogs",
    icon: <FaBlog />,
    description: "View your blogs",
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: <FaUser />,
    description: "Edit your profile",
  },
  {
    name: "Roles",
    href: "/dashboard/role",
    icon: <FaJava />,
    description: "Edit your roles",
  },
  {
    name: "Schemas",
    href: "/dashboard/schemas",
    icon: <FaDatabase />,
    description: "View Schemas",
  },
  {
    name: "Hooks",
    href: "/dashboard/hooks",
    icon: <FaFish />,
    description: "View Hooks",
  },
];

export default function DashboardLayout({
  children,
}: {
  children?: ReactNode;
}) {
  useCheckAndAddUser();
  const pathname = usePathname();
  const params = useParams();

  return (
    <DefaultLayout>
      <div className="flex flex-col sm:flex-row">
        <div className="md:min-h-screen w-full sm:flex flex-col hidden">
          {sidebarItems.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <Link
                className={`flex items-center justify-start border-b p-4 cursor-pointer transition-all ${
                  isActive ? "bg-[#0f172a] text-white" : ""
                }`}
                key={index}
                href={item.href}
                style={{
                  backgroundColor: isActive ? "#0f172a" : "white",
                  color: isActive ? "white" : "black",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "#0f172a";
                    e.currentTarget.style.color = "white";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = "black";
                  }
                }}
              >
                <div className="flex items-center space-x-2 gap-4">
                  {item.icon}
                  <div className="flex flex-col">
                    <span className="font-bold">{item.name}</span>
                    <span className="text-sm text-gray-500">
                      {item.description}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="bg-muted max-w-[1440px] mx-auto sm:py-12 min-h-screen w-full">
          <AnimatePresence>
            <motion.div
              key={String(params?.path)}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </DefaultLayout>
  );
}
