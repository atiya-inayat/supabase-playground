// "use client";

// import { createContext, useContext, useState, useEffect } from "react";

// import { createClient } from "@/lib/supabase/client";

// const TaskCountsContext = createContext();

// export function TaskCountsProvider({ children }) {
//   const [todoCount, setTodoCount] = useState(0);
//   const [inProgressCount, setInProgressCount] = useState(0);
//   const [completedCount, setCompletedCount] = useState(0);
//   const [totalTasks, setTotalTasks] = useState(0);

//   const supabase = createClient();

//   const fetchTodoTasks = async () => {
//     const { error, count } = await supabase
//       .from("tasks")
//       .select("*", { count: "exact", head: true })
//       .eq("status", "todo");

//     if (error) {
//       console.error("Error fetching tasks:", error.message);
//       return;
//     } else {
//       console.log("Fetched todo tasks:", count);
//       setTodoCount(count);
//     }
//   };
//   const fetchInProgressTasks = async () => {
//     const { error, count } = await supabase
//       .from("tasks")
//       .select("*", { count: "exact", head: true })
//       .eq("status", "progress");

//     if (error) {
//       console.error("Error fetching tasks:", error.message);
//       return;
//     } else {
//       console.log("Fetched in-progress tasks:", count);
//       setInProgressCount(count);
//     }
//   };
//   const fetchCompletedTasks = async () => {
//     const { error, count } = await supabase
//       .from("tasks")
//       .select("*", { count: "exact", head: true })
//       .eq("status", "done");

//     if (error) {
//       console.error("Error fetching tasks:", error.message);
//       return;
//     } else {
//       console.log("Fetched completed tasks:", count);
//       setCompletedCount(count);
//     }
//   };

//   const handleTotalTask = async () => {
//     const totalTasksName = todoCount + inProgressCount + completedCount;
//     setTotalTasks(totalTasksName);
//   };

//   useEffect(() => {
//     fetchTodoTasks();
//     fetchInProgressTasks();
//     fetchCompletedTasks();
//     handleTotalTask();
//   }, []);

//   useEffect(() => {
//     const changes = supabase
//       .channel("db-changes") // creates a channel.
//       .on(
//         "postgres_changes",
//         {
//           event: "*", //listens for all database events.
//           schema: "public", // schema and table target your tasks table.
//           table: "tasks",
//         },
//         () => {
//           fetchTodoTasks();
//           fetchInProgressTasks();
//           fetchCompletedTasks();
//         },
//       )
//       .subscribe();

//     return () => {
//       supabase.removeAllChannels(changes);
//     };
//   }, []);

//   return (
//     <TaskCountsContext.Provider
//       value={{ todoCount, inProgressCount, completedCount, totalTasks }}
//     >
//       {children}
//     </TaskCountsContext.Provider>
//   );
// }

// export function useTaskCount() {
//   const context = useContext(TaskCountsContext);

//   if (!context) {
//     // throw new Error("useTaskCount must be used inside TaskCountsProvider");
//   }

//   return context;
// }

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const TaskCountsContext = createContext(undefined);

export function TaskCountsProvider({ children }) {
  const [todoCount, setTodoCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [session, setSession] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  // Create one Supabase client for this provider.
  const [supabase] = useState(() => createClient());

  // 1. Listen for authentication changes.
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setAuthReady(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // 2. Fetch task counts.
  const fetchTaskCounts = async () => {
    const [todo, progress, completed] = await Promise.all([
      supabase
        .from("tasks")
        .select("*", { count: "exact", head: true })
        .eq("status", "todo"),

      supabase
        .from("tasks")
        .select("*", { count: "exact", head: true })
        .eq("status", "progress"),

      supabase
        .from("tasks")
        .select("*", { count: "exact", head: true })
        .eq("status", "done"),
    ]);

    if (todo.error || progress.error || completed.error) {
      console.error(
        "Error fetching task counts:",
        todo.error || progress.error || completed.error,
      );
      return;
    }

    setTodoCount(todo.count ?? 0);
    setInProgressCount(progress.count ?? 0);
    setCompletedCount(completed.count ?? 0);
  };

  // 3. Fetch tasks and subscribe only after authentication.
  useEffect(() => {
    if (!authReady) return;

    if (!session) {
      setTodoCount(0);
      setInProgressCount(0);
      setCompletedCount(0);
      return;
    }

    fetchTaskCounts();

    const channel = supabase
      .channel("db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
        },
        () => {
          fetchTaskCounts();
        },
      )
      .subscribe((status) => {
        console.log("Realtime status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session, authReady, supabase]);

  // 4. Calculate total automatically.
  const totalTasks = todoCount + inProgressCount + completedCount;

  return (
    <TaskCountsContext.Provider
      value={{
        todoCount,
        inProgressCount,
        completedCount,
        totalTasks,
      }}
    >
      {children}
    </TaskCountsContext.Provider>
  );
}

export function useTaskCount() {
  const context = useContext(TaskCountsContext);

  if (!context) {
    throw new Error("useTaskCount must be used inside TaskCountsProvider");
  }

  return context;
}
