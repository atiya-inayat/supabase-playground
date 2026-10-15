"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useTaskCount } from "../context/TaskCountContext";

const FilterCards = ({}) => {
  const { totalTasks, todoCount, inProgressCount, completedCount } =
    useTaskCount();

  return (
    <div className=" w-full mb-1 flex ">
      <div className="bg-white/60 border border-gray-200 px-5  shadow-sm py-4 m-2 rounded-md w-full flex flex-col justify-center items-start">
        <h1 className="text-3xl font-bold">{totalTasks}</h1>
        <p className="text-sm text-gray-400">Total</p>
      </div>
      <div className="bg-white/60 border border-gray-200 px-5  shadow-sm py-4 m-2 rounded-md w-full flex flex-col justify-center items-start">
        <h1 className="text-3xl text-purple-800 font-bold">{todoCount}</h1>
        <p className="text-sm text-gray-400">Todo</p>
      </div>
      <div className="bg-white/60 border border-gray-200 px-5  shadow-sm py-4 m-2 rounded-md w-full flex flex-col justify-center items-start">
        <h1 className="text-3xl text-blue-800 font-bold">{inProgressCount}</h1>
        <p className="text-sm text-gray-400">In Progress</p>
      </div>
      <div className="bg-white/60 border border-gray-200 px-5  shadow-sm py-4 m-2 rounded-md w-full flex flex-col justify-center items-start">
        <h1 className="text-3xl text-green-800 font-bold">{completedCount}</h1>
        <p className="text-sm text-gray-400">Completed</p>
      </div>
    </div>
  );
};

export default FilterCards;
