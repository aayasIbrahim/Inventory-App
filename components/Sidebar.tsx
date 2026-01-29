"use client";

import React from "react";
import { BarChart3, Package, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@stackframe/stack";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean; // Currently not used; can be used for mobile toggle
  setIsOpen: (open: boolean) => void;
}

function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  // Navigation items
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Inventory", href: "/dashboard/inventory", icon: Package },
    { name: "Add Product", href: "/dashboard/add-product", icon: Plus },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div
      className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-30
          transform transition-transform duration-300
          md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
    >
      {/* Logo / Brand */}
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <BarChart3 className="w-7 h-7 text-purple-500" /> {/* icon color */}
          <span className="text-lg font-semibold">Inventory App</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          <div className="text-sm font-semibold text-gray-400 uppercase">
            Inventory
          </div>

          {navigation.map((item, key) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;
            // highlight active page

            return (
              <Link
                href={item.href}
                key={key}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setIsOpen(false);
                  }
                }}
                className={`
                  flex items-center space-x-3 py-2 px-3 rounded-lg
                  transition-colors duration-200
                  ${isActive ? "bg-purple-100 text-gray-800" : "hover:bg-gray-800 text-gray-300"}
                `}
              >
                <IconComponent
                  className={`w-5 h-5 ${isActive ? "text-gray-800" : "text-gray-300"}`}
                />
                <span className="text-sm truncate">{item.name}</span>{" "}
                {/* truncate for long names */}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Button */}
      <div className="p-6 border-t border-gray-700">
        <UserButton showUserInfo /> {/* Stackframe user button */}
      </div>
    </div>
  );
}

export default Sidebar;
