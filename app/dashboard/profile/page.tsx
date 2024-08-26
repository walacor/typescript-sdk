"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/layout/dashboard.layout";
import Button from "@/components/single/Button";
import Input from "@/components/single/Input";
import Dropdown from "@/components/single/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetUser } from "@/hooks/useGetUser";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useClerk, useUser } from "@clerk/nextjs";

import {
  faArrowLeft,
  faRunning,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { data, getUser } = useGetUser();
  const {
    updateRecord,
    loading: updatingUser,
    error: updateError,
  } = useUpdateUser(10);
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("Viewer");
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (clerkUser) {
      getUser({ UserName: clerkUser.fullName || clerkUser.id });
    }
  }, [clerkUser, getUser]);

  useEffect(() => {
    if (data && data.length > 0) {
      const walacorUser = data[0];
      setFirstName(walacorUser.FirstName || "");
      setLastName(walacorUser.LastName || "");
      setRole(walacorUser.UserType || "Viewer");
    }
  }, [data]);

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value);
    setIsUpdated(true);
  };

  const handleUpdate = async () => {
    if (!clerkUser || !data || data.length === 0) return;

    try {
      const updatedUserData = {
        UID: data[0].UID,
        FirstName: firstName,
        LastName: lastName,
        UserType: role,
      };

      await updateRecord(updatedUserData);

      setIsUpdated(false);
    } catch (error) {
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
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => handleChange(setFirstName, e.target.value)}
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
              onChange={(e) => handleChange(setLastName, e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <Dropdown
              value={role}
              onChange={(e) => handleChange(setRole, e.target.value)}
              options={[
                { label: "Author", value: "Author" },
                { label: "Viewer", value: "Viewer" },
              ]}
              className="mt-1 block w-full p-2 border border-gray-300"
            />
          </div>
          <div className="mt-6">
            <Button
              className={`bg-primary text-white w-full ${
                isUpdated ? "" : "opacity-75 cursor-not-allowed"
              }`}
              onClick={handleUpdate}
              disabled={!isUpdated || updatingUser}
            >
              <FontAwesomeIcon className="w-3 mx-1" icon={faUser} />
              {updatingUser ? "Updating..." : "Update Profile"}
              <FontAwesomeIcon
                className="w-4 mx-1 opacity-0"
                icon={faRunning}
              />
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
              <FontAwesomeIcon className="w-4 mx-1" icon={faRunning} />
              Sign out
              <FontAwesomeIcon
                className="w-4 mx-1 opacity-0"
                icon={faArrowLeft}
              />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
