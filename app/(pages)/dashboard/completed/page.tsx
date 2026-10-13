"use client";

import DeleteTask from "@/app/components/DeleteTask";
import { fetchTasks } from "@/lib/tasks";
import React, { useEffect, useState } from "react";

const page = () => {
  const [tasks, setTasks] = useState([]);

  const loadTask = async () => {
    const data = await fetchTasks();

    const completedTask = data.filter((tasks) => tasks.status === "done");
    setTasks(completedTask);
  };

  useEffect(() => {
    loadTask();
  }, []);

  const reopenTask = async (taskId) => {
    const { error } = await supabase
      .from("tasks")
      .update({ status: "todo" })
      .eq("id", taskId);

    if (error) {
      console.error("Error reopening task:", error.message);
      return;
    }

    // Remove the reopened task from this page
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Completed</h1>
        <p className="mt-1 text-sm text-gray-500">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"} finished
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-6 py-4">Task</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Completed</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold line-through text-gray-900">
                  {task.title}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {task.description || "—"}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                    {task.priority}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {task.completed_at
                    ? new Date(task.completed_at).toISOString().split("T")[0]
                    : "—"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => reopenTask(task.id)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Reopen
                    </button>

                    <DeleteTask task={task} />
                  </div>
                </td>
              </tr>
            ))}

            {tasks.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No completed tasks yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;

// "use client";

// import DeleteTask from "@/app/components/DeleteTask";
// import { fetchTasks } from "@/lib/tasks";
// import { createClient } from "@/lib/supabase/client";
// import { useEffect, useState } from "react";

// const Page = () => {
//   const [tasks, setTasks] = useState([]);
//   const supabase = createClient();

//   const loadTask = async () => {
//     const data = await fetchTasks();

//     // Display only completed tasks
//     setTasks(data.filter((task) => task.status === "done"));
//   };

//   useEffect(() => {
//     loadTask();
//   }, []);

//   const reopenTask = async (taskId) => {
//     const { error } = await supabase
//       .from("tasks")
//       .update({ status: "todo" })
//       .eq("id", taskId);

//     if (error) {
//       console.error("Error reopening task:", error.message);
//       return;
//     }

//     // Remove the reopened task from this page
//     setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-900">Completed</h1>
//         <p className="mt-1 text-sm text-gray-500">
//           {tasks.length} {tasks.length === 1 ? "task" : "tasks"} finished
//         </p>
//       </div>

//       <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
//         <table className="w-full text-left">
//           <thead className="bg-gray-100 text-xs font-semibold uppercase tracking-wider text-gray-500">
//             <tr>
//               <th className="px-6 py-4">Task</th>
//               <th className="px-6 py-4">Description</th>
//               <th className="px-6 py-4">Priority</th>
//               <th className="px-6 py-4">Completed</th>
//               <th className="px-6 py-4">Actions</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-100">
//             {tasks.map((task) => (
//               <tr key={task.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 font-semibold text-gray-900">
//                   {task.title}
//                 </td>

//                 <td className="px-6 py-4 text-sm text-gray-600">
//                   {task.description || "—"}
//                 </td>

//                 <td className="px-6 py-4">
//                   <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
//                     {task.priority}
//                   </span>
//                 </td>

//                 <td className="px-6 py-4 text-sm text-gray-600">
//                   {task.completed_at
//                     ? new Date(task.completed_at).toISOString().split("T")[0]
//                     : "—"}
//                 </td>

//                 <td className="px-6 py-4">
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => reopenTask(task.id)}
//                       className="text-sm font-medium text-blue-600 hover:text-blue-800"
//                     >
//                       Reopen
//                     </button>

//                     <DeleteTask task={task} />
//                   </div>
//                 </td>
//               </tr>
//             ))}

//             {tasks.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={5}
//                   className="px-6 py-10 text-center text-gray-500"
//                 >
//                   No completed tasks yet.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Page;
