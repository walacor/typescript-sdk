"use client";

import React, { useState } from "react";
import DashboardLayout from "@/layout/dashboard.layout";
import useReadSchemas from "@/hooks/useReadSchemas";
import usePostSchema from "@/hooks/usePostSchema";
import { useAuthentication } from "@/hooks/useAuthentication";
import useAuthenticatedToken from "@/hooks/useAuthenticatedToken";
import useReadOneSchema from "@/hooks/useReadOneSchema";
import { useGetSchemaDetails } from "@/hooks/useGetSchemaDetails";
import { useCreateSchema } from "@/hooks/useCreateSchema";

export const hooks = [
  {
    name: "useReadSchemas",
    description: "Fetch and read data schemas from the Walacor platform.",
    code: useReadSchemas.toString(),
    explanation: `This hook allows you to fetch data schemas based on the ETId. 
      It handles authentication, filtering, and refetching data as needed.`,
  },
  {
    name: "usePostSchema",
    description: "Post new data to the Walacor platform for a specific schema.",
    code: usePostSchema.toString(),
    explanation: `This hook is used to submit new data to the Walacor platform. 
      It handles authentication, submission, and refetching data after a successful post.`,
  },
  {
    name: "useAuthentication",
    description:
      "Authenticate users by obtaining a token from the Walacor platform.",
    code: useAuthentication.toString(),
    explanation: `This hook handles user authentication by sending a login request 
      to the Walacor platform and storing the token using Recoil state management.`,
  },
  {
    name: "useAuthenticatedToken",
    description:
      "Ensure the user is authenticated and provide the token for API requests.",
    code: useAuthenticatedToken.toString(),
    explanation: `This hook ensures that a valid authentication token is available. 
      If not, it triggers the login process and returns the token for use in other hooks.`,
  },
  {
    name: "useReadOneSchema",
    description:
      "Fetch and read a single schema by its ID from the Walacor platform.",
    code: useReadOneSchema.toString(),
    explanation: `This hook allows you to fetch a single schema record based on its ID and ETId. 
      It handles authentication, filtering, and ensures you get the latest version of the record.`,
  },
  {
    name: "useGetSchemaDetails",
    description:
      "Fetch the details of a specific schema from the Walacor platform.",
    code: useGetSchemaDetails.toString(),
    explanation: `This hook retrieves the schema details for a specific ETId from the Walacor platform. 
      It handles authentication and provides schema metadata necessary for other operations.`,
  },
  {
    name: "useCreateSchema",
    description: "Create a new schema on the Walacor platform.",
    code: useCreateSchema.toString(),
    explanation: `This hook allows you to create a new schema on the Walacor platform by 
      submitting the schema details. It handles authentication and returns the response from the platform.`,
  },
];

const HooksPage = () => {
  const [selectedHook, setSelectedHook] = useState<string>("about");

  const getHookContent = (hookName: string) => {
    const hook = hooks.find((hook) => hook.name === hookName);
    if (hook) {
      return (
        <div className="bg-white p-6">
          <h2 className="text-2xl font-bold mb-4">{hook.name}</h2>
          <p className="text-gray-700 mb-4">{hook.description}</p>
          <pre className="bg-gray-100 p-4 overflow-x-auto whitespace-pre-wrap break-all rounded-lg">
            <code>{JSON.stringify(hook.code, null, 2)}</code>
          </pre>
          <p className="text-gray-700 mt-4">{hook.explanation}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6 text-center">Hooks</h1>

        {/* Tab Selector */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedHook("about")}
              className={`px-4 py-2 mx-2 text-white font-bold ${
                selectedHook === "about"
                  ? "bg-primary"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
            >
              About Hooks
            </button>
            {hooks.map((hook, index) => (
              <button
                key={index}
                onClick={() => setSelectedHook(hook.name)}
                className={`px-4 py-2 mx-2 text-white font-bold ${
                  selectedHook === hook.name
                    ? "bg-primary"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
              >
                {hook.name}
              </button>
            ))}
          </div>
        </div>

        {/* Render Content Based on Selected Tab */}
        {selectedHook === "about" ? (
          <div className="bg-white p-6">
            <h2 className="text-2xl font-bold mb-4">About Hooks</h2>
            <p className="text-gray-700">
              Hooks in Walacor allow you to interact directly with the data
              platform without the need for traditional backend APIs. These
              hooks handle everything from fetching and posting data to managing
              authentication and token handling. By using hooks, you can focus
              on your application's frontend logic while the Walacor platform
              manages the heavy lifting on the backend.
            </p>
            <p className="text-gray-700 mt-4">
              Each hook is designed to be reusable and composable, allowing you
              to build complex data interactions with minimal code. Explore the
              available hooks to see how they work and how you can integrate
              them into your application.
            </p>
          </div>
        ) : (
          getHookContent(selectedHook)
        )}
      </div>
    </DashboardLayout>
  );
};

export default HooksPage;
