"use client";

import "@/app/globals.css";
import React, { ReactNode } from "react";
import DefaultLayout from "./default.layout";
import { useCheckAndAddUser } from "@/hooks/user/useCheckAndAddUser";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import LoadingOverlay from "@/components/LoadingOverlay";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children?: ReactNode }) {
  const { setupStage, loading, isConfigured } = useCheckAndAddUser();
  const params = useParams();

  return (
    <DefaultLayout>
      <div className="flex flex-col sm:flex-row">
        <Sidebar />
        {loading && !isConfigured && <LoadingOverlay setupStage={setupStage} loading={loading} isConfigured={isConfigured} />}
        <div className="bg-muted max-w-[1440px] mx-auto sm:py-12 min-h-screen w-full flex justify-center items-start relative">
          <AnimatePresence>
            <motion.div key={String(params?.path)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </DefaultLayout>
  );
}
