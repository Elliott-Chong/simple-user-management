import type { RouterOutputs } from "@/trpc/shared";
import Link from "next/link";
import React from "react";

type Props = {
  organizations: RouterOutputs["organizations"]["getAllOrganizations"];
};

const AllOrganizationsList = ({ organizations }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
      {organizations.map((org) => (
        <Link
          href={`/organizations/${org.id}`}
          key={org.id}
          className="cursor-pointer overflow-hidden rounded-md border bg-white shadow transition hover:scale-105 hover:shadow-xl"
        >
          <img src="https://random.imagecdn.app/500/300" />
          <div className="p-4">
            <p className="font-medium">{org.name}</p>
            <p className="texet-gray-600 text-sm">
              {org.createdAt.toLocaleDateString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllOrganizationsList;
