"use client";

import { supabase } from "@/app/supabase-client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const [task, setTask] = useState([]);
  const [userId, setUserId] = useState("");

  // This state stores the NEW values while we are editing a Todo.
  const [editTask, setEditTask] = useState({
    title: "",
    description: "",
  });

  // This stores the ID of the Todo that we are currently editing.
  const [editId, setEditId] = useState(null);

  const fetchUser = async () => {
    const user = await supabase.auth.getUser();

    console.log({ user });
    // setUser(user);

    const userId = user.data.user?.id;
    setUserId(userId!);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ---------------- CREATE ----------------

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (editId === null) {
      const { error } = await supabase.from("tasks").insert({
        ...newTask,
        user_id: userId,
      });

      if (error) {
        console.error("Error while adding new task...", error.message, newTask);
        return;
      }
      setNewTask({
        title: "",
        description: "",
      });

      // Fetch the tasks again so the newly added Todo appears in the UI.
      Task();
    } else {
      updateTask(editId);
    }
  };

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

  // id = WHICH Todo should be updated?
  // editTask = WHAT should that Todo become?
  const updateTask = async (id) => {
    const { error } = await supabase
      .from("tasks")
      .update(editTask)
      .eq("id", id);

    if (error) {
      console.error("Update failed...", error.message);
      return;
    }
    setEditTask({
      title: "",
      description: "",
    });

    setEditId(null);

    // Fetch the latest data from Supabase.
    // This makes the updated Todo appear in the UI.
    Task();
  };

  const startEditing = (task) => {
    // Remember WHICH Todo we are editing.
    setEditId(task.id);

    // Copy the Todo's existing values into editTask.
    // These values will appear inside the edit inputs.
    setEditTask({
      title: task.title,
      description: task.description,
    });
  };

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
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 py-10 text-black sm:p-6 md:p-8 lg:p-10 xl:p-12 md:flex-row sm:gap-6 md:gap-8 lg:gap-10">
      <div className="w-full">
        {/* CREATE FORM */}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-4 p-5 bg-gray-300 rounded-lg shadow"
        >
          <h1 className="text-2xl font-bold text-black">Todo App</h1>

          {editId === null ? (
            <div className="flex flex-col gap-4 ">
              <input
                type="text"
                placeholder="Enter todo..."
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    title: e.target.value,
                  })
                }
                className="p-2 font-bold border border-gray-400 rounded outline-none focus:border-gray-500"
              />

              <textarea
                placeholder="Description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    description: e.target.value,
                  })
                }
                className="p-2 text-gray-700 border border-gray-400 rounded outline-none min-h-24 focus:border-gray-500"
              />

              <button
                type="submit"
                className="px-4 py-2 font-medium text-white bg-gray-500 rounded hover:bg-gray-600"
              >
                Add Todo
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* EDIT CHANGE 10:
                        This input displays the current editTask title.
                    */}
              <input
                type="text"
                placeholder="Enter todo..."
                value={editTask.title}
                // EDIT CHANGE 11:
                // When the user types, update editTask,
                // NOT newTask.
                onChange={(e) =>
                  setEditTask({
                    ...editTask,
                    title: e.target.value,
                  })
                }
                className="p-2 font-bold border border-gray-400 rounded outline-none focus:border-gray-500"
              />

              <textarea
                placeholder="Description"
                value={editTask.description}
                className="p-2 text-gray-700 border border-gray-400 rounded outline-none min-h-24 focus:border-gray-500"
                // EDIT CHANGE 12:
                // Update editTask.description when the user types.
                onChange={(e) =>
                  setEditTask({
                    ...editTask,
                    description: e.target.value,
                  })
                }
              />

              <div className="flex gap-2 ">
                <button className="px-4 py-2 font-medium text-white bg-red-500 rounded hover:bg-gray-600">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-medium text-white bg-gray-500 rounded hover:bg-gray-600"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* DISPLAY TASKS */}

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
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(task)}
                      className="px-3 py-1 font-bold text-white bg-gray-500 border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800 "
                    >
                      Edit
                    </button>
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
