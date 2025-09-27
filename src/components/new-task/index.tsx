import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import TaskForm from "@/components/task-form";

export function NewTaskBtn() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-lg cursor-pointer"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Task
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-xl w-full"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <TaskForm onCloseForm={handleClose} update="create" />
      </DialogContent>
    </Dialog>
  );
}

export default NewTaskBtn;
