import { createContext, useContext, useState, useEffect } from "react";

import { createClient } from "@/lib/supabase/client";

const TaskCountsContext = createContext();

export function TaskCountsProvider({ children }) {
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

  useEffect(() => {
    const changes = supabase
      .channel("db-changes") // creates a channel.
      .on(
        "postgres_changes",
        {
          event: "*", //listens for all database events.
          schema: "public", // schema and table target your tasks table.
          table: "tasks",
        },
        () => {
          fetchTodoTasks();
          fetchInProgressTasks();
          fetchCompletedTasks();
        },
      )
      .subscribe();

    return () => {
      supabase.removeAllChannels(changes);
    };
  }, []);

  return (
    <TaskCountsContext.Provider
      value={{ todoCount, inProgressCount, completedCount, totalTasks }}
    >
      {children}
    </TaskCountsContext.Provider>
  );
}

export function useTaskCount() {
  const context = useContext(TaskCountsContext);

  if (!context) {
    // throw new Error("useTaskCount must be used inside TaskCountsProvider");
  }

  return context;
}
