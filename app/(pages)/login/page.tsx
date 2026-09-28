"use client";

import { supabase } from "@/app/supabase-client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error logging in:", error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 text-black bg-white border-2 border-gray-300 rounded-lg shadow-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <h1 className="text-xl font-bold">Login</h1>

          <div className="flex flex-col gap-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="email"
              placeholder="Enter Email"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="password"
              placeholder="**********"
            />
          </div>

          <div className="space-y-2">
            <button
              className="w-full px-4 py-2 mt-4 font-bold text-white bg-gray-700 rounded cursor-pointer hover:bg-blue-600"
              type="submit"
            >
              Login
            </button>

            <span className="text-gray-500">Don't have an account?</span>

            <Link className="font-bold text-blue-700" href="/sign-up">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
