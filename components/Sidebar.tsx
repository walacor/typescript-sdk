import Link from "next/link";
import { FaHome, FaPlus, FaBlog, FaUser, FaDatabase, FaFish, FaJava } from "react-icons/fa";
import { usePathname } from "next/navigation";

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

  return (
    <div className="md:min-h-screen w-full sm:flex flex-col">
      {sidebarItems.map((item, index) => {
        const isActive = pathname === item.href;
        return (
          <Link
            className={`flex items-center justify-start border-b p-4 cursor-pointer transition-all ${isActive ? "bg-[#0f172a] text-white" : ""}`}
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
                <span className="font-semibold">{item.name}</span>
                <span className="text-sm text-gray-500">{item.description}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
