import z from "zod";

export const taskSchema = z.object({
  name: z
    .string()
    .min(3, "Task name must be at least 3 characters")
    .max(50, "Title must be at most 50 characters"),
  description: z
    .string()
    .max(200, "Description must be at most 200 characters")
    .optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).refine((val) => !!val, {
    message: "Priority is required",
  }),
  status: z
    .enum(["TODO", "IN_PROGRESS", "DONE", "CANCELLED"])
    .refine((val) => !!val, {
      message: "Status is required",
    }),
});

export type TaskFormData = z.infer<typeof taskSchema>;

// Create → matches form data (no id)
export type CreateTaskData = TaskFormData;

// Update → needs id
export type UpdateTaskData = TaskFormData & { id: string };

// Task coming from API (always has id + timestamps, etc.)
export type TaskProps = TaskFormData & {
  id: string;
  createdAt?: string | null;
  updatedAt?: string | null;
};

// import z from "zod";

// export const taskSchema = z.object({
//   name: z
//     .string()
//     .min(3, "Task name must be at least 3 characters")
//     .max(50, "Title must be at most 50 characters"),
//   description: z
//     .string()
//     .max(200, "Description must be at most 200 characters")
//     .optional(),
//   //   priority: z.enum(["LOW", "MEDIUM", "HIGH"], {
//   //     errorMap: () => ({ message: "Priority is required" }),
//   //   }),
//   priority: z.enum(["LOW", "MEDIUM", "HIGH"]).refine((val) => !!val, {
//     message: "Priority is required",
//   }),
//   status: z
//     .enum(["TODO", "IN_PROGRESS", "DONE", "CANCELLED"])
//     .refine((val) => !!val, {
//       message: "Status is required",
//     }),
//   //   status: z.enum(["TODO", "IN_PROGRESS", "DONE", "CANCELLED"], {
//   //     errorMap: () => ({ message: "Status is required" }),
//   //   }),
// });

// export type TaskFormData = z.infer<typeof taskSchema>;

// export type TaskProps = TaskFormData & {
//   id?: string;
//   description?: string;
// };

// // For updating
// export type UpdateTaskData = TaskFormData & { id: string };
