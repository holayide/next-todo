export interface CardsProps {
  page?: number | undefined;
}

export interface TaskProps {
  // id?: string;
  id: string;
  // description: string;
  description?: string | undefined;
  name: string;
  priority: "HIGH" | "LOW" | "MEDIUM";
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
  createdAt?: string;
  updatedAt?: string;
}

export interface TodoCardProps {
  todo: TaskProps;
}

export interface TodoDetailProps {
  data: TaskProps;
}

export interface Meta {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface TaskResponse {
  data: TaskProps[];
  meta: Meta;
}

// export interface UpdateProps extends Partial<TaskProps> {
//   id: string;
// }

export interface ToggleProps {
  id?: string;
  currentStatus: TaskProps["status"];
}

export interface ToggleMutationInput {
  // id?: string;
  // id: string | undefined;
  id: string;
  status: TaskProps["status"];
}

export interface TasksQueryParams {
  page?: number | undefined;
  name?: string;
  status?: string;
  priority?: string;
  loadAll?: boolean;
  sort?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export type TaskFormDatas = Omit<TaskProps, "id">;

export interface UpdateProps extends TaskFormDatas {
  // id?: string;
  id: string;
}
