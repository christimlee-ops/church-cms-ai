"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MemberSidebar from "@/components/members/MemberSidebar";

export default function MemberPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/members/login");
    }
    if (
      status === "authenticated" &&
      session?.user &&
      !["MEMBER", "ADMIN", "EDITOR"].includes((session.user as { role: string }).role)
    ) {
      router.push("/members/login");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-navy-500 border-t-gold-500 rounded-full animate-spin" />
          <p className="text-secondary-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (status !== "authenticated") {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <MemberSidebar />
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div />
          <div className="flex items-center gap-4">
            <span className="text-sm text-secondary-500">
              {session.user?.name}
            </span>
            <div className="w-8 h-8 bg-navy-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {session.user?.name?.charAt(0) || "M"}
            </div>
          </div>
        </header>
        {/* Content */}
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
