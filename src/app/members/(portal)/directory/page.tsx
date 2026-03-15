"use client";

import { useEffect, useState } from "react";
import MemberCard from "@/components/members/MemberCard";
import { FiSearch } from "react-icons/fi";

interface Member {
  id: string;
  name: string;
  photoUrl: string | null;
  family: string | null;
  phone: string | null;
  isVisible: boolean;
}

export default function DirectoryPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/members")
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-secondary-900">
          Member Directory
        </h1>
        <p className="text-secondary-500 mt-1">
          Browse and connect with fellow members.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-navy-500 border-t-gold-500 rounded-full animate-spin" />
        </div>
      ) : filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <div className="card p-8 text-center text-secondary-500">
          {search ? "No members found matching your search." : "No members in the directory yet."}
        </div>
      )}
    </div>
  );
}
