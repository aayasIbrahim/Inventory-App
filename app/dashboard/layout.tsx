"use client";
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Menu } from "lucide-react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile top bar with hamburger */}
        <div className="md:hidden flex items-center justify-between  bg-gray-900 text-white p-4 shadow">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-white focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-semibold text-gray-800 text-lg text-white">Inventory App</span>
          <div /> {/* empty space for alignment */}
        </div>

        <main className="flex-1 md:ml-64 p-4 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
