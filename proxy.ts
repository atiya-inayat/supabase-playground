import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "./lib/supabase/server";

// request is the info about what we are requesting like dashboard , e.g, url, method, headers etc
export async function proxy(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("PROXY USER:", user);
  if (!user) {
    // dont let them continue . send them somewhere else - e.g "home"
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

// basically matcher is telling Nextjs "For which pages should you use my proxy?"
export const config = {
  matcher: "/dashboard",
};
