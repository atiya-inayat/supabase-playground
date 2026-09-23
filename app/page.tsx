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

"use client";
import { useEffect, useState } from "react";
import { supabase } from "./supabase-client";

export default function Home() {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [task, setTask] = useState([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase.from("tasks").insert(newTask);
    if (error) {
      console.error("Error while adding new task...", error.message, newTask);
    }

    setNewTask({ title: "", description: "" });
  };
  const Task = async () => {
    const { data, error } = await supabase.from("tasks").select("*");

    setTask(data);

    if (error) {
      console.error("Error while loading  tasks...", error.message, task);
    }
  };
  useEffect(() => {
    Task();
  }, []);

  return (
    <main className="min-h-screen bg-gray-600 py-10 text-black">
      <div className="mx-auto max-w-2xl px-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-lg bg-amber-50 p-6 shadow"
        >
          <h1 className="text-2xl text-black font-bold">Todo App</h1>

          <input
            type="text"
            placeholder="Enter todo..."
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="rounded border border-gray-300 p-2 outline-none focus:border-amber-500"
          />

          <textarea
            placeholder="Description"
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
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
      <div>
        {task.map((task) => (
          <li
            className="bg-gray-300 gap-2 my-3 border-r-4 border-2 border-amber-800"
            key={task.id}
          >
            <div>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
            </div>
          </li>
        ))}
      </div>
    </main>
  );
}
