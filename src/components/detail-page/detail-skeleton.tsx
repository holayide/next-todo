import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Skeleton } from "../skeleton";

export function DetailPageSkeleton() {
  return (
    <>
      <div className="xs:flex items-center justify-between mb-8 space-y-4 xs:space-y-0">
        <Skeleton className="h-6 w-1/4 bg-slate-300 dark:bg-slate-600" />
        <Skeleton className="h-8 w-2/4 rounded-md bg-slate-300 dark:bg-slate-600" />
      </div>

      <div className="pt-6 xs:pt-10 flex flex-col gap-8">
        <Card className="border-0 shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700 mb-6">
          <CardHeader>
            <div className="space-y-2 mb-3">
              <Skeleton className="h-6 w-2/3 bg-slate-200 dark:bg-slate-700" />
              <div className="flex space-x-2">
                <Skeleton className="h-5 w-24 rounded-full bg-slate-300 dark:bg-slate-600" />
                <Skeleton className="h-5 w-24 rounded-full bg-slate-300 dark:bg-slate-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-24 mb-3 bg-slate-200 dark:bg-slate-700" />
            <Skeleton className="h-10 w-full bg-slate-200 dark:bg-slate-700" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg">Task Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-lg" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-24 bg-slate-200 dark:bg-slate-70" />
                  <Skeleton className="h-4 w-32 bg-slate-300 dark:bg-slate-600" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
