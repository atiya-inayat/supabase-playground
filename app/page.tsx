// "use client";

// import { useEffect, useState } from "react";
// import Dashboard from "./(pages)/dashboard/page";

// import { createClient } from "@/lib/supabase/client";
// import Login from "./login/page";

// const supabase = createClient();

// export default function Home() {
//   const [session, setSession] = useState<any>(null);

//   const fetchSession = async () => {
//     const currentSession = await supabase.auth.getSession();
//     console.log(currentSession);
//     setSession(currentSession.data.session);
//   };

//   useEffect(() => {
//     fetchSession();

//     // Supabase calls your function whenever authentication changes.
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });

//     // "When this component is removed, stop listening for auth changes."
//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);

//   return <main>{session ? <Dashboard /> : <Login />}</main>;
// }

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function Home() {
  // useRouter - Next.js hook help navigate between pages
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // replace() means: Go to another page but replace the current page in browser history.
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    };

    checkSession();
  }, [router]);

  return <p className="p-6">Loading...</p>;
}
