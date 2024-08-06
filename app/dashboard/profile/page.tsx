"use client";

import React, { useState } from "react";
import Input from "@/components/single/Input";
import Textarea from "@/components/single/Textarea";
import Button from "@/components/single/Button";
import DashboardLayout from "@/layout/dahboard.layout";

const Profile = () => {
  const [profile, setProfile] = useState({
    userId: "1",
    userName: "John Doe",
    email: "john.doe@example.com",
    bio: "Web developer and tech enthusiast.",
    profileImage: "/placeholder-user.jpg",
    website: "https://example.com",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Save profile data logic here
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">Profile Management</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            name="userName"
            placeholder="User Name"
            value={profile.userName}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            required
          />
          <Input
            name="website"
            placeholder="Website"
            value={profile.website}
            onChange={handleChange}
          />
          <Textarea
            name="bio"
            placeholder="Bio"
            value={profile.bio}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground"
          >
            Save Profile
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
