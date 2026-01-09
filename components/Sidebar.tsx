"use client"
import React from "react";
import { BarChart3, Package, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@stackframe/stack";
import { usePathname } from "next/navigation";


function Sidebar() {
 const pathname = usePathname();
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Inventory", href: "/dashboard/inventory", icon: Package },
    { name: "Add Product", href: "/dashboard/add-product", icon: Plus },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];
  return (
    <div className="min-h-screen bg-gray-900 w-64 fixed top-0 left-0 text-white ">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="w-7 h-7" />
          <span className="text-lg font-semibold">Inventory App</span>
        </div>
      </div>

      <nav className="space-y-1">
        <div className="text-sm font-semibold text-gray-400 uppercase">
          Iventory
        </div>
        {navigation.map((item, key) => {

          const IconComponent = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              href={item.href}
              key={key}
              className={`flex items-center space-x-3 py-2 px-3 rounded-lg ${
                isActive
                  ? "bg-purple-100 text-gray-800"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-6 borter-t border-gray-700">
        <div className="flex items-center justify-between">
          < UserButton showUserInfo />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
