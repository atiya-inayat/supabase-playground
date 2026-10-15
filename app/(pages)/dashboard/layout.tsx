"use client";

import { useState } from "react";
import SideBar from "@/app/components/SideBar";
import { TaskCountsProvider } from "@/app/context/TaskCountContext";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <TaskCountsProvider>
      <div className="min-h-screen w-full">
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main
          className={`${
            sidebarOpen ? "ml-64" : "ml-16"
          } min-w-0 transition-all duration-300`}
        >
          {children}
        </main>
      </div>
    </TaskCountsProvider>
  );
}
