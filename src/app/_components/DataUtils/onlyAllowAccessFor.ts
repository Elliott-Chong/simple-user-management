import { getServerAuthSession } from "@/server/auth";
import type { SystemRole } from "@prisma/client";
import { redirect } from "next/navigation";

export const onlyAllowAccessFor = async (roles: SystemRole[]) => {
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/");
  if (!roles.includes(session.user.systemRole)) redirect("/");
};
