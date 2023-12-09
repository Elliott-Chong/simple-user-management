import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import Link from "next/link";
import React from "react";

const AllOrganizations = async () => {
  const allOrganization = await db.organization.findMany();
  return (
    <>
      <h1 className="text-xl font-medium">All Organizations</h1>
      <div className="h-4"></div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        {allOrganization.length === 0 && (
          <p className="text-gray-500">No organizations...</p>
        )}
        {allOrganization.map((organization) => {
          return (
            <Link
              href={`/organizations/${organization.id}`}
              className="overflow-hidden rounded-lg border bg-white shadow transition hover:scale-105 hover:shadow-xl"
              key={organization.id}
            >
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="truncate text-lg font-medium">
                    {organization.name}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-gray-500">
                    Created on {organization.createdAt.toLocaleDateString()}
                  </dd>
                </dl>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

const SuperAdminDashboard = async () => {
  return (
    <>
      <AllOrganizations />
    </>
  );
};

export default SuperAdminDashboard;
