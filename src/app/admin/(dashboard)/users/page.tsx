import { prisma } from "@/lib/prisma";
import UsersTable from "@/components/admin/UsersTable";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  // Serialize dates for the client component
  const serialized = users.map((u) => ({
    ...u,
    createdAt: u.createdAt.toISOString(),
  }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-secondary-900">Users</h1>
        <p className="text-secondary-500 mt-1">Manage admin, editor, and viewer accounts.</p>
      </div>
      <UsersTable initialUsers={serialized} />
    </div>
  );
}
