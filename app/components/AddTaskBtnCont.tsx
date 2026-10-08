import React, { useEffect, useState } from "react";
import Form from "./CreateTaskForm";
import CurrentDate from "./CurrentDate";

const AddTaskBtnCont = ({ userId }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex justify-between  w-full">
      <div className="w-full flex  flex-col">
        <h1 className="text-2xl font-bold uppercase">My Tasks</h1>
        <p className="text-gray-400 text-sm">
          <CurrentDate />
        </p>
      </div>

      <div className="w-full flex items-center justify-end ">
        <button
          className=" px-4 py-2 cursor-pointer bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg "
          onClick={() => setShowForm(true)}
        >
          + Add task{" "}
        </button>
        {showForm && (
          <Form userId={userId} onClose={() => setShowForm(false)} />
        )}
      </div>
    </div>
  );
};

export default AddTaskBtnCont;
