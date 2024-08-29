"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/layout/dashboard.layout";
import Button from "@/components/single/Button";
import Input from "@/components/single/Input";
import Dropdown from "@/components/single/Dropdown";
import { useGetUser } from "@/hooks/user/useGetUser";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
import { useAssignRole } from "@/hooks/role/useAssignRole";
import { useGetRoles } from "@/hooks/role/useGetRoles";
import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { toast } from "react-hot-toast";
import {
  successToastStyle,
  errorToastStyle,
  loadingToastStyle,
} from "@/styles/toastStyles";

const Profile = () => {
  const { data: userData, getUser } = useGetUser();
  const { data: rolesData, getRoles } = useGetRoles();
  const { assignRole, loading: assigningRole } = useAssignRole();
  const {
    updateRecord,
    loading: updatingUser,
    error: updateError,
  } = useUpdateUser(Number(process.env.NEXT_PUBLIC_WALACOR_PROFILE_ETID));
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (clerkUser) {
      getUser({ UserName: clerkUser.fullName || clerkUser.id });
      getRoles();
    }
  }, [clerkUser, getUser, getRoles]);

  useEffect(() => {
    if (userData && userData.length > 0 && rolesData && rolesData.length > 0) {
      const walacorUser = userData[0];
      setFirstName(walacorUser.FirstName || "");
      setLastName(walacorUser.LastName || "");

      const userRole = walacorUser.UserType;

      setSelectedRole(userRole);
    }
  }, [userData, rolesData]);

  const handleRoleChange = (selectedRole: string) => {
    setSelectedRole(selectedRole);
    setIsUpdated(true);
  };

  const handleUpdate = async () => {
    if (!clerkUser || !userData || userData.length === 0) return;

    toast.loading("Updating profile...", loadingToastStyle);

    try {
      const updatedUserData = {
        UID: userData[0].UID,
        FirstName: firstName,
        LastName: lastName,
        UserType: selectedRole,
      };

      await updateRecord(updatedUserData);

      const userUID = userData[0].UID;
      const role = rolesData?.find((r) => r.RoleName === selectedRole);
      const roleAssignment = {
        RoleID: role?._id || "",
        UserUID: userUID,
      };

      await assignRole([roleAssignment]);

      toast.dismiss();
      toast.success("Profile updated successfully!", successToastStyle);
      setIsUpdated(false);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to update profile", errorToastStyle);
      console.error("Failed to update profile", error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <DashboardLayout>
      <div className="w-full mx-auto p-8">
        <h1 className="text-3xl font-semibold mb-6">Profile</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setIsUpdated(true);
              }}
              className="mt-1 block w-full p-2 border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setIsUpdated(true);
              }}
              className="mt-1 block w-full p-2 border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <Dropdown
              value={selectedRole}
              onChange={handleRoleChange}
              options={
                rolesData
                  ? rolesData.map((role) => ({
                      label: role.RoleName,
                      value: role.RoleName,
                    }))
                  : []
              }
              className="mt-1 block w-full p-2 border border-gray-300"
            />
            <Link
              href="/dashboard/role"
              className="mt-4 text-xs text-gray-500 cursor-pointer hover:underline"
            >
              Want to add role?
            </Link>
          </div>
          <div className="mt-6">
            <Button
              className={`bg-primary text-white w-full`}
              onClick={handleUpdate}
              disabled={!isUpdated || updatingUser || assigningRole}
            >
              {updatingUser || assigningRole ? "Updating..." : "Update Profile"}
            </Button>
            {updateError && (
              <p className="text-red-500 mt-2">
                Error updating profile: {updateError.message}
              </p>
            )}
          </div>
          <div className="mt-6">
            <Button
              className="bg-red-500 text-white w-full"
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
