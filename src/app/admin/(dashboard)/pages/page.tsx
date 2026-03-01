import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import PagesTable from "./PagesTable";

async function getPages() {
  try {
    return await prisma.page.findMany({
      orderBy: { updatedAt: "desc" },
      include: { author: { select: { name: true } } },
    });
  } catch {
    return [];
  }
}

export default async function AdminPagesPage() {
  const pages = await getPages();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-secondary-800">Pages</h1>
          <p className="text-secondary-500 mt-1">Manage your website pages</p>
        </div>
        <Link href="/admin/pages/new" className="btn-primary">
          <FiPlus className="w-5 h-5" /> New Page
        </Link>
      </div>

      <PagesTable pages={JSON.parse(JSON.stringify(pages))} />
    </div>
  );
}
