import type { RouterOutputs } from "@/trpc/shared";
import React from "react";

type Props = {
  stakeholders: RouterOutputs["project"]["getStakeholders"];
};

const AllStakeholders = ({ stakeholders }: Props) => {
  return (
    <ul className="list-inside list-disc">
      {stakeholders.map((stakeholder) => (
        <li key={stakeholder.id}>{stakeholder.email}</li>
      ))}
    </ul>
  );
};

export default AllStakeholders;
