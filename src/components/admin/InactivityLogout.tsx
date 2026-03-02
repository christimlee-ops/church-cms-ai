"use client";

import { useEffect, useCallback, useRef } from "react";
import { signOut } from "next-auth/react";

const TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

export default function InactivityLogout() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      signOut({ callbackUrl: "/admin/login" });
    }, TIMEOUT_MS);
  }, []);

  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll", "touchstart", "click"];

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // start the timer

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [resetTimer]);

  return null;
}
