"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { fetchTaskById } from "@/services/api";
import {
  DetailHeader,
  DetailPageSkeleton,
  TaskDetail,
  TaskInfo,
} from "@/components/index";

export default function DetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["task", id],
    queryFn: () => fetchTaskById(id),
    enabled: !!id,
  });

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {isError && (
          <div className="text-center text-red-500">
            Error loading tasks: {(error as Error)?.message}
          </div>
        )}

        {isLoading && <DetailPageSkeleton />}

        {!isLoading && !isError && data && (
          <>
            <DetailHeader data={data} />

            <div className="pt-6 xs:pt-10 flex flex-col gap-8">
              <TaskDetail data={data} />
              <TaskInfo data={data} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
