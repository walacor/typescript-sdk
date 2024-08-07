"use client";

import React from "react";
import DashboardLayout from "@/layout/dashboard.layout";
import ConnectWallet from "@/components/ConnectWallet";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col justify-center items-center py-8">
        <h1 className="text-3xl font-bold mb-6">Profile Management</h1>
        <ConnectWallet />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
