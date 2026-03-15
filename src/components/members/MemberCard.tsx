"use client";

import Link from "next/link";
import Image from "next/image";
import { FiPhone } from "react-icons/fi";

interface MemberCardProps {
  member: {
    id: string;
    name: string;
    photoUrl: string | null;
    family: string | null;
    phone: string | null;
    isVisible: boolean;
  };
}

export default function MemberCard({ member }: MemberCardProps) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={`/members/directory/${member.id}`}>
      <div className="card p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
        {/* Photo */}
        <div className="mx-auto mb-4">
          {member.photoUrl ? (
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto">
              <Image
                src={member.photoUrl}
                alt={member.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-navy-500 to-navy-900 flex items-center justify-center mx-auto">
              <span className="text-xl font-heading font-bold text-gold-400">
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="font-heading font-semibold text-secondary-900">
          {member.name}
        </h3>

        {/* Family */}
        {member.family && (
          <p className="text-sm text-secondary-500 mt-1">{member.family}</p>
        )}

        {/* Phone */}
        {member.phone && (
          <div className="flex items-center justify-center gap-1.5 text-sm text-secondary-400 mt-2">
            <FiPhone className="w-3.5 h-3.5" />
            <span>{member.phone}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
