"use client";

import React from "react";
import { useLogin } from "@/hooks/useLogin";

export default function BaseAlert() {
  const { login } = useLogin();

  return (
    <div className="bg-primary text-primary-foreground p-4 text-center text-sm">
      <button onClick={login}>Login</button>
      Welcome to Walacor! 🌐 Here you can interface with our data platform via
      your blog posts, profile, and settings.
    </div>
  );
}
