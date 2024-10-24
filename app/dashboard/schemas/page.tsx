"use client";

import React, { useState } from "react";
import DashboardLayout from "@/layout/dashboard.layout";
import SchemaDetails from "@/components/SchemaDetails";
import { blogSchema } from "@/schemas/blogSchema";
import Button from "@/components/single/Button";
import { profileSchema } from "@/schemas/profileSchema";
import { roleSchema } from "@/schemas/roleSchema";
import SubDashboardLayout from "@/layout/subdashboard.layout";

export const schemas = [
  { schema: blogSchema, name: "Blog" },
  { schema: profileSchema, name: "Profile" },
  { schema: roleSchema, name: "Role" },
];

const SchemasPage = () => {
  const [selectedTab, setSelectedTab] = useState("about");

  return (
    <DashboardLayout>
      <SubDashboardLayout>
        <div className="container mx-auto py-12">
          <h1 className="text-4xl font-semibold mb-6 text-center">Schemas</h1>
          <p className="text-gray-600 mb-6 text-center">Schemas define the structure of your data.</p>

          <div className="flex justify-center items-center mb-8">
            <Button onClick={() => setSelectedTab("about")} className={`px-4 py-2 mx-1 text-white ${selectedTab === "about" ? "bg-primary" : "bg-gray-400 hover:bg-gray-500"}`}>
              About
            </Button>
            {schemas.map((schemaObj, index) => (
              <Button key={index} onClick={() => setSelectedTab(schemaObj.name)} className={`px-4 m-1 py-2 text-white ${selectedTab === schemaObj.name ? "bg-primary" : "bg-gray-400 hover:bg-gray-500"}`}>
                {schemaObj.name}
              </Button>
            ))}
          </div>

          {selectedTab === "about" ? (
            <div className="bg-white p-6">
              <h2 className="text-2xl font-semibold mb-4">About Schemas</h2>
              <p className="text-gray-700 mb-4">
                In Walacor, schemas define the structure of your data. Each schema includes fields that specify the data type, length, and whether the field is required. Walacor validates all data against these schemas to ensure consistency
                and integrity before storing it.
              </p>
              <p className="text-gray-700 mb-4">
                For example, if you are submitting a blog or profile, the corresponding schema must be posted and validated before the data can be saved. This ensures that only valid, structured data gets passed to the Walacor platform,
                maintaining high-quality data integrity.
              </p>
              <p className="text-gray-700 mb-4">
                However, when users log in to this system, we auto-magically handle schema creation for you. Our system checks whether the necessary schemas are in place for each user, and if not, they are automatically created. This means
                that you don&apos;t have to worry about manually setting up schemas every time—this is done in the background when a new user logs in.
              </p>
              <p className="text-gray-700 mb-4">
                Grouping schemas into families is another powerful feature Walacor provides. For instance, a &apos;blog&apos; family might include schemas for blog posts, images, descriptions, and alt texts. This makes it easier to manage
                related data structures and ensure consistency across similar data types.
              </p>
            </div>
          ) : (
            <SchemaDetails schema={schemas.find((schemaObj) => schemaObj.name === selectedTab)!.schema} name={selectedTab} />
          )}
        </div>
      </SubDashboardLayout>
    </DashboardLayout>
  );
};

export default SchemasPage;
