import type { TaskFormData } from "@/schemas/newTask-schema";
import type { TaskProps, UpdateProps } from "@/types/type";
import type { LoginSchema, RegisterSchema } from "@/schemas/auth-schema";
import axios from "axios";
import api from "./auth";

// Register
export async function registerUser(data: RegisterSchema) {
  try {
    const res = await api.post(`/auth/register`, data);
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data?.message || "Failed to register user");
    } else if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
}

// Login
export async function loginUser(data: LoginSchema) {
  try {
    const res = await api.post(`/auth/login`, data);
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data?.message || "Login Failed");
    } else if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
}

// fetch tasks
export async function fetchTasks({
  page = 1,
  name = "",
  status = "",
  priority = "",
  all = false,
  sort = "DESC",
}) {
  try {
    // const response = await axios.get(BASE_URL, {
    const response = await api.get("/tasks", {
      params: {
        // page,
        ...(all ? { all: true } : { page }),
        sort,
        ...(name && { name }),
        ...(all ? { all: true } : { page }),
        ...(status && { status }),
        ...(priority && { priority }),
      },
    });
    // console.log("fetchTasks", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // 404 error
        throw new Error(
          `API Error: ${error.response.status} - ${
            error.response.data?.message || "Unknown error"
          }`
        );
      } else if (error.request) {
        // Request was made but no response received
        throw new Error("Network Error: No response from server");
      } else {
        throw new Error(`Request Error: ${error.message}`);
      }
    } else {
      throw new Error("Unknown error occurred");
    }
  }
}

// FETCH BY ID
export async function fetchTaskById(id: string) {
  console.log("Task fetched:", id);
  try {
    const res = await api.get(`/tasks/${id}`);
    // console.log("fetchTaskById", res.data);

    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw new Error(
        e.response?.data?.message || "Failed to user infromation"
      );
    } else if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
}

// CREATE
export async function createTodo(task: TaskFormData): Promise<TaskProps> {
  console.log("Task fetched:", task);
  try {
    const res = await api.post("/tasks", task);

    // console.log("createTodo:", res.data);
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data?.message || "Failed to create todo");
    } else if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
}

// UPDATE
export async function updateTodo({
  id,
  ...data
}: UpdateProps): Promise<TaskProps> {
  try {
    const res = await api.patch(`/tasks/${id}`, data);

    // console.log("updateTodo:", res.data);
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data?.message || "Failed to update todo");
    } else if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
}

// DELETE
export async function deleteTodo(id: string): Promise<{ success: boolean }> {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
}

// export async function deleteTodo(id: string) {
//   try {
//     console.log("Deleting taskId:", id);
//     const res = await api.delete(`/tasks/${id}`);
//     // console.log("ola", res.data);

//     // console.log("deleteTodo:", res.data);
//     return res.data;
//   } catch (e: unknown) {
//     if (axios.isAxiosError(e)) {
//       throw new Error(e.response?.data?.message || "Failed to create task");
//     } else if (e instanceof Error) {
//       throw new Error(e.message);
//     } else {
//       throw new Error("Unknown error occurred");
//     }
//   }
// }

//TOGGLE

export async function toggleTodo(
  id: string,
  currentStatus: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED"
): Promise<TaskProps> {
  const newStatus = currentStatus === "TODO" ? "DONE" : "TODO";
  const res = await api.patch(`/tasks/${id}`, { status: newStatus });
  return res.data;
}

// export async function toggleTodo(
//   id: string,
//   // currentStatus: "TODO" | "DONE"
//   currentStatus: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED"
// ): Promise<ToggleProps> {
//   try {
//     const newStatus = currentStatus === "TODO" ? "DONE" : "TODO";
//     console.log("currentStatus:", currentStatus);
//     const res = await api.patch(
//       `/tasks/${id}`,
//       {
//         status: newStatus,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return res.data;
//   } catch (e: unknown) {
//     if (axios.isAxiosError(e)) {
//       throw new Error(e.response?.data?.message || "Failed to create task");
//     } else if (e instanceof Error) {
//       throw new Error(e.message);
//     } else {
//       throw new Error("Unknown error occurred");
//     }
//   }
// }
