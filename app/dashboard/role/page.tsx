"use client";

import React, { useEffect, useState } from "react";
import { useGetRoles } from "@/hooks/role/useGetRoles";
import { useAddRole } from "@/hooks/role/useAddRole";
import { useGetUser } from "@/hooks/user/useGetUser";
import Button from "@/components/single/Button";
import Input from "@/components/single/Input";
import Dropdown from "@/components/single/Dropdown";
import DashboardLayout from "@/layout/dashboard.layout";
import { useClerk, useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import {
  successToastStyle,
  errorToastStyle,
  loadingToastStyle,
} from "@/styles/toastStyles";

const RoleList = () => {
  const { data: userData, getUser } = useGetUser();
  const { data: rolesData, getRoles } = useGetRoles();
  const {
    addRole,
    loading: loadingAddRole,
    error: errorAddRole,
  } = useAddRole(Number(process.env.NEXT_PUBLIC_WALACOR_ROLE_ETID));
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();

  const [roleName, setRoleName] = useState("");
  const [scope, setScope] = useState("AdminAccess");
  const [isSiteAdmin, setIsSiteAdmin] = useState(false);

  useEffect(() => {
    if (clerkUser) {
      getUser({ UserName: clerkUser.fullName || clerkUser.id });
      getRoles();
    }
  }, [clerkUser, getUser, getRoles]);

  useEffect(() => {
    if (userData && userData.length > 0) {
      const walacorUser = userData[0];
      setIsSiteAdmin(walacorUser.UserType === "Site_Admin");
    }
  }, [userData]);

  const handleAddRole = async () => {
    toast.loading("Adding role...", loadingToastStyle);
    try {
      await addRole({ RoleName: roleName, Scopes: [scope] });
      getRoles();
      setRoleName("");
      setScope("AdminAccess");
      toast.dismiss();
      toast.success("Role added successfully!", successToastStyle);
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to add role", errorToastStyle);
      console.error("Failed to add role", err);
    }
  };

  const handleScopeChange = (selectedScope: string) => {
    setScope(selectedScope);
  };

  return (
    <DashboardLayout>
      <div className="w-full mx-auto p-8">
        <h1 className="text-3xl font-semibold mb-6">Role Management</h1>

        {isSiteAdmin ? (
          <div className="space-y-4">
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Add New Role</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role Name
                </label>
                <Input
                  type="text"
                  placeholder="Role Name"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Select Scope
                </label>
                <Dropdown
                  value={scope}
                  onChange={handleScopeChange}
                  options={[
                    { label: "AdminAccess", value: "AdminAccess" },
                    { label: "ReadWrite", value: "ReadWrite" },
                    { label: "ReadOnly", value: "ReadOnly" },
                  ]}
                  className="mt-1 block w-full p-2 border border-gray-300"
                />
              </div>

              <Button
                onClick={handleAddRole}
                disabled={loadingAddRole}
                className={`bg-primary text-white w-full mt-4 ${
                  loadingAddRole ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {loadingAddRole ? "Adding Role..." : "Add Role"}
              </Button>

              {errorAddRole && (
                <p className="text-red-500 mt-2">
                  Error adding role: {errorAddRole.message}
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-red-500">
            You do not have permission to create roles. Only Site_Admin users
            can create roles.
          </p>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Current Roles</h2>
          {rolesData && rolesData.length > 0 ? (
            rolesData.map((role) => (
              <div key={role.UID} className="p-4 border-b">
                <h3 className="font-medium">{role.RoleName}</h3>
                <p>Scopes: {role.Scopes.join(", ")}</p>
              </div>
            ))
          ) : (
            <p>No roles found.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RoleList;
