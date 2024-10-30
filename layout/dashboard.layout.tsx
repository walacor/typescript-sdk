import React, { ReactNode, useEffect } from "react";
import DefaultLayout from "./default.layout";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import FileVerificationComponent from "@/components/FileVerificationComponent";
import { useWalacorUser } from "@/hooks/user/useWalacorUser";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useAddUser } from "@/hooks/user/useAddUser";

export default function DashboardLayout({ children }: { children?: ReactNode }) {
  const params = useParams();
  const { data, isFetched } = useWalacorUser();
  const { addUser, loading: addUserLoading } = useAddUser();

  useEffect(() => {
    if (isFetched && !data) {
      addUser();
    }
  }, [isFetched, data, addUser]);

  return (
    <DefaultLayout>
      <FileVerificationComponent />
      <LoadingOverlay isVisible={addUserLoading} />
      <div className="flex flex-col sm:flex-row">
        <Sidebar />
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
