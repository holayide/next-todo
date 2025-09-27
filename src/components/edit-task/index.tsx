import { useState, type ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import TaskForm from "../task-form";
import type { TaskProps } from "@/types/type";

interface EditTaskBtnProps {
  initialData?: TaskProps;
  // update?: "create" | "edit";
  update: "create" | "detail";
  children: ReactNode;
}

function EditTaskBtn({
  initialData,
  update = "create",
  children,
}: EditTaskBtnProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  if (!initialData) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-xl" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <TaskForm
          initialData={initialData}
          update={update}
          onCloseForm={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
}

export default EditTaskBtn;
