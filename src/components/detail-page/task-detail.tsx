import { Badge } from "../berge";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { priorityColors } from "@/lib/helpers";
import type { TaskProps, TodoDetailProps } from "@/types/type";

export function TaskDetail({ data }: TodoDetailProps) {
  const { name, description, priority: priorityValue, status } = data;

  const priority = priorityValue.toLowerCase() as Lowercase<
    TaskProps["priority"]
  >;

  const priorityClasses =
    priorityColors[priority] || "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <div className="lg:col-span-2 space-y-6">
      <Card className="border-0 shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle
                className={`max-w-[816px] text-2xl mb-2 break-words whitespace-pre-wrap ${
                  status === "DONE"
                    ? "line-through text-slate-500 dark:text-slate-400"
                    : "text-slate-900 dark:text-slate-100"
                }`}
              >
                {name}
              </CardTitle>
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className={priorityClasses}>
                  {priority} priority
                </Badge>
                {status === "DONE" && (
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 border-green-200"
                  >
                    Completed
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate max-w-none">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Description
            </h4>
            <p
              className={`text-slate-700 dark:text-slate-300 leading-relaxed break-words whitespace-pre-wrap ${
                status === "DONE" ? "line-through opacity-75" : ""
              }`}
            >
              {description || name || "No description"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
