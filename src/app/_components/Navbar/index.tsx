import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";
import SignOutButton from "./SignOutButton";
import Link from "next/link";

const Navbar = async () => {
  const session = await getServerAuthSession();
  if (!session?.user) return redirect("/");
  const { user } = session;
  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
  ];
  if (user.systemRole === "superadmin") {
    links.push({
      name: "Super Admin",
      href: "/superadmin",
    });
  }
  if (user.systemRole === "superadmin" || user.systemRole === "admin") {
    links.push({
      name: "Admin",
      href: "/admin",
    });
    links.push({
      name: "Orgazations",
      href: "/organizations",
    });
  }
  return (
    <nav className="flex h-20 items-center gap-4 border-b px-10">
      <h1 className="text-xl font-bold">Navbar</h1>
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.name}
        </Link>
      ))}

      <div className="ml-auto" />
      <span>{user.email}</span>
      <span>role: {user.systemRole}</span>
      <SignOutButton />
    </nav>
  );
};

export default Navbar;
