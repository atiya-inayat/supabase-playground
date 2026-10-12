"use client";

import EditTask from "@/app/components/EditTask";
import { createClient } from "@/lib/supabase/client";

import { useEffect, useState } from "react";
import AddTaskBtnCont from "@/app/components/AddTaskBtnCont";
import CurrentDate from "@/app/components/CurrentDate";
import FilterCards from "@/app/components/FilterCards";
import TaskTable from "@/app/components/TaskTable";
import { fetchTasks } from "@/lib/tasks";

export default function Dashboard() {
  const [task, setTask] = useState([]);
  const [userId, setUserId] = useState("");

  const [editTaskId, setEditTaskId] = useState(null);
  const supabase = createClient();
  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log({ user });
    // setUser(user);

    const userId = user?.id;
    // console.log("dashboard : userid is ; ", userId);
    setUserId(userId!);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ---------------- READ ----------------

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTask(data);
  };
  useEffect(() => {
    loadTasks();
  }, []);

  // ---------------- UPDATE ----------------

  const deleteTask = async (id) => {
    const { response, error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting task", error.message);
      return;
    }

    await loadTasks();
  };

  return (
    <main className="flex bg-white flex-col  w-full   min-h-screen   text-black ">
      <div className="w-full flex items-center justify-between border-b border-gray-300">
        <h1 className="text-lg font-bold p-4">Dashboard</h1>
        <p className="p-4 text-gray-400 text-sm">
          <CurrentDate />
        </p>
      </div>
      <div className=" mt-2 p-4 w-full">
        <AddTaskBtnCont userId={userId} refreshTasks={loadTasks} />
      </div>

      <div>
        <FilterCards />
      </div>

      <div>
        <TaskTable refreshTasks={loadTasks} tasks={task} />
      </div>
    </main>
  );
}
