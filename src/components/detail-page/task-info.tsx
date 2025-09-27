import { formatDate } from "@/lib/helpers";
import { Card, CardContent, CardHeader, CardTitle } from "../card";

import { User, Clock, Calendar } from "lucide-react";
import type { TodoDetailProps } from "@/types/type";

export function TaskInfo({ data }: TodoDetailProps) {
  const { status, createdAt, updatedAt } = data;

  return (
    <Card className="border-0 shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="text-lg">Task Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Created
            </p>
            <p className="text-sm text-slate-900 dark:text-slate-100">
              {formatDate(createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Updated Date
            </p>
            <p className="text-sm text-slate-900 dark:text-slate-100">
              {formatDate(updatedAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <User className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Status
            </p>
            <p className="text-sm text-slate-900 dark:text-slate-100">
              {status === "DONE" ? "Completed" : "In Progress"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
