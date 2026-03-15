"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiPhone, FiMail, FiCalendar, FiUsers } from "react-icons/fi";

interface MemberProfile {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  photoUrl: string | null;
  bio: string | null;
  family: string | null;
  joinDate: string | null;
  isVisible: boolean;
}

export default function MemberDetailPage() {
  const params = useParams();
  const [member, setMember] = useState<MemberProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/members/${params.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Not found");
          return res.json();
        })
        .then((data) => {
          setMember(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-navy-500 border-t-gold-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="text-center py-12">
        <p className="text-secondary-500 mb-4">Member not found.</p>
        <Link href="/members/directory" className="btn-primary">
          Back to Directory
        </Link>
      </div>
    );
  }

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div>
      <Link
        href="/members/directory"
        className="inline-flex items-center gap-2 text-secondary-500 hover:text-secondary-700 mb-6 transition-colors"
      >
        <FiArrowLeft className="w-4 h-4" />
        Back to Directory
      </Link>

      <div className="card p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Photo */}
          <div className="flex-shrink-0">
            {member.photoUrl ? (
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src={member.photoUrl}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-navy-500 to-navy-900 flex items-center justify-center">
                <span className="text-3xl font-heading font-bold text-gold-400">
                  {initials}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-heading font-bold text-secondary-900 mb-2">
              {member.name}
            </h1>

            {member.bio && (
              <p className="text-secondary-600 mb-6">{member.bio}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {member.phone && (
                <div className="flex items-center gap-3 text-secondary-600">
                  <FiPhone className="w-5 h-5 text-gold-500" />
                  <span>{member.phone}</span>
                </div>
              )}

              {member.email && (
                <div className="flex items-center gap-3 text-secondary-600">
                  <FiMail className="w-5 h-5 text-gold-500" />
                  <span>{member.email}</span>
                </div>
              )}

              {member.family && (
                <div className="flex items-center gap-3 text-secondary-600">
                  <FiUsers className="w-5 h-5 text-gold-500" />
                  <span>{member.family}</span>
                </div>
              )}

              {member.joinDate && (
                <div className="flex items-center gap-3 text-secondary-600">
                  <FiCalendar className="w-5 h-5 text-gold-500" />
                  <span>
                    Member since{" "}
                    {new Date(member.joinDate).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
