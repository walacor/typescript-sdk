"use client";

import { useUser } from "@clerk/nextjs";

export default function Page() {
  const { user } = useUser();
  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
