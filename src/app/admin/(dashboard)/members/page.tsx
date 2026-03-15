"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiPhone, FiMail, FiUsers } from "react-icons/fi";

interface Member {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  memberProfile: {
    phone: string | null;
    address: string | null;
    birthday: string | null;
    photoUrl: string | null;
    bio: string | null;
    family: string | null;
    joinDate: string | null;
  } | null;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/members")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMembers(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete member "${name}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/members/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMembers(members.filter((m) => m.id !== id));
      } else {
        alert("Failed to delete member");
      }
    } catch {
      alert("Failed to delete member");
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-secondary-800">Members</h1>
          <p className="text-secondary-500 mt-1">Manage church members</p>
        </div>
        <Link href="/admin/members/new" className="btn-primary">
          <FiPlus className="w-5 h-5" /> Add Member
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-secondary-400">Loading members...</div>
        </div>
      ) : members.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <FiUsers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-secondary-600">No members yet</h3>
          <p className="text-secondary-400 mt-2">Add your first church member to get started.</p>
          <Link href="/admin/members/new" className="btn-primary mt-4 inline-flex">
            <FiPlus className="w-4 h-4" /> Add Member
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-secondary-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-secondary-500 uppercase tracking-wider">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-secondary-500 uppercase tracking-wider">Phone</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-secondary-500 uppercase tracking-wider">Join Date</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-secondary-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {member.memberProfile?.photoUrl ? (
                          <img src={member.memberProfile.photoUrl} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-medium">
                            {member.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="font-medium text-secondary-800">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-secondary-500 text-sm">
                        <FiMail className="w-3.5 h-3.5" />
                        {member.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-secondary-500 text-sm">
                        <FiPhone className="w-3.5 h-3.5" />
                        {member.memberProfile?.phone || "—"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary-500">
                      {formatDate(member.memberProfile?.joinDate || member.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/members/${member.id}`}
                          className="p-2 text-secondary-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Edit member"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(member.id, member.name)}
                          className="p-2 text-secondary-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete member"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
