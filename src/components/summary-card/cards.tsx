import { useQuery } from "@tanstack/react-query";

import { useTasksQueryOptions } from "@/services/queryOptions";
import { Card, CardContent } from "@/components/card";
import type { CardsProps, TaskProps } from "@/types/type";
import CardSkeleton from "./card-skeleton";

import { AlertCircle } from "lucide-react";
import { Clock } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { Calendar } from "lucide-react";

export function Cards({ page }: CardsProps) {
  const { data, isLoading, isError, error } = useQuery(
    useTasksQueryOptions({ page })
  );

  // if (isLoading) return <div>Loading tasks...</div>;

  const tasks: TaskProps[] = data?.data || [];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((todo) => todo.status === "DONE").length;
  const pendingTasks = tasks.filter((todo) => todo.status !== "DONE").length;
  const highPriorityTasks = tasks.filter(
    (todo) => todo.priority === "HIGH"
  ).length;

  return (
    <div className="">
      {isError && (
        <div className="text-center text-red-500">
          Error loading tasks: {error.message}
        </div>
      )}

      {isLoading && (
        // <div className="mb-8 text-center text-gray-500 dark:text-gray-400">
        //   Loading tasks...
        // </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700">
            <CardContent className="px-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Total Tasks
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {totalTasks}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700">
            <CardContent className="px-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Completed
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {completedTasks}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700">
            <CardContent className="px-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Pending
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {pendingTasks}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700">
            <CardContent className="px-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    High Priority
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {highPriorityTasks}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
