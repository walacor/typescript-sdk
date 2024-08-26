"use client";

import React, { useEffect, useState } from "react";
import { useGetRoles } from "@/hooks/role/useGetRoles";
import { useAddRole } from "@/hooks/role/useAddRole";
import Button from "@/components/single/Button";
import Input from "@/components/single/Input";
import Dropdown from "@/components/single/Dropdown";
import DashboardLayout from "@/layout/dashboard.layout";

const RoleList = () => {
  const { data, getRoles } = useGetRoles();
  const {
    addRole,
    loading: loadingAddRole,
    error: errorAddRole,
  } = useAddRole(Number(process.env.NEXT_PUBLIC_WALACOR_ROLE_ETID));

  const [roleName, setRoleName] = useState("");
  const [scope, setScope] = useState("AdminAccess");

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  const handleAddRole = async () => {
    try {
      await addRole({ RoleName: roleName, Scopes: [scope] });
      console.log("Role added successfully");
      getRoles();
    } catch (err) {
      console.error("Failed to add role", err);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Role Management</h1>

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
                onChange={(e) => setScope(e.target.value)}
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

          <div>
            <h2 className="text-xl font-semibold">Current Roles</h2>
            {data && data.length > 0 ? (
              data.map((role) => (
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
      </div>
    </DashboardLayout>
  );
};

export default RoleList;
