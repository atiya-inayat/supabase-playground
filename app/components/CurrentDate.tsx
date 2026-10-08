"use client"; // Mark as a Client Component

import { useState, useEffect } from "react";

export default function CurrentDate() {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    // This runs only in the browser, using the user's local timezone
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    setFormattedDate(today.toLocaleDateString("en-US", options));
  }, []);

  // Return a fallback/loading skeleton while the date is being loaded
  return <span>{formattedDate || "Loading date..."}</span>;
}
