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
          <div className="max-h-[300px] max-w-[500px] border-b">
            <svg
              id="patternId"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="a"
                  patternUnits="userSpaceOnUse"
                  width="120"
                  height="80"
                  patternTransform="scale(2) rotate(10)"
                >
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="hsla(0,0%,100%,1)"
                  />
                  <path
                    d="M-50.129 12.685C-33.346 12.358-16.786 4.918 0 5c16.787.082 43.213 10 60 10s43.213-9.918 60-10c16.786-.082 33.346 7.358 50.129 7.685"
                    strokeWidth="1"
                    stroke="hsla(258.5,59.4%,59.4%,1)"
                    fill="none"
                  />
                  <path
                    d="M-50.129 32.685C-33.346 32.358-16.786 24.918 0 25c16.787.082 43.213 10 60 10s43.213-9.918 60-10c16.786-.082 33.346 7.358 50.129 7.685"
                    strokeWidth="1"
                    stroke="hsla(339.6,82.2%,51.6%,1)"
                    fill="none"
                  />
                  <path
                    d="M-50.129 52.685C-33.346 52.358-16.786 44.918 0 45c16.787.082 43.213 10 60 10s43.213-9.918 60-10c16.786-.082 33.346 7.358 50.129 7.685"
                    strokeWidth="1"
                    stroke="hsla(198.7,97.6%,48.4%,1)"
                    fill="none"
                  />
                  <path
                    d="M-50.129 72.685C-33.346 72.358-16.786 64.918 0 65c16.787.082 43.213 10 60 10s43.213-9.918 60-10c16.786-.082 33.346 7.358 50.129 7.685"
                    strokeWidth="1"
                    stroke="hsla(47,80.9%,61%,1)"
                    fill="none"
                  />
                </pattern>
              </defs>
              <rect
                width="800%"
                height="800%"
                transform="translate(-174,-162)"
                fill="url(#a)"
              />
            </svg>
          </div>
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
