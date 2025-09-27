import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTodo,
  deleteTodo,
  loginUser,
  registerUser,
  toggleTodo,
  updateTodo,
} from "./api";
import type { ToggleMutationInput } from "@/types/type";
import toast from "react-hot-toast";
// import type { TaskProps } from "@/components/features/new-task/schema.js";

// login
export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      toast.success("Login successful!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

// register
export function useRegister() {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      toast.success("Registration successful!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

// toggle
export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: ToggleMutationInput) => toggleTodo(id, status),
    onSuccess: () => {
      toast.success("toggled successfully");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
      console.error("Toggle failed:", error.message);
    },
  });
};

export const useToggleDetailTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: ToggleMutationInput) => toggleTodo(id, status),
    onSuccess: (_, { id }) => {
      toast.success("toggled detail successfully");
      queryClient.invalidateQueries({ queryKey: ["todos", id] });
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
      console.error("Toggle failed:", error.message);
    },
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      toast.success("Todo created successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
      console.log("Create failed:", error.message);
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      toast.success("Todo updated successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
      console.log("Create failed:", error.message);
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      toast.success("Todo deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
      console.log("Create failed:", error.message);
    },
  });
};
