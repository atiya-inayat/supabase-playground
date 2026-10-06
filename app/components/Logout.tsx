"use client";

import { useRouter } from "next/navigation";
// import { supabase } from "../supabase-client";
import { createClient } from "@/lib/supabase/client";

const Logout = () => {
  const supabase = createClient();
  const router = useRouter();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    }
    console.log("User logged out");
    router.push("/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>Sign out</button>
    </div>
  );
};

export default Logout;
