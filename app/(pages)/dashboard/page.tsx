"use client";

import EditTask from "@/app/components/EditTask";
import Form from "@/app/components/Form";
import { createClient } from "@/lib/supabase/client";
// import { supabase } from "@/app/supabase-client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [task, setTask] = useState([]);
  const [userId, setUserId] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const supabase = createClient();
  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log({ user });
    // setUser(user);

    const userId = user?.id;
    console.log("dashboard : userid is ; ", userId);
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
    <main className="flex  items-center  justify-between min-h-screen   text-black ">
      <div>
        <div className=" bg-amber-300">
          {/* CREATE FORM */}

          <button onClick={() => setShowForm(true)}>Add task</button>
          {showForm && (
            <Form userId={userId} onClose={() => setShowForm(false)} />
          )}
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
                      <p className="text-gray-600 ">
                        Priority: {task.priority}
                      </p>
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
      </div>
    </main>
  );
}
