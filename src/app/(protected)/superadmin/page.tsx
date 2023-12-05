import React from "react";
import AdminTable from "./AdminTable";
import { getServerAuthSession } from "@/server/auth";
import { onlyAllowAccessFor } from "@/app/_components/DataUtils/onlyAllowAccessFor";
import AddAdmin from "./AddAdmin";

const AdminPage = async () => {
  const session = (await getServerAuthSession())!;
  await onlyAllowAccessFor(["superadmin"]);

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-xl font-medium">All Admin Users</h1>
        <div className="w-4"></div>
        {session.user.systemRole === "superadmin" && <AddAdmin />}
      </div>
      <div className="h-4"></div>
      <AdminTable />
    </>
  );
};

export default AdminPage;
