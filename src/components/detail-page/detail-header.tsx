import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";
import Link from "next/link.js";

import { useToggleDetailTodo } from "@/services/queries";
import type { TodoDetailProps } from "@/types/type.js";
import DeleteTask from "../delete-task";
import EditTaskBtn from "../edit-task";
import { Button } from "../button";

export function DetailHeader({ data }: TodoDetailProps) {
  const { id, status } = data;
  console.log("DetailHeader-id", id);
  const { mutate: toggleStatus, isPending } = useToggleDetailTodo();

  return (
    <div className="xs:flex items-center justify-between mb-8 space-y-4 xs:space-y-0">
      <div className="flex flex-wrap items-center space-x-4">
        <Link href="/home">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-white dark:hover:bg-slate-800 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tasks
          </Button>
        </Link>
        <hr className="h-6 w-px bg-slate-300 dark:bg-slate-600" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Task Details
        </h1>
      </div>

      <div className="flex flex-wrap items-center space-x-2 space-y-3 xs:space-y-0">
        <Button
          variant="outline"
          onClick={() => toggleStatus({ id, status })}
          className={`border-slate-200 cursor-pointer 
                ${
                  status === "DONE"
                    ? "bg-green-50 text-green-700 hover:bg-green-100"
                    : "hover:bg-slate-50"
                }
              `}
        >
          {isPending ? (
            <div className="w-4 h-4 animate-spin rounded-full border-2 border-t-transparent border-slate-400" />
          ) : status === "DONE" ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
              Completed
            </>
          ) : (
            <>
              <Circle className="w-4 h-4 mr-2" />
              Mark Complete
            </>
          )}
        </Button>

        <EditTaskBtn initialData={data} update="detail">
          <Button variant="outline" className="border-slate-200 cursor-pointer">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </EditTaskBtn>

        <DeleteTask taskId={id} edit="detail">
          <Button
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </DeleteTask>
      </div>
    </div>
  );
}
