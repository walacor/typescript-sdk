"use client";

import React, { useState } from "react";
import DashboardLayout from "@/layout/dashboard.layout";
import SchemaDetails from "@/components/SchemaDetails";
import { blogSchema } from "@/schemas/blogSchema";
import { profileSchema } from "@/schemas/profileSchema";

export const schemas = [
  { schema: blogSchema, name: "Blog Schema" },
  { schema: profileSchema, name: "Profile Schema" },
];

const SchemasPage = () => {
  const [selectedTab, setSelectedTab] = useState("about");

  return (
    <DashboardLayout>
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6 text-center">Schemas</h1>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setSelectedTab("about")}
            className={`px-4 py-2 mx-2 text-white rounded-lg ${
              selectedTab === "about"
                ? "bg-primary"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
          >
            About
          </button>
          {schemas.map((schemaObj, index) => (
            <button
              key={index}
              onClick={() => setSelectedTab(schemaObj.name)}
              className={`px-4 py-2 mx-2 text-white rounded-lg ${
                selectedTab === schemaObj.name
                  ? "bg-primary"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
            >
              {schemaObj.name}
            </button>
          ))}
        </div>

        {selectedTab === "about" ? (
          <div className="bg-white p-6">
            <h2 className="text-2xl font-bold mb-4">About Schemas</h2>
            <p className="text-gray-700 mb-4">
              Schemas in Walacor define the structure of your data. Each schema
              contains fields that specify the type of data, length, and whether
              the field is required. The platform validates all data against the
              schema before it's stored, ensuring consistency and integrity. You
              can create custom schemas for different types of data, like blogs
              or profiles, and manage them easily within the Walacor platform.
            </p>
            <p className="text-gray-700 mb-4">
              Schemas can also belong to a 'family', which allows you to group
              related schemas together. For example, a 'profile' family might
              include schemas for user profiles, settings, and preferences.
              Grouping schemas into families makes it easier to manage and
              maintain related data structures, ensuring consistency across
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
