import { onlyAllowAccessFor } from "@/app/_components/DataUtils/onlyAllowAccessFor";
import { api } from "@/trpc/server";
import React from "react";
import AllOrganizationsList from "./AllOrganizationsList";
import dynamic from "next/dynamic";
const CreateOrganization = dynamic(() => import("./CreateOrganization"), {
  ssr: false,
});

const OrganizationsPage = async () => {
  await onlyAllowAccessFor(["admin", "superadmin"]);
  const allOrganizations = await api.organizations.getAllOrganizations.query();
  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-medium">Organizations</h1>
        <CreateOrganization />
      </div>
      <div className="h-6"></div>
      {allOrganizations.length === 0 && (
        <div className="text-gray-400">No organizations yet.</div>
      )}
      <AllOrganizationsList organizations={allOrganizations} />
    </>
  );
};

export default OrganizationsPage;
