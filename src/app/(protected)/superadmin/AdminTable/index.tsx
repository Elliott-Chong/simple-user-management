import { api } from "@/trpc/server";
import React from "react";
import Table from "./table";

const AdminTable = async () => {
  const allAdmins = await api.admin.getAllAdminUsers.query();
  return <Table users={allAdmins} />;
};

export default AdminTable;
