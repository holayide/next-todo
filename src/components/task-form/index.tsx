"use client";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flag, FileText } from "lucide-react";
import { useEffect } from "react";

import { useCreateTodo, useUpdateTodo } from "@/services/queries";
import { taskSchema, type TaskFormData } from "@/schemas/newTask-schema";
import { Button } from "@/components/button";
import { Label } from "@/components/label";
import { Input } from "@/components/index";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import type { TaskProps } from "@/types/type";
import { Textarea } from "../textarea";
import { useRouter } from "next/navigation";

interface TaskFormProps {
  onCloseForm?: () => void;
  initialData?: TaskProps;
  update: "create" | "detail";
}

function TaskForm({
  onCloseForm,
  initialData,
  update = "create",
}: TaskFormProps) {
  const { mutate: createTask, isPending: isCreating } = useCreateTodo();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTodo();
  const router = useRouter();

  const isEditMode = Boolean(initialData);
  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: "",
      description: "",
      priority: "LOW",
      status: "TODO",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData?.name || "",
        description: initialData.description || "",
        priority:
          (initialData.priority?.toUpperCase() as "HIGH" | "LOW" | "MEDIUM") ||
          "LOW",
        status: initialData.status || "TODO",
      });
    }
  }, [initialData, reset]);

  // const onSubmit: SubmitHandler<TaskFormData> = (data: TaskFormData) => {
  //   const mutation = isEditMode ? updateTask : createTask;

  //   if (isEditMode && initialData && initialData.id) {
  //     // For update, we need to include the id
  //     const updateData = {
  //       id: initialData.id,
  //       ...data,
  //     };

  //     mutation(updateData, {
  //       onSuccess: () => {
  //         console.log("Task updated successfully");
  //         reset();
  //         if (update === "detail") {
  //           router.push("/home");
  //           onCloseForm?.();
  //         }
  //       },
  //     });
  //   } else {
  //     // For create, just use the form data
  //     mutation(data, {
  //       onSuccess: () => {
  //         console.log(data);
  //         console.log("Task created successfully");
  //         reset();
  //         onCloseForm?.();
  //       },
  //     });
  //   }
  // };

  const onSubmit: SubmitHandler<TaskFormData> = (data) => {
    if (isEditMode && initialData?.id) {
      updateTask(
        { id: initialData.id, ...data },
        {
          onSuccess: () => {
            console.log("Task updated successfully");
            reset();
            if (update === "detail") {
              router.push("/home");
              onCloseForm?.();
            }
          },
        }
      );
    } else {
      createTask(data, {
        onSuccess: () => {
          console.log("Task created successfully");
          reset();
          onCloseForm?.();
        },
      });
    }
  };

  return (
    <form
      key={initialData?.id || "new"}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Title */}
      <div className="space-y-2 ">
        <Label
          htmlFor="title"
          className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center"
        >
          <FileText className="w-4 h-4 mr-2" />
          Title
        </Label>
        <Input
          {...register("name")}
          id="title"
          maxLength={50}
          placeholder="Enter task title..."
          className={`border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500 ${
            errors.name
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : ""
          }            
              `}
        />
        {errors.name && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label
          htmlFor="description"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Description
        </Label>

        <Textarea
          {...register("description")}
          id="description"
          maxLength={200}
          placeholder="Describe your task in detail..."
          rows={4}
          className={`max-w-[526px] w-full border-slate-200 whitespace-pre-wrap dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500 resize-none `}
        />

        {errors.description && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Priority  */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center">
          <Flag className="w-4 h-4 mr-2" />
          Priority
        </Label>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
            >
              <SelectTrigger className="w-full border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mr-2" />
                    Low Priority
                  </div>
                </SelectItem>
                <SelectItem value="MEDIUM">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full mr-2" />
                    Medium Priority
                  </div>
                </SelectItem>
                <SelectItem value="HIGH">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full mr-2" />
                    High Priority
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.priority && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.priority.message}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 cursor-pointer"
        >
          {isPending ? (
            <div className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
          ) : isEditMode ? (
            "Update Task"
          ) : (
            "Create Task"
          )}
        </Button>
      </div>
    </form>
  );
}

export default TaskForm;
