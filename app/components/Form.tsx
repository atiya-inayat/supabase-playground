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
    <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* CREATE FORM */}

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-4 p-5 rounded-lg shadow"
        >
          <div className="flex items-center justify-between gap-3 ">
            <h2 className="text-2xl font-bold text-black">New Task</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-400"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-3 ">
            <label className="text-sm font-bold text-gray-700" htmlFor="title">
              TITLE <span className="text-red-500">*</span>
            </label>
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
              className="p-2 font-bold border placeholder:text-gray-400 text-sm border-purple-200 rounded-md outline-none focus:border-purple-700"
            />

            <label
              className="text-sm font-bold text-gray-700"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              placeholder="Optional details"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  description: e.target.value,
                })
              }
              className="p-2 text-gray-700 border placeholder:text-gray-400 text-sm border-purple-200 rounded-md outline-none min-h-24 focus:border-purple-700"
            />
            <div className="flex w-full items-center  justify-between gap-3">
              <div className="flex flex-col gap-2  w-full">
                <label
                  htmlFor="priority"
                  className="text-sm font-bold text-gray-700"
                >
                  Priority
                </label>
                <select
                  className="border border-purple-200 rounded-md outline-none focus:border-purple-700 text-sm w-full px-4 py-2"
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
              </div>
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="">Status</label>
                <select
                  className="border border-purple-200 rounded-md outline-none focus:border-purple-700 text-sm w-full px-4 py-2"

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
              </div>
            </div>

            <div className="flex w-full items-center justify-between gap-3">
              <button
                className="px-4 w-full py-2 font-medium text-black bg-white border border-purple-200 rounded-lg hover:text-gray-400"

                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 w-full py-2  font-bold text-white bg-purple-700 rounded-lg hover:bg-purple-600"
              >
                Add Todo
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
