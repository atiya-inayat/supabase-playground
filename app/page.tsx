// "use client";

// import { useState, useEffect } from "react";
// import { supabase } from "./supabase-client";

// export default function Home() {
//   const [newTasks, setNewTasks] = useState({ title: "", description: "" });
//   const [tasks, setTasks] = useState([]);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     const { error } = await supabase.from("tasks").insert(newTasks);

//     if (error) {
//       console.error("Error adding task", error.message, newTasks);
//     }

//     setNewTasks({ title: "", description: "" });
//   };

//   const Tasks = async () => {
//     const { data, error } = await supabase.from("tasks").select("*");
//     setTasks(data);

//     if (error) {
//       console.error("Error displayng task", error.message);
//     }

//     console.log(tasks);
//   };

//   useEffect(() => {
//     Tasks();
//   }, []);

//   return (
//     <main className="min-h-screen bg-gray-900 py-10 text-white">
//       <div className="mx-auto max-w-2xl px-4">
//         <h1 className="mb-8 text-3xl font-bold text-white">Todo App</h1>

//         <form onSubmit={handleSubmit} className="mb-8 flex gap-3">
//           <div>
//             <input
//               type="text"
//               onChange={(e) =>
//                 setNewTasks({ ...newTasks, title: e.target.value })
//               }
//               placeholder="Enter a todo..."
//               className="flex-1 rounded-md border border-gray-600 bg-white px-4 py-2 text-gray-900 outline-none placeholder:text-gray-500"
//             />
//           </div>

//           <div>
//             <textarea
//               onChange={(e) =>
//                 setNewTasks({ ...newTasks, description: e.target.value })
//               }
//               className="flex-1 rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-900 outline-none placeholder:text-gray-500"
//             ></textarea>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
//             >
//               Add
//             </button>
//           </div>
//         </form>

//         <div className="space-y-3">
//           {tasks.map((task) => (
//             <li key={task.id}>
//               <strong>{task.title}</strong>
//               <p>{task.description}</p>
//             </li>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import { supabase } from "./supabase-client";

// export default function Home() {
//   const [newTask, setNewTask] = useState({ title: "", description: "" });
//   const [task, setTask] = useState([]);
//   const [editTask, setEditTask] = useState({ title: "", description: "" });
//   const [editId, setEditId] = useState(null)

//   // editId - means which todo
//   // editTask - what are its current / new values

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     const { error } = await supabase.from("tasks").insert(newTask);
//     if (error) {
//       console.error("Error while adding new task...", error.message, newTask);
//     }

//     setNewTask({ title: "", description: "" });
//   };
//   const Task = async () => {
//     const { data, error } = await supabase.from("tasks").select("*");

//     setTask(data);

//     if (error) {
//       console.error("Error while loading  tasks...", error.message, task);
//     }
//   };

//   // edit task flow-- find the correct row, change its data, show the updated data in the ui

//   const updateTask = async (id) => {
//     const { data, error } = await supabase
//       .from("tasks")
//       .update(editTask)
//       .eq("id", id)
//       .select();

//     setEditTask();

//     if (error) {
//       console.error("Update failed...", error.message, task);
//     }
//   };

//   const startEditing = (task) => {
//     setEditId(task.id);

//     setEditTask({
//       title: task.title,
//       description: task.description,
//     })
//   }

//   useEffect(() => {
//     Task();
//   }, []);

//   return (
//     <main className="min-h-screen bg-gray-600 py-10 text-black">
//       <div className="mx-auto max-w-2xl px-4">
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col gap-4 rounded-lg bg-amber-50 p-6 shadow"
//         >
//           <h1 className="text-2xl text-black font-bold">Todo App</h1>

//           <input
//             type="text"
//             placeholder="Enter todo..."
//             onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//             className="rounded border border-gray-300 p-2 outline-none focus:border-amber-500"
//           />

//           <textarea
//             placeholder="Description"
//             onChange={(e) =>
//               setNewTask({ ...newTask, description: e.target.value })
//             }
//             className="min-h-24 rounded border border-gray-300 p-2 outline-none focus:border-amber-500"
//           />

//           <button
//             type="submit"
//             className="rounded bg-amber-500 px-4 py-2 font-medium text-white hover:bg-amber-600"
//           >
//             Add Todo
//           </button>
//         </form>
//       </div>
//       <div>
//         {task.map((task) => (
//           <li
//             className="bg-gray-400 gap-2 my-3 rounded-md p-2 border-2 border-gray-300"
//             key={task.id}
//           >
//             <div>
//               <h2>
//                 <strong>{task.title} </strong>
//               </h2>
//               <p>{task.description}</p>
//               <div>
//            {if (editId === editTask.id ) {
//             <div>
//               <input
//             type="text"
//             placeholder="Enter todo..."
//             value={editTask.title}
//             className="rounded border border-gray-300 p-2 outline-none focus:border-amber-500"
//           />

