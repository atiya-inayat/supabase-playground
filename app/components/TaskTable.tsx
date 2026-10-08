"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const supabase = createClient();

const TaskTable = () => {
  const [tasks, settask] = useState([]);

  const fetchTask = async () => {
    const { error, data } = await supabase.from("tasks").select("*");

    if (error) {
      console.log("Error loading tasks", error);
    } else {
      settask(data);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const getStatusColor = (status) => {
    if (status === "todo") return "text-purple-700";
    if (status === "progress") return "text-blue-700";
    if (status === "done") return "text-green-700";

    return "";
  };

  const getPriorityColor = (priority) => {
    if (priority === "low") {
      return "text-green-700";
    }
    if (priority === "medium") {
      return "text-orange-500";
    }
    if (priority === "high") {
      return "text-red-700";
    }
  };

  return (
    <div className=" rounded-lg shadow border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-sm text-left text-gray-500">
        <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-500 tracking-wider">
          <tr>
            <th className="px-6 py-3">TASK</th>
            <th className="px-6 py-3">DESCRIPTION</th>
            <th className="px-6 py-3">PRIORITY</th>
            <th className="px-6 py-3">STATUS</th>
            <th className="px-6 py-3">CREATED</th>
            <th className="px-6 py-3">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr
              className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50 transition-colors"

              key={task.id}
            >
              <td className="px-6 py-4 font-bold  text-gray-900 whitespace-nowrap">
                {task.title}
              </td>
              <td className="max-w-xs truncate overflow-hidden px-6 py-4 text-sm text-gray-500">
                {task.description}
              </td>
              <td className={getPriorityColor(task.priority)}>
                {task.priority}
              </td>
              <td className={getStatusColor(task.status)}>{task.status}</td>
              <td>{new Date(task.created_at).toISOString().split("T")[0]}</td>
              <td className="gap-2 flex">
                <button className="border-purple-200 text-sm border rounded-lg px-2 py-1 text-purple-700">
                  Edit
                </button>
                <button className="border-red-200 text-sm border rounded-lg px-2 py-1 text-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
