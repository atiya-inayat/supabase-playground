"use client";

import { supabase } from "@/app/supabase-client";
import Link from "next/link";
import { useState } from "react";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3001/",
      },
    });

    if (error) {
      console.error("Error signing up:", error);
    } else {
      console.log("Signup successful");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 text-black bg-white border-2 border-gray-300 rounded-lg shadow-md ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <h1 className="text-xl font-bold ">Sign Up</h1>
          <div className="flex flex-col gap-4 space-y-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded border-e-gray-500"
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
          <div className="space-y-2 ">
            <button
              className="w-full px-4 py-2 mt-4 font-bold text-white bg-gray-700 rounded cursor-pointer hover:bg-blue-600"
              type="submit"
            >
              Sign Up
            </button>
            <span className="text-gray-500"> Already have account?</span>
            <Link className="font-bold text-blue-700" href="/login">
              {" "}
              sign in
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default signup;
