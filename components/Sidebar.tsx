import { useState, useEffect } from "react";
import Link from "next/link";
import { FaHome, FaPlus, FaBlog, FaUser, FaDatabase, FaFish, FaJava } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const sidebarItems = [
  { name: "Home", href: "/dashboard", icon: <FaHome />, description: "Dashboard overview" },
  { name: "Schemas", href: "/dashboard/schemas", icon: <FaDatabase />, description: "View Schemas" },
  { name: "Create", href: "/dashboard/create", icon: <FaPlus />, description: "Create new content" },
  { name: "My Blogs", href: "/dashboard/my-blogs", icon: <FaBlog />, description: "View your blogs" },
  { name: "Profile", href: "/dashboard/profile", icon: <FaUser />, description: "Edit your profile" },
  { name: "Roles", href: "/dashboard/role", icon: <FaJava />, description: "Edit your roles" },
  { name: "Hooks", href: "/dashboard/hooks", icon: <FaFish />, description: "View Hooks" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [loadingItem, setLoadingItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleClick = (href: string) => {
    if (pathname === href) return;
    setLoadingItem(href);
  };

  return (
    <div className="md:min-h-screen w-full sm:flex flex-col">
      {sidebarItems.map((item, index) => {
        const isActive = pathname === item.href;
        const isLoading = loadingItem === item.href;
        const isHovered = hoveredItem === item.href;

        return (
          <Link
            key={index}
            href={item.href}
            className={`flex items-center justify-start border-b p-4 cursor-pointer transition-all ${isActive ? "bg-[#0f172a] text-white" : ""}`}
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
              setHoveredItem(item.href);
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "black";
              }
              setHoveredItem(null);
            }}
            onClick={() => handleClick(item.href)}
          >
            <div className="w-6 h-6 flex justify-center items-center">
              {isLoading ? (
                <motion.div className={`ml-2 animate-spin ${isHovered || isActive ? "text-white" : "text-primary"}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12h1.5M12 4v1.5M19.5 12H21M12 19.5V21M16.24 7.76l-1.06 1.06M7.76 16.24l1.06-1.06M16.24 16.24l-1.06-1.06M7.76 7.76l1.06 1.06" />
                  </svg>
                </motion.div>
              ) : (
                item.icon
              )}
            </div>
            <div className="flex flex-col ml-4">
              <span className="font-semibold">{item.name}</span>
              <span className="text-sm text-gray-500">{item.description}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
