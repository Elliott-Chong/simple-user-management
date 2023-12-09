import React from "react";
import InviteToProject from "./InviteToProject";
import { db } from "@/server/db";
import { notFound } from "next/navigation";
import { onlyAllowAccessFor } from "@/app/_components/DataUtils/onlyAllowAccessFor";
import { api } from "@/trpc/server";
import AllStakeholders from "../AllStakeholders";
import { Button } from "@/app/_components/ui/button";
import { Project, User } from "@prisma/client";

type Props = {
  params: {
    projectId: string;
  };
};

const InviteToProjectProtector = async ({
  project,
  user,
}: {
  project: Project;
  user: User;
}) => {
  if (["superadmin", "admin"].includes(user.systemRole))
    return <InviteToProject project={project} />;
  const userOrgs = await db.userOrganization.findFirst({
    where: {
      userId: user.id,
      organizationId: project.organizationId,
    },
  });
  if (!userOrgs) return <></>;
  return <InviteToProject project={project} />;
};

const ProjectIdPage = async ({ params: { projectId } }: Props) => {
  const user = await onlyAllowAccessFor(["all"]);
  const project = await db.project.findUnique({
    where: {
      id: projectId,
    },
  });
  if (!project) return notFound();
  const stakeholders = await api.project.getStakeholders.query({ projectId });
  return (
    <>
      <h1 className="text-xl font-medium">{project.name}</h1>
      <div className="h-2"></div>
      <InviteToProjectProtector project={project} user={user} />
      <div className="h-4"></div>
      <h1 className="font-medium">All Stakeholders in this project:</h1>
      <div className="h-2"></div>
      <AllStakeholders stakeholders={stakeholders} />
      <div className="h-4"></div>
      <Button variant="outline">Create new form!</Button>
    </>
  );
};

export default ProjectIdPage;