//           <textarea
//             placeholder="Description"
//                         value={editTask.description}

//             className="min-h-24 rounded border border-gray-300 p-2 outline-none focus:border-amber-500"
//           />
//             </div>
//            }}
//                 <button onClick={() => startEditing(task)}>Edit</button>
//               </div>
//             </div>
//           </li>
//         ))}
//       </div>
//     </main>
//   );
// }

//************** */

"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabase-client";

export default function Home() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const [task, setTask] = useState([]);

  // EDIT CHANGE 1:
  // This state stores the NEW values while we are editing a Todo.
  const [editTask, setEditTask] = useState({
    title: "",
    description: "",
  });

  // EDIT CHANGE 2:
  // This stores the ID of the Todo that we are currently editing.
  // User clicks Edit on Todo with id = 5
  // editId becomes 5
  const [editId, setEditId] = useState(null);

  // ---------------- CREATE ----------------

  const handleSubmit = async (e: any) => {
    e.preventDefault();

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

  // EDIT CHANGE 3:
  // This function runs when the user clicks "Save".
  //
  // id = WHICH Todo should be updated?
  //
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

    // EDIT CHANGE 4:
    // The update was successful.
    // Clear the edit values.
    setEditTask({
      title: "",
      description: "",
    });

    // EDIT CHANGE 5:
    // We are no longer editing any Todo.
    // This makes the edit inputs disappear.
    setEditId(null);

    // EDIT CHANGE 6:
    // Fetch the latest data from Supabase.
    // This makes the updated Todo appear in the UI.
    Task();
  };

  // EDIT CHANGE 7:
  // This function runs when the user clicks "Edit".
  const startEditing = (task) => {
    // Remember WHICH Todo we are editing.
    setEditId(task.id);

    // Copy the Todo's existing values into editTask.
    //
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
    <main className="min-h-screen bg-gray-600 py-10 text-black">
      <div className="mx-auto max-w-2xl px-4">
        {/* CREATE FORM */}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-lg bg-amber-50 p-6 shadow"
        >
          <h1 className="text-2xl text-black font-bold">Todo App</h1>

          <input
            type="text"
            placeholder="Enter todo..."
            onChange={(e) =>
              setNewTask({
                ...newTask,
                title: e.target.value,
              })
            }
            className="rounded border border-gray-300 p-2 outline-none focus:border-amber-500"
          />

          <textarea
            placeholder="Description"
            onChange={(e) =>
              setNewTask({
                ...newTask,
                description: e.target.value,
              })
            }
            className="min-h-24 rounded border border-gray-300 p-2 outline-none focus:border-amber-500"
          />

          <button
            type="submit"
            className="rounded bg-amber-500 px-4 py-2 font-medium text-white hover:bg-amber-600"
          >
            Add Todo
          </button>
        </form>
      </div>

      {/* DISPLAY TASKS */}

      <div>
        {task.map((task) => (
          <li
            className="bg-gray-400 gap-2 my-3 rounded-md p-2 border-2 border-gray-300"
            key={task.id}
          >
            <div>
              {/* EDIT CHANGE 8:
                  Normally show the Todo's title and description.
                */}
              <h2>
                <strong>{task.title}</strong>
              </h2>

              <p>{task.description}</p>

              <div>
                {/* EDIT CHANGE 9:
                    Check whether THIS Todo is being edited.

                    task.id = current Todo's ID

                    editId = ID of the Todo currently being edited

                    If they are equal:
                    → show the edit inputs

                    Example:

                    task.id = 5
                    editId = 5

                    5 === 5 → show edit form
                */}
                {editId === task.id && (
                  <div>
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
                      className="rounded border border-gray-300 p-2 outline-none focus:border-amber-500"
                    />

                    <textarea
                      placeholder="Description"
                      value={editTask.description}
                      // EDIT CHANGE 12:
                      // Update editTask.description when the user types.
                      onChange={(e) =>
                        setEditTask({
                          ...editTask,
                          description: e.target.value,
                        })
                      }
                      className="min-h-24 rounded border border-gray-300 p-2 outline-none focus:border-amber-500"
                    />

                    {/* EDIT CHANGE 13:
                        Save button.

                        We pass task.id because we need to tell
                        Supabase WHICH row to update.
                    */}
                    <button onClick={() => updateTask(task.id)}>Save</button>
                  </div>
                )}

                {/* EDIT CHANGE 14:
                    Clicking this button starts the editing process.

                    We pass the whole task to startEditing()
                    so it can get:
                    - task.id
                    - task.title
                    - task.description
                */}
                <div className="flex gap-2">
                  <button onClick={() => startEditing(task)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </div>
    </main>
  );
}
