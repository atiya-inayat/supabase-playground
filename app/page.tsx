"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabase-client";
import Dashboard from "./(pages)/dashboard/page";
import Link from "next/link";
import Login from "./(pages)/login/page";

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

  return (
    <main>
      <h1>Welcome to the Todo App</h1>
      {session ? <Dashboard /> : <Login />}
    </main>
  );
}
