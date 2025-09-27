import { Card, CardContent, CardHeader } from "../card";
import { Skeleton } from "../skeleton";

export function TodoCardSkeleton() {
  return (
    <Card className="border-0 shadow-sm dark:bg-slate-800 dark:border-slate-700 bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <Skeleton className="h-5 w-5 rounded-full bg-slate-300 dark:bg-slate-600" />
            <Skeleton className="h-4 w-full rounded bg-slate-300 dark:bg-slate-600" />
          </div>
          <Skeleton className="h-5 w-12 rounded bg-slate-300 dark:bg-slate-600 ml-5" />
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="mb-4 space-y-2">
          <Skeleton className="h-3 w-full bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-3 w-5/6 bg-slate-200 dark:bg-slate-700" />
        </div>

        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-20 bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-5 w-5 rounded bg-slate-300 dark:bg-slate-600" />
            <Skeleton className="h-5 w-5 rounded bg-slate-300 dark:bg-slate-600" />
            <Skeleton className="h-5 w-5 rounded bg-slate-300 dark:bg-slate-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
