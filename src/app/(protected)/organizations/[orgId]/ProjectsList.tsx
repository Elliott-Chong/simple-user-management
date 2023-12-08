import type { RouterOutputs } from "@/trpc/shared";
import Link from "next/link";
import React from "react";

type Props = { projects: RouterOutputs["organizations"]["getProjects"] };

const ProjectsList = ({ projects }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
      {projects.map((project) => (
        <Link
          href={`/projects/${project.id}`}
          key={project.id}
          className="cursor-pointer overflow-hidden rounded-md border bg-white shadow transition hover:scale-105 hover:shadow-xl"
        >
          <img src="https://random.imagecdn.app/500/300" />
          <div className="p-4">
            <p className="font-medium">{project.name}</p>
            <p className="texet-gray-600 text-sm">
              {project.createdAt.toLocaleDateString()}
            </p>
            <div className="h-6"></div>
            {project.userProjects.length !== 0 && (
              <>
                <p className="font-medium">People in this project:</p>
                <ul className="list-inside list-disc">
                  {project.userProjects.map((up) => (
                    <li key={up.id}>{up.user.email}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectsList;
