import React from "react";
import Sidebar from "../../components/Sidebar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar currentPath="/dashboard" />

      {/* Main content */}
      <main className=" md:ml-64 p-4 transition-all duration-300 mt-9 bg-white text-gray-800">
        {children}
      </main>
    </>
  );
}

export default DashboardLayout;
