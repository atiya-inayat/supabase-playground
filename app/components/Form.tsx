"use client";

import { useState } from "react";
import { supabase } from "../supabase-client";

const Form = ({ userId, onClose }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

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
      priority: "medium",
      status: "todo",
    });
  };

  return (
    <div className="w-full">
      {/* CREATE FORM */}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-4 p-5 bg-gray-300 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold text-black">Create Task</h2>

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
          <select
            name="priority"
            id=""
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                priority: e.target.value,
              })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select
            name="status"
            id=""
            value={newTask.status}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                status: e.target.value,
              })
            }
          >
            <option value="todo">Todo</option>
            <option value="progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2 font-medium text-white bg-gray-500 rounded hover:bg-gray-600"
          >
            Add Todo
          </button>

          <button onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
