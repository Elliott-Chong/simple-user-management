import { api } from "@/trpc/server";
import React from "react";
import ProjectsList from "./ProjectsList";
import dynamic from "next/dynamic";
import { db } from "@/server/db";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import InviteUpperManagement from "./InviteUpperManagement";

const CreateProject = dynamic(() => import("./CreateProject"), { ssr: false });

type Props = {
  params: {
    orgId: string;
  };
};

const OrgIdPage = async ({ params: { orgId } }: Props) => {
  const organization = await db.organization.findUnique({
    where: {
      id: orgId,
    },
    include: {
      userOrganizations: {
        include: {
          user: true,
        },
      },
    },
  });
  if (!organization) return notFound();
  const projects = await api.organizations.getProjects.query({ orgId });
  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="flex items-center gap-1 text-xl font-medium">
          {organization.name} <ChevronRight className="inline" /> Projects
        </h1>
        <CreateProject orgId={orgId} />
      </div>
      <div className="h-6"></div>
      <InviteUpperManagement organization={organization} />
      <div className="h-6"></div>
      {organization.userOrganizations.length > 0 && (
        <>
          <h1 className="font-medium">
            All upper management in this organization:
          </h1>
          <div className="h-2"></div>
          <ul className="list-inside list-disc">
            {organization.userOrganizations.map((userOrganization) => {
              return (
                <li key={userOrganization.userId}>
                  {userOrganization.user.email}
                </li>
              );
            })}
          </ul>
          <div className="h-6"></div>
        </>
      )}
      {projects.length === 0 && (
        <div className="text-gray-400">No projects yet.</div>
      )}
      <ProjectsList projects={projects} />
    </>
  );
};

export default OrgIdPage;
