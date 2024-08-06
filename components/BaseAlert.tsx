"use client";

import { useCreateSchema } from "@/hooks/useCreateSchema";

export default function BaseAlert() {
  const { createSchema } = useCreateSchema(
    Number(process.env.NEXT_PUBLIC_WALACOR_PROFILE_ETID)
  );
  return (
    <div className="bg-primary text-primary-foreground p-4 text-center text-sm">
      <button onClick={createSchema}>Create Schema</button>
      Welcome to Walacor! 🌐 Here you can interface with our data platform via
      your blog posts, profile, and settings.
    </div>
  );
}
