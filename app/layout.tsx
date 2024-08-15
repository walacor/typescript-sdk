import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import { RefetchProvider } from "@/context/RefetchContext";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Walacor App | Blog + CMS",
  description: "The data platform that hadles hashing for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <RefetchProvider>
            <Providers>{children}</Providers>
          </RefetchProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
