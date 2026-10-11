import { createClient } from "./supabase/client";

export async function fetchTasks() {
  const supabase = createClient();

  const { data, error } = await supabase.from("tasks").select("*");

  if (error) {
    console.error("Error while loading tasks...", error.message);
    return [];
  }

  return data ?? [];
}
