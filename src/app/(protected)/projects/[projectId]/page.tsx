import React from "react";
import InviteToProject from "./InviteToProject";
import { db } from "@/server/db";
import { notFound } from "next/navigation";
import { onlyAllowAccessFor } from "@/app/_components/DataUtils/onlyAllowAccessFor";
import { api } from "@/trpc/server";
import AllStakeholders from "../AllStakeholders";

type Props = {
  params: {
    projectId: string;
  };
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
      {user.systemRole === "admin" ||
        (user.systemRole === "superadmin" && (
          <InviteToProject project={project} />
        ))}
      <div className="h-4"></div>
      <h1 className="font-medium">All Stakeholders in this project:</h1>
      <div className="h-2"></div>
      <AllStakeholders stakeholders={stakeholders} />
    </>
  );
};

export default ProjectIdPage;
