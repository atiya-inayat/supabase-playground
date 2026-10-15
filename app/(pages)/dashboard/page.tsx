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
  const [refreshKey, setRefreshKey] = useState(0);

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

  const reloadTaskIncrement = async () => {
    setRefreshKey(refreshKey + 1);
  };

  return (
    <main className="flex  flex-col  min-w-0   min-h-screen border  border-gray-100 text-black ">
      <div className="w-full flex sticky top-0  items-center bg-white justify-between  border-b border-gray-300">
        <h1 className="text-lg font-bold p-4">Dashboard</h1>
        <p className="p-4 text-gray-400 text-sm">
          <CurrentDate />
        </p>
      </div>
      <div className=" mt-2 p-4 w-full">
        <AddTaskBtnCont
          refreshCounts={reloadTaskIncrement}
          userId={userId}
          refreshTasks={loadTasks}
        />
      </div>

      <div>
        <FilterCards refreshKey={refreshKey} refreshTasks={loadTasks} />
      </div>

      <div>
        <TaskTable refreshTasks={loadTasks} tasks={task} />
      </div>
    </main>
  );
}
