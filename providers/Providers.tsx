"use client";

import React from "react";
import { RecoilRoot } from "recoil";
import { ThirdwebProvider } from "thirdweb/react";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThirdwebProvider>
      <RecoilRoot>{children}</RecoilRoot>;
    </ThirdwebProvider>
  );
}
