import { Card, CardContent } from "@/components/card";
import { Skeleton } from "../skeleton";

function CardSkeleton() {
  return (
    <Card className="border-0 shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700">
      <CardContent className="px-4 py-1">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 bg-slate-300 dark:bg-slate-600 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-slate-200 dark:bg-slate-700" />
            <Skeleton className="h-6 w-15 bg-slate-300 dark:bg-slate-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardSkeleton;
