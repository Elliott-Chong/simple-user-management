"use client";
import { DataTable } from "@/app/_components/data-table";
import type { RouterOutputs } from "@/trpc/shared";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";

type Props = {
  users: RouterOutputs["admin"]["getAllAdminUsers"];
};

const Table = ({ users }: Props) => {
  const columns: ColumnDef<RouterOutputs["admin"]["getAllAdminUsers"][0]>[] = [
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "emailVerified",
      header: "Email Verified At",
    },
  ];
  return <DataTable data={users} columns={columns} />;
};

export default Table;
