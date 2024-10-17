"use client";

import React, { useEffect, useState } from "react";
import usePostSchema from "@/hooks/schema/usePostSchema";
import { useReadSchemas } from "@/hooks/schema/useReadSchemas";
import Button from "@/components/single/Button";
import Input from "@/components/single/Input";
import Dropdown from "@/components/single/Dropdown";
import DashboardLayout from "@/layout/dashboard.layout";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import {
  successToastStyle,
  errorToastStyle,
  loadingToastStyle,
} from "@/styles/toastStyles";
import { RoleData } from "@/schemas/roleSchema";

const RoleList = () => {
  const { user: clerkUser } = useUser();

  const { data, error, loading, readSchemas } = useReadSchemas(
    Number(process.env.NEXT_PUBLIC_WALACOR_ROLE_ETID)
  );

  const {
    postSchema: addRole,
    loading: loadingAddRole,
    error: errorAddRole,
  } = usePostSchema(Number(process.env.NEXT_PUBLIC_WALACOR_ROLE_ETID));

  const [roleName, setRoleName] = useState("");
  const [scope, setScope] = useState("AdminAccess");

  useEffect(() => {
    if (clerkUser) {
      readSchemas();
    }
  }, [clerkUser, readSchemas]);

  const handleAddRole = async () => {
    toast.loading("Adding role...", loadingToastStyle);

    try {
      const newRole: RoleData = {
        id: "",
        roleName,
        scope,
      };

      await addRole(newRole);
      readSchemas();

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
                options={["AdminAccess", "ReadWrite", "ReadOnly"]}
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

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Current Roles</h2>
          {loading ? (
            <p>Loading roles...</p>
          ) : data && Array.isArray(data) && data.length > 0 ? (
            (data as RoleData[]).map((role: RoleData) => (
              <div key={role.id} className="p-4 border-b">
                <h3 className="font-medium">{role.roleName}</h3>
                <p className="text-xs opacity-50">{role.scope}</p>
              </div>
            ))
          ) : (
            <p>No roles found.</p>
          )}

          {error && (
            <p className="text-red-500 mt-2">
              Error fetching roles: {error.message}
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RoleList;
