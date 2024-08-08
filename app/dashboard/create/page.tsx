"use client";

import React from "react";
import ContentManagement from "@/components/ContentManagement";
import DashboardLayout from "@/layout/dashboard.layout";

const CreateBlog: React.FC = () => {
  return (
    <DashboardLayout>
      <ContentManagement />
    </DashboardLayout>
  );
};

export default CreateBlog;
