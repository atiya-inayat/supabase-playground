"use client";

import EditTask from "@/app/components/EditTask";
import { createClient } from "@/lib/supabase/client";

import { useEffect, useState } from "react";
import AddTaskBtnCont from "@/app/components/AddTaskBtnCont";
import CurrentDate from "@/app/components/CurrentDate";
import FilterCards from "@/app/components/FilterCards";
import TaskTable from "@/app/components/TaskTable";

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

  const Task = async () => {
    const { data, error } = await supabase.from("tasks").select("*");

    if (error) {
      console.error("Error while loading tasks...", error.message);
      return;
    }

    setTask(data);
  };

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

    Task();
  };

  // ---------------- LOAD TASKS ----------------

  useEffect(() => {
    Task();
  }, []);

  return (
    <main className="flex bg-white flex-col  w-full   min-h-screen   text-black ">
      <div className="w-full flex items-center justify-between border-b border-gray-300">
        <h1 className="text-lg font-bold p-4">Dashboard</h1>
        <p className="p-4 text-gray-400 text-sm">
          <CurrentDate />
        </p>
      </div>
      <div className=" mt-2 p-4 w-full">
        <AddTaskBtnCont userId={userId} />
      </div>

      <div>
        <FilterCards />
      </div>

      <div>
        <TaskTable />
      </div>

      <div className="flex flex-col w-full gap-3">
        {task.map((task) => (
          <li
            className="gap-2 p-2 my-3 list-none bg-gray-200 border-2 border-gray-300 rounded-md"
            key={task.id}
          >
            <div className="flex items-center justify-between p-2 ">
              <div>
                <div>
                  <div>
                    <h2 className="text-lg font-bold ">{task.title}</h2>

                    <p className="text-gray-600 ">{task.description}</p>
                    <p className="text-gray-600 ">Priority: {task.priority}</p>
                    <p className="text-gray-600 ">Status: {task.status}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditTaskId(task.id)}
                      className="px-3 py-1 font-bold text-white bg-gray-500 border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800 "
                    >
                      Edit
                    </button>
                    {editTaskId === task.id && (
                      <EditTask
                        task={task}
                        onClose={() => setEditTaskId(null)}
                        refreshTasks={Task}
                      />
                    )}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="px-3 py-1 font-bold text-white bg-red-500 border-gray-700 rounded-lg cursor-pointer hover:bg-red-700 "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </div>
    </main>
  );
}
