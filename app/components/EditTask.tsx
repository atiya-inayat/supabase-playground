import { createClient } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";

const EditTask = ({ task, onClose, refreshTasks }) => {
  const supabase = createClient();
  // This state stores the NEW values while we are editing a Todo.
  const [editTask, setEditTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    created_at: new Date().toISOString(),
    id: null,
  });

  // This stores the ID of the Todo that we are currently editing.
  const [editId, setEditId] = useState(null);

  const handleUpdateTask = (e) => {
    e.preventDefault();
    updateTask(editId);
  };

  // ---------------- UPDATE ----------------

  // id = WHICH Todo should be updated?
  // editTask = WHAT should that Todo become?
  const updateTask = async (id) => {
    const { error } = await supabase
      .from("tasks")
      .update({
        title: editTask.title,
        description: editTask.description,
        priority: editTask.priority,
        status: editTask.status,
      })
      .eq("id", id)
      .select();

    console.log("Updating:", id, editTask);

    if (error) {
      console.error("Update failed...", error.message);
      return;
    }
    setEditTask({
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      created_at: new Date().toISOString(),
      id: null,
    });

    setEditId(null);
    await refreshTasks();
    onClose();
  };

  useEffect(() => {
    setEditId(task.id);

    // Copy the Todo's existing values into editTask.
    // These values will appear inside the edit inputs.
    setEditTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      created_at: task.created_at,
      id: task.id,
    });
  }, [task]);

  //   return (
  //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
  //       {" "}
  //       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
  //         <form className="" onSubmit={handleUpdateTask}>
  //           <input
  //             type="text"
  //             placeholder="Enter todo..."
  //             value={editTask.title}
  //             onChange={(e) =>
  //               setEditTask({
  //                 ...editTask,
  //                 title: e.target.value,
  //               })
  //             }
  //             className="p-2 font-bold border border-gray-400 rounded outline-none focus:border-gray-500"
  //           />

  //           <textarea
  //             placeholder="Description"
  //             value={editTask.description}
  //             className="p-2 text-gray-700 border border-gray-400 rounded outline-none min-h-24 focus:border-gray-500"
  //             onChange={(e) =>
  //               setEditTask({
  //                 ...editTask,
  //                 description: e.target.value,
  //               })
  //             }
  //           />
  //           <select
  //             name="priority"

  //             value={editTask.priority}
  //             onChange={(e) =>
  //               setEditTask({
  //                 ...editTask,
  //                 priority: e.target.value,
  //               })
  //             }
  //           >
  //             <option value="low">Low</option>
  //             <option value="medium">Medium</option>
  //             <option value="high">High</option>
  //           </select>
  //           <select
  //             name="status"
  //             id=""
  //             value={editTask.status}
  //             onChange={(e) =>
  //               setEditTask({
  //                 ...editTask,
  //                 status: e.target.value,
  //               })
  //             }
  //           >
  //             <option value="todo">Todo</option>
  //             <option value="progress">In Progress</option>
  //             <option value="done">Done</option>
  //           </select>

  //           <div className="flex gap-2 ">
  //             <button
  //               type="button"
  //               onClick={onClose}
  //               className="px-4 py-2 font-medium text-white bg-red-500 rounded hover:bg-gray-600"
  //             >
  //               Cancel
  //             </button>
  //             <button
  //               type="submit"
  //               className="px-4 py-2 font-medium text-white bg-gray-500 rounded hover:bg-gray-600"
  //             >
  //               Save
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div className="flex items-center gap-2 mb-4 text-gray-700">
          {" "}
          <span className="border border-purple-200 p-1 rounded-lg">📝</span>
          <div>
            <p className="text-gray-400 text-sm">
              Editing Task # {editTask.id}
            </p>
            <h1 className="font-bold"> {editTask.title.toUpperCase()}</h1>
          </div>
        </div>

        <form
          onSubmit={handleUpdateTask}
          className="flex flex-col justify-center gap-4 p-5 rounded-lg shadow"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-extrabold text-gray-800">Edit Task</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-400"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-gray-700" htmlFor="title">
              TITLE <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter todo..."
              value={editTask.title}
              onChange={(e) =>
                setEditTask({
                  ...editTask,
                  title: e.target.value,
                })
              }
              className="p-2 font-bold text-sm border placeholder:text-gray-400 border-purple-200 rounded-md outline-none focus:border-purple-700"
            />

            <label
              className="text-sm font-bold text-gray-700"
              htmlFor="description"
            >
              Description
            </label>

            <textarea
              placeholder="Optional details"
              value={editTask.description}
              className="p-2 text-gray-700 text-sm border placeholder:text-gray-400 border-purple-200 rounded-md outline-none min-h-24 focus:border-purple-700"
              onChange={(e) =>
                setEditTask({
                  ...editTask,
                  description: e.target.value,
                })
              }
            />

            <div className="flex w-full items-center justify-between gap-3">
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="priority"
                  className="text-sm font-bold text-gray-700"
                >
                  Priority
                </label>

                <select
                  className="border border-purple-200 rounded-md outline-none focus:border-purple-700 text-sm w-full px-4 py-2"
                  name="priority"
                  value={editTask.priority}
                  onChange={(e) =>
                    setEditTask({
                      ...editTask,
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
                <label
                  htmlFor="status"
                  className="text-sm font-bold text-gray-700"
                >
                  Status
                </label>

                <select
                  className="border border-purple-200 rounded-md outline-none focus:border-purple-700 text-sm w-full px-4 py-2"
                  name="status"
                  value={editTask.status}
                  onChange={(e) =>
                    setEditTask({
                      ...editTask,
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
                type="button"
                onClick={onClose}
                className="px-4 w-full py-2 font-medium text-black bg-white border border-purple-200 rounded-lg hover:text-gray-400"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 w-full py-2 font-bold text-white bg-purple-700 rounded-lg hover:bg-purple-600"
              >
                Save Changes
              </button>
            </div>
            <div className="flex  items-center justify-between gap-1 mt-2">
              <div>
                <p className="text-sm text-gray-500">Created At:</p>
                <p className="text-sm font-bold text-gray-600">
                  {" "}
                  {new Date(editTask.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm"> Task ID</p>
                <p className="text-sm font-bold text-gray-600">
                  ID # {editTask.id}
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
