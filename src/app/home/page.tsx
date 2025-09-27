"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Cards } from "@/components/summary-card";
import { SearchFilter } from "@/components/index";
import { useDebounce } from "@/hooks/debounce";
import { useTasksQueryOptions } from "@/services/queryOptions";
import { Pagination } from "@/components/index";
import { TodoCard, TodoCardSkeleton } from "@/components/index";
import type { TaskProps } from "@/types/type";
import HomeHeader from "@/components/headers/home-header";

function Home() {
  const [page, setPage] = useState<number | undefined>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const debouncedSearch: string = useDebounce(searchQuery, 500);
  const isSearching = debouncedSearch.trim().length > 0;

  const { data, isLoading, isError, error } = useQuery(
    useTasksQueryOptions({
      page: page ?? 1,
      name: debouncedSearch,
      status: statusFilter === "all" ? "" : statusFilter,
      priority: priorityFilter === "all" ? "" : priorityFilter,
    })
  );

  // note: used Client-side search filtering too because the backend api keeps returning
  //  the whole content without filtering it
  // const filteredTasks = (data?.data || []).filter((task: TaskProps) =>
  //   isSearching
  //     ? task.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  //     : true
  // );

  const filteredTasks = (data?.data || [])
    .filter((task: TaskProps) =>
      isSearching
        ? task.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        : true
    )
    .sort((a: TaskProps, b: TaskProps) => {
      const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return dateB - dateA;
    });

  const handlePageChange = (newpage: number | undefined) => {
    setPage(newpage);
  };

  // if (isLoading) return <div>Loading tasks...</div>;

  return (
    <div className="mb-8">
      <HomeHeader />
      <Cards page={page} />
      <SearchFilter
        searchQuery={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setPage(1);
        }}
        statusFilter={statusFilter}
        setStatusFilter={(value) => {
          setStatusFilter(value);
          setPage(1);
        }}
        priorityFilter={priorityFilter}
        setPriorityFilter={(value) => {
          setPriorityFilter(value);
          setPage(1);
        }}
      />

      <div className="mt-14 min-h-[200px]">
        {isError && (
          <div className="text-center text-red-500">
            Error loading tasks: {error.message}
          </div>
        )}

        {isLoading && (
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <TodoCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {filteredTasks.length === 0 ? (
              <div className="mt-14 text-center text-gray-500 dark:text-gray-400">
                {isSearching ? (
                  <p>No tasks found matching &quot;{searchQuery}&quot;</p>
                ) : (
                  <p>No tasks available</p>
                )}
              </div>
            ) : (
              <>
                <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredTasks.map((todo: TaskProps) => (
                    <TodoCard key={todo.id} todo={todo} />
                  ))}
                </div>

                {!isSearching && (
                  <div className="mt-14">
                    <Pagination data={data} onPageChange={handlePageChange} />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
