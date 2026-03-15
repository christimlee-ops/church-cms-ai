"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiUsers,
  FiMessageSquare,
  FiFile,
  FiUser,
  FiLogOut,
  FiArrowLeft,
} from "react-icons/fi";
import { signOut } from "next-auth/react";

const navItems = [
  { name: "Dashboard", href: "/members", icon: FiHome },
  { name: "Directory", href: "/members/directory", icon: FiUsers },
  { name: "Announcements", href: "/members/announcements", icon: FiMessageSquare },
  { name: "Resources", href: "/members/resources", icon: FiFile },
  { name: "My Profile", href: "/members/profile", icon: FiUser },
];

export default function MemberSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-navy-900 text-white min-h-screen flex flex-col">
      {/* Gold accent */}
      <div className="h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400" />

      {/* Logo */}
      <div className="p-6 border-b border-navy-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gold-500 rounded-lg flex items-center justify-center">
            <span className="text-navy-900 font-heading font-bold text-xs">CLC</span>
          </div>
          <div>
            <span className="font-heading font-semibold text-sm text-white">Calvary</span>
            <span className="block text-xs text-gold-400">Members Portal</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/members" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                isActive
                  ? "bg-gold-500/15 text-gold-400 border-r-[3px] border-gold-500"
                  : "text-gray-400 hover:text-white hover:bg-navy-800"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-navy-800 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-navy-800 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/members/login" })}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-red-400 hover:bg-navy-800 rounded-lg transition-colors w-full"
        >
          <FiLogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
