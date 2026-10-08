"use client";

import { useEffect, useState } from "react";
import Dashboard from "./(pages)/dashboard/page";

import { createClient } from "@/lib/supabase/client";
import Login from "./login/page";

const supabase = createClient();

export default function Home() {
  const [session, setSession] = useState<any>(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log(currentSession);
    setSession(currentSession.data.session);
  };

  useEffect(() => {
    fetchSession();

    // Supabase calls your function whenever authentication changes.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // "When this component is removed, stop listening for auth changes."
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <main>{session ? <Dashboard /> : <Login />}</main>;
}
