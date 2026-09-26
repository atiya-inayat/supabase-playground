"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabase-client";

export default function Home() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const [task, setTask] = useState([]);

  // This state stores the NEW values while we are editing a Todo.
  const [editTask, setEditTask] = useState({
    title: "",
    description: "",
  });

  // This stores the ID of the Todo that we are currently editing.
  const [editId, setEditId] = useState(null);

  // ---------------- CREATE ----------------

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (editId === null) {
      const { error } = await supabase.from("tasks").insert(newTask);

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
    <main className="min-h-screen  bg-gray-200 flex flex-row justify-center items-center py-10 text-black">
      <div className="mx-auto   px-4">
        {/* CREATE FORM */}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 justify-center w-3xl rounded-lg bg-gray-300 p-5 shadow"
        >
          <h1 className="text-2xl text-black font-bold">Todo App</h1>

          {editId === null ? (
            <div className="flex flex-col gap-4  ">
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
                className="rounded border font-bold border-gray-400 p-2 outline-none focus:border-gray-500"
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
                className="min-h-24 rounded border border-gray-400 text-gray-700 p-2 outline-none focus:border-gray-500"
              />

              <button
                type="submit"
                className="rounded bg-gray-500 px-4 py-2 font-medium text-white hover:bg-gray-600"
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
                className="rounded border font-bold border-gray-400 p-2 outline-none focus:border-gray-500"
              />

              <textarea
                placeholder="Description"
                value={editTask.description}
                className="min-h-24 rounded border border-gray-400 text-gray-700 p-2 outline-none focus:border-gray-500"
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
                <button className="rounded bg-red-500 px-4 py-2 font-medium text-white hover:bg-gray-600">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-gray-500 px-4 py-2 font-medium text-white hover:bg-gray-600"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* DISPLAY TASKS */}

      <div className="mx-auto mt-10 max-w-2.5xl flex flex-col gap-3">
        {task.map((task) => (
          <li
            className="bg-gray-200 list-none gap-2 my-3  rounded-md p-2 border-2 border-gray-300 w-2xl"
            key={task.id}
          >
            <div className="p-2 flex justify-between items-center ">
              <div>
                <div>
                  <div>
                    <h2 className="text-lg font-bold ">{task.title}</h2>

                    <p className="text-gray-600 ">{task.description}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(task)}
                      className="border-gray-700 hover:bg-gray-800 px-3 py-1 cursor-pointer rounded-lg font-bold bg-gray-500 text-white "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="border-gray-700 cursor-pointer px-3 py-1 rounded-lg font-bold bg-red-500 hover:bg-red-700 text-white "
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
