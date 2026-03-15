import { prisma } from "@/lib/prisma";
import { FiFileText, FiEdit3, FiCalendar, FiMail, FiTrendingUp, FiEye } from "react-icons/fi";
import Link from "next/link";

async function getStats() {
  try {
    const [pages, posts, events, contacts] = await Promise.all([
      prisma.page.count(),
      prisma.blogPost.count(),
      prisma.event.count({ where: { status: "UPCOMING" } }),
      prisma.contactSubmission.count({ where: { read: false } }),
    ]);
    return { pages, posts, events, contacts };
  } catch {
    return { pages: 0, posts: 0, events: 0, contacts: 0 };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    { label: "Pages", value: stats.pages, icon: FiFileText, href: "/admin/pages", color: "bg-navy-500" },
    { label: "Blog Posts", value: stats.posts, icon: FiEdit3, href: "/admin/blog", color: "bg-gold-500" },
    { label: "Upcoming Events", value: stats.events, icon: FiCalendar, href: "/admin/events", color: "bg-navy-600" },
    { label: "Unread Messages", value: stats.contacts, icon: FiMail, href: "/admin/contacts", color: "bg-gold-600" },
  ];

  const quickActions = [
    { label: "New Page", href: "/admin/pages/new", icon: FiFileText },
    { label: "New Blog Post", href: "/admin/blog/new", icon: FiEdit3 },
    { label: "New Event", href: "/admin/events/new", icon: FiCalendar },
    { label: "View Site", href: "/", icon: FiEye },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-navy-800">Dashboard</h1>
        <p className="text-secondary-500 mt-1">Welcome to the Calvary Lutheran Church CMS</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <FiTrendingUp className="w-5 h-5 text-gray-300" />
            </div>
            <p className="text-3xl font-bold text-navy-800">{stat.value}</p>
            <p className="text-secondary-400 text-sm mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-10">
        <h2 className="text-lg font-heading font-semibold text-navy-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-gold-500 hover:bg-gold-50 transition-all group"
            >
              <action.icon className="w-8 h-8 text-gray-400 group-hover:text-gold-600 transition-colors" />
              <span className="text-sm font-medium text-secondary-500 group-hover:text-gold-600">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-heading font-semibold text-navy-800 mb-4">Recent Activity</h2>
        <div className="text-center py-8 text-secondary-400">
          <p>Activity will appear here as you create content.</p>
        </div>
      </div>
    </div>
  );
}
