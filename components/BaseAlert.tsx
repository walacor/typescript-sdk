"use client";

import WalacorLogo from "@/assets/walacor-logo.png";
import { useCreateSchema } from "@/hooks/useCreateSchema";
import Image from "next/image";

export default function BaseAlert() {
  // Call the hook at the top level
  const { createSchema } = useCreateSchema(
    Number(process.env.NEXT_PUBLIC_WALACOR_ETID)
  );

  return (
    <div className="bg-primary text-primary-foreground p-4 text-center text-xs flex items-center justify-center">
      <button onClick={createSchema}>Post Schema</button>
      <span className="flex items-center gap-1">
        Welcome to Walacor! <Image width={25} src={WalacorLogo} alt={""} /> Here
        you can interface with our data platform via your blog posts, profile,
        and settings.
      </span>
    </div>
  );
}
