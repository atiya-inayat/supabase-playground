"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";

const signup = () => {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

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
    <main className="flex items-center justify-center min-h-screen bg-gray-700">
      <div className="bg-purple-700 px-8 min-h-screen w-full flex flex-col items-start justify-evenly text-white space-y-8">
        <div className="flex w-full pt-7 px-3  items-center">
          <h1 className="font-bold text-shadow-fuchsia-300">✦ Taskly</h1>
        </div>
        <div className=" w-full flex flex-col p-4">
          <h1 className="text-3xl">"Clarity with a single, commited list."</h1>
          <div className="space-y-4 mt-8 text-gray-200">
            <p className="text-sm text-gray-300 ">
              <span className="border p-1 text-sm bg-purple-400/25 border-purple-300 rounded-md">
                ⚡
              </span>{" "}
              Lightning fast task creation
            </p>
            <p className="text-sm text-gray-300 ">
              <span className="border text-sm p-1 bg-purple-400/25 border-purple-300 rounded-md">
                📊
              </span>{" "}
              Track progress at a glance
            </p>
            <p className="text-sm text-gray-300 ">
              <span className="border text-sm p-1 bg-purple-400/25 border-purple-300 rounded-md">
                🔒
              </span>{" "}
              Private and secure by default
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col items-start justify-center p-4 text-gray-300">
          <p className="text-xs">&copy; 2026 Taskly. All rights reserved.</p>
        </div>
      </div>
      <div className=" text-black  w-full min-h-screen flex justify-center items-center bg-white  border-gray-300   ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center  px-3 justify-center space-y-4"
        >
          <div className="w-full flex flex-col   justify-center space-y-2">
            <h1 className="text-xl font-extrabold ">Create account</h1>
            <p className="text-gray-400 text-sm mt-2">
              Start organizing your work day
            </p>
          </div>
          <div className="flex flex-col  w-full gap-4 space-y-2">
            <div className="flex flex-col gap-1">
              <label className="text-gray-500 text-sm font-bold">
                FULL NAME
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Johnson"
                type="text"
                className="w-full placeholder:text-gray-400 text-sm px-3 py-3 border border-gray-200 rounded-lg hover:border-purple-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500 text-sm font-bold">
                EMAIL ADDRESS
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full placeholder:text-gray-400 text-sm px-3 py-3 border border-gray-200 rounded-lg hover:border-purple-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                type="email"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500 text-sm font-bold">
                PASSWORD
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full placeholder:text-gray-400 text-sm px-3 py-3 border border-gray-200 rounded-lg hover:border-purple-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                type="password"
                placeholder="**********"
              />
            </div>
          </div>
          <div className="space-y-2 ">
            <button
              className="w-full px-4 py-2 mt-4 font-bold text-white bg-purple-700 rounded-md  cursor-pointer hover:bg-purple-600"
              type="submit"
            >
              Sign Up
            </button>
            <span className="text-gray-500 text-sm">
              Already have account?{" "}
            </span>
            <Link className="font-bold text-sm text-purple-700" href="/login">
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
