"use client";

import React, { useState } from "react";
import DashboardLayout from "@/layout/dashboard.layout";
import SchemaDetails from "@/components/SchemaDetails";
import { blogSchema } from "@/schemas/blogSchema";
import Button from "@/components/single/Button";
import { profileSchema } from "@/schemas/profileSchema";
import { roleSchema } from "@/schemas/roleSchema";

export const schemas = [
  { schema: blogSchema, name: "Blog" },
  { schema: profileSchema, name: "Profile" },
  { schema: roleSchema, name: "Role" },
];

const SchemasPage = () => {
  const [selectedTab, setSelectedTab] = useState("about");

  return (
    <DashboardLayout>
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-semibold mb-6 text-center">Schemas</h1>

        <div className="flex justify-center items-center mb-8">
          <Button
            onClick={() => setSelectedTab("about")}
            className={`px-4 py-2 mx-1 text-white ${
              selectedTab === "about"
                ? "bg-primary"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
          >
            About
          </Button>
          {schemas.map((schemaObj, index) => (
            <Button
              key={index}
              onClick={() => setSelectedTab(schemaObj.name)}
              className={`px-4 m-1 py-2 text-white ${
                selectedTab === schemaObj.name
                  ? "bg-primary"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
            >
              {schemaObj.name}
            </Button>
          ))}
        </div>

        {selectedTab === "about" ? (
          <div className="bg-white p-6">
            <h2 className="text-2xl font-semibold mb-4">About Schemas</h2>
            <p className="text-gray-700 mb-4">
              Schemas in Walacor define the structure of your data. Each schema
              contains fields that specify the type of data, length, and whether
              the field is required. The platform validates all data against the
              schema before it&apos;s stored, ensuring consistency and
              integrity. You can create custom schemas for different types of
              data, like blogs or profiles, and manage them easily within the
              Walacor platform.
            </p>
            <p className="text-gray-700 mb-4">
              Schemas can also belong to a &apos;family&apos;, which allows you
              to group related schemas together. For example, a &apos;blog&apos;
              family might include schemas for blog images, description, and alt
              texts. Grouping schemas into families makes it easier to manage
              and maintain related data structures, ensuring consistency across
              similar data types. The family concept helps in organizing your
              data logically and simplifies the management of complex datasets.
            </p>
          </div>
        ) : (
          <SchemaDetails
            schema={
              schemas.find((schemaObj) => schemaObj.name === selectedTab)!
                .schema
            }
            name={selectedTab}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default SchemasPage;
