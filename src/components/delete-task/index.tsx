"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../alert-dialog";
import { useDeleteTodo } from "@/services/queries";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type DeleteTaskProps = {
  taskId: string;
  edit?: "home" | "detail";
  children: ReactNode;
};

function DeleteTask({ taskId, edit = "home", children }: DeleteTaskProps) {
  const { mutate: deleteTask, isPending } = useDeleteTodo();
  const router = useRouter();

  const handleDelete = () => {
    deleteTask(taskId, {
      onSuccess: () => {
        if (edit === "detail") router.push("/home");
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Deleting taskId: 27bd8535-9318-4af5-6386-2591d6e1a231 This action
            cannot be undone. This will permanently delete this task and remove
            it from your task list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={handleDelete}
            className="cursor-pointer bg-destructive text-white dark:text-primary hover:bg-red-400"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteTask;
