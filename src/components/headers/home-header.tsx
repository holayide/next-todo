import { AlertTriangle } from "lucide-react";
import Link from "next/link.js";

import { ThemeToggle } from "@/components/theme-toggle";
import { NewTaskBtn } from "@/components/new-task";

function HomeHeader() {
  return (
    <>
      <div className="xs:flex items-center justify-between mb-8 xs:mb-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            My Tasks
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Organize and track your daily tasks efficiently
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-3 xs:mt-0">
          <ThemeToggle />
          <NewTaskBtn />
        </div>
      </div>

      <Link
        href="/test-err"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Test Error Boundary"
      >
        <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center shadow-md hover:bg-rose-600 transition-colors">
          <AlertTriangle className="w-5 h-5 text-white" />
        </div>

        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-foreground dark:bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Test Error Boundary
        </div>
      </Link>
    </>
  );
}

export default HomeHeader;
