import MemberPortalShell from "@/components/members/MemberPortalShell";

export const dynamic = "force-dynamic";

export default function MemberPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MemberPortalShell>{children}</MemberPortalShell>;
}
