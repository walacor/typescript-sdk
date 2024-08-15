"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/layout/dashboard.layout";
import { useClerk } from "@clerk/nextjs";
import Button from "@/components/single/Button";
import { useUser } from "@clerk/nextjs";
import Input from "@/components/single/Input";
import Dropdown from "@/components/single/Dropdown"; // Import the Dropdown component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faRunning,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { signOut } = useClerk();
  const { user } = useUser();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Viewer");
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.emailAddresses[0]?.emailAddress || "");
      setRole("Viewer");
    }
  }, [user]);

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value);
    setIsUpdated(true);
  };

  const handleUpdate = () => {
    setIsUpdated(false);
    console.log("Profile updated");
  };

  async function handleSignOut() {
    await signOut();
    window.location.href = "/";
  }

  return (
    <DashboardLayout>
      <div className="w-full max-w-lg mx-auto mt-12">
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
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => handleChange(setEmail, e.target.value)}
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
                isUpdated ? "" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleUpdate}
              disabled={!isUpdated}
            >
              <FontAwesomeIcon className="w-3 mx-1" icon={faUser} />
              Update Profile
              <FontAwesomeIcon
                className="w-4 mx-1 opacity-0"
                icon={faRunning}
              />
            </Button>
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
