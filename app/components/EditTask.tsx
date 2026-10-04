import React, { useEffect, useState } from "react";
import { supabase } from "../supabase-client";

const EditTask = ({ task, onClose, refreshTasks }) => {
  // This state stores the NEW values while we are editing a Todo.
  const [editTask, setEditTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
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
      .update(editTask)
      .eq("id", id);

    if (error) {
      console.error("Update failed...", error.message);
      return;
    }
    setEditTask({
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
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
    });
  }, [task]);

  return (
    <div className="flex flex-row gap-4">
      <form className="" onSubmit={handleUpdateTask}>
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
          className="p-2 font-bold border border-gray-400 rounded outline-none focus:border-gray-500"
        />

        <textarea
          placeholder="Description"
          value={editTask.description}
          className="p-2 text-gray-700 border border-gray-400 rounded outline-none min-h-24 focus:border-gray-500"
          onChange={(e) =>
            setEditTask({
              ...editTask,
              description: e.target.value,
            })
          }
        />
        <select
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
        <select
          name="status"
          id=""
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

        <div className="flex gap-2 ">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 font-medium text-white bg-red-500 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 font-medium text-white bg-gray-500 rounded hover:bg-gray-600"
          >
            Save
          </button>
        </div>
      </form>
      {/* {/* EDIT CHANGE 10:
                        This input displays the current editTask title.
                    */}
      {/* <input
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
      <select
        name="priority"
        id=""
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
      <select
        name="status"
        id=""
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

      <div className="flex gap-2 ">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 font-medium text-white bg-red-500 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 font-medium text-white bg-gray-500 rounded hover:bg-gray-600"
        >
          Save
        </button>
      </div>*/}
    </div>
  );
};

export default EditTask;
