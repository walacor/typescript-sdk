"use client";

import React from "react";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";

const client = createThirdwebClient({
  clientId: String(process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID),
});

export default function ConnectWallet({ className }: { className?: string }) {
  const wallets = [
    inAppWallet({
      auth: {
        options: ["email", "google", "apple", "facebook", "phone"],
      },
    }),
  ];

  return (
    <div className={className}>
      <ConnectButton
        client={client}
        wallets={wallets}
        connectButton={{ label: "Login" }}
        connectModal={{
          size: "wide",
          title: "Login",
          titleIcon:
            "https://api.surveyjs.io/private/Surveys/files?name=883a9b4f-bc58-4fd5-af08-4fa6a6ead940",
          showThirdwebBranding: false,
        }}
        onConnect={(user) => console.log("Connected user:", user)}
      />
    </div>
  );
}
