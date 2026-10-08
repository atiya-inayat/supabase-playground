"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const FilterCards = () => {
  const [todoCount, setTodoCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const supabase = createClient();

  const fetchTodoTasks = async () => {
    const { error, count } = await supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .eq("status", "todo");

    if (error) {
      console.error("Error fetching tasks:", error.message);
      return;
    } else {
      console.log("Fetched todo tasks:", count);
      setTodoCount(count);
    }
  };
  const fetchInProgressTasks = async () => {
    const { error, count } = await supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .eq("status", "progress");

    if (error) {
      console.error("Error fetching tasks:", error.message);
      return;
    } else {
      console.log("Fetched in-progress tasks:", count);
      setInProgressCount(count);
    }
  };
  const fetchCompletedTasks = async () => {
    const { error, count } = await supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .eq("status", "done");

    if (error) {
      console.error("Error fetching tasks:", error.message);
      return;
    } else {
      console.log("Fetched completed tasks:", count);
      setCompletedCount(count);
    }
  };

  const totalTasks = todoCount + inProgressCount + completedCount;

  useEffect(() => {
    fetchTodoTasks();
    fetchInProgressTasks();
    fetchCompletedTasks();
  }, []);

  return (
    <div className=" w-full p-4 flex ">
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
