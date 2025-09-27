import type { TasksQueryParams } from "@/types/type";
import { fetchTasks } from "./api";

export const useTasksQueryOptions = ({
  page = 1,
  name = "",
  status = "",
  priority = "",
  loadAll = false,
  sort = "DESC",
}: TasksQueryParams = {}) => {
  return {
    queryKey: ["tasks", loadAll ? "all" : page, name, status, priority, sort],
    queryFn: () =>
      fetchTasks({
        page: loadAll ? 1 : page,
        all: loadAll,
        name,
        status,
        priority,
        sort,
      }),
    keepPreviousData: true,
  };
};
