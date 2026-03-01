import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import SessionProvider from "@/components/providers/SessionProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
            <div />
            <div className="flex items-center gap-4">
              <span className="text-sm text-secondary-500">
                {session.user?.name}
              </span>
              <div className="w-8 h-8 bg-navy-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {session.user?.name?.charAt(0) || "A"}
              </div>
            </div>
          </header>
          {/* Content */}
          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
