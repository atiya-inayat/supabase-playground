"use client";

import { createClient } from "@/lib/supabase/client";
import toast, { Toaster } from "react-hot-toast";
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
} from "@/components/ui/alert-dialog";

const DeleteTask = ({ task, refreshTasks }) => {
  const supabase = createClient();

  const deleteTask = async () => {
    const { error } = await supabase.from("tasks").delete().eq("id", task.id);

    if (error) {
      console.error("Error deleting task:", error.message);
      toast.error("Error while deleting task.");

      return;
    }

    await refreshTasks();
    toast.success("Task deleted successfully...");
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <span className="border-red-200 text-sm border rounded-lg px-2 py-1 text-red-700">
            Delete
          </span>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this task?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This task will be permanently
              deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={(e) => {
                e.preventDefault();
                deleteTask();
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default DeleteTask;
