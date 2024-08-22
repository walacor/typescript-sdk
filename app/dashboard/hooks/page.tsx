"use client";

import React, { useState } from "react";
import DashboardLayout from "@/layout/dashboard.layout";

export const hooks = [
  {
    name: "useAuthenticatedToken",
    description:
      "Ensure the user is authenticated and provide the token for API requests.",
    code: `
      "use client";

      import { useRecoilValue } from "recoil";
      import { tokenState } from "@/recoil/atoms";
      import { useAuthentication } from "./useAuthentication";
      import { useEffect } from "react";

      const useAuthenticatedToken = () => {
        const { login } = useAuthentication();
        const token = useRecoilValue(tokenState);

        useEffect(() => {
          if (!token) {
            login();
          }
        }, [token, login]);

        return token;
      };

      export default useAuthenticatedToken;
    `,
    explanation: `This hook ensures that a valid authentication token is available. 
      If not, it triggers the login process and returns the token for use in other hooks.`,
  },
  {
    name: "useAuthentication",
    description:
      "Authenticate users by obtaining a token from the Walacor platform.",
    code: `
      import axios from "axios";
      import { useRecoilState } from "recoil";
      import { tokenState } from "@/recoil/atoms";

      export function useAuthentication() {
        const [token, setToken] = useRecoilState(tokenState);

        async function login() {
          try {
            const res = await axios.post(
              \`\${String(process.env.NEXT_PUBLIC_EC2_WALACOR)}/api/auth/login\`,
              {
                userName: String(process.env.NEXT_PUBLIC_WALACOR_USERNAME),
                password: String(process.env.NEXT_PUBLIC_WALACOR_PASSWORD),
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            setToken(res.data.api_token);
          } catch (error) {
            console.error("Error logging in:", error);
          }
        }

        return { token, login };
      }
    `,
    explanation: `This hook handles user authentication by sending a login request 
      to the Walacor platform and storing the token using Recoil state management.`,
  },
  {
    name: "useCreateSchema",
    description: "Create a new schema on the Walacor platform.",
    code: `
      "use client";

      import axios from "axios";
      import useAuthenticatedToken from "./useAuthenticatedToken";
      import { blogSchema } from "@/schemas/blogSchema";

      export function useCreateSchema(etid: number) {
        const token = useAuthenticatedToken();

        const createSchema = async () => {
          const schema = {
            ETId: 50,
            SV: 1,
            Schema: blogSchema,
          };

          try {
            const response = await axios.post(
              \`\${String(process.env.NEXT_PUBLIC_EC2_WALACOR)}/api/schemas/\`,
              schema,
              {
                headers: {
                  Authorization: \`\${token}\`,
                  ETId: etid,
                  SV: 1,
                },
              }
            );

            console.log("Schema created:", response.data);
            return response.data;
          } catch (error) {
            console.error("Error creating schema:", error);
            throw error;
          }
        };

        return { createSchema };
      }
    `,
    explanation: `This hook allows you to create a new schema on the Walacor platform by 
      submitting the schema details. It handles authentication and returns the response from the platform.`,
  },
  {
    name: "useGetSchemaDetails",
    description:
      "Fetch the details of a specific schema from the Walacor platform.",
    code: `
      import { useState } from "react";
      import axios from "axios";
      import useAuthenticatedToken from "./useAuthenticatedToken";

      export function useGetSchemaDetails(etid: number) {
        const token = useAuthenticatedToken();
        const [schemaDetails, setSchemaDetails] = useState(null);

        const fetchSchemaData = async () => {
          if (!token) {
            console.error("No token available. Please log in first.");
            return;
          }

          try {
            const res = await axios.get(
              \`\${String(
                process.env.NEXT_PUBLIC_EC2_WALACOR
              )}/api/schemas/envelopeTypes/\${Number(
                process.env.NEXT_PUBLIC_WALACOR_BLOG_ETID
              )}/details\`,
              {
                headers: {
                  ETid: etid,
                  Authorization: \`\${token}\`,
                },
              }
            );

            setSchemaDetails(res.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

        return { schemaDetails, fetchSchemaData };
      }
    `,
    explanation: `This hook retrieves the schema details for a specific ETId from the Walacor platform. 
      It handles authentication and provides schema metadata necessary for other operations.`,
  },
  {
    name: "usePostSchema",
    description: "Post new data to the Walacor platform for a specific schema.",
    code: `
      import { useState, useCallback } from "react";
      import axios from "axios";
      import useAuthenticatedToken from "./useAuthenticatedToken";
      import { BlogData } from "@/schemas/blogSchema";
      import { useRefetch } from "@/context/RefetchContext";

      const usePostSchema = (etid: number) => {
        const [response, setResponse] = useState(null);
        const [error, setError] = useState<Error | null>(null);
        const [loading, setLoading] = useState(false);

        const token = useAuthenticatedToken();
        const { triggerRefetch } = useRefetch();

        const postSchema = useCallback(
          async (data: BlogData) => {
            setLoading(true);
            try {
              const res = await axios.post(
                \`\${String(process.env.NEXT_PUBLIC_EC2_WALACOR)}/api/envelopes/submit\`,
                { Data: [data] },
                {
                  headers: {
                    ETId: etid,
                    Authorization: \`\${token}\`,
                    "Content-Type": "application/json",
                  },
                }
              );
              setResponse(res.data);
              triggerRefetch();
            } catch (err) {
              setError(err as Error);
            } finally {
              setLoading(false);
            }
          },
          [token, etid, triggerRefetch]
        );

        return { response, error, loading, postSchema };
      };

      export default usePostSchema;
    `,
    explanation: `This hook is used to submit new data to the Walacor platform. 
      It handles authentication, submission, and refetching data after a successful post.`,
  },
  {
    name: "useReadOneSchema",
    description:
      "Fetch and read a single schema by its ID from the Walacor platform.",
    code: `
      import { useState, useCallback, useEffect } from "react";
      import axios from "axios";
      import useAuthenticatedToken from "./useAuthenticatedToken";
      import { BlogData } from "@/schemas/blogSchema";
      import { useRefetch } from "@/context/RefetchContext";

      const useReadOneSchema = (id: string, etid: number) => {
        const [response, setResponse] = useState<BlogData | null>(null);
        const [error, setError] = useState<Error | null>(null);
        const [loading, setLoading] = useState(false);

        const token = useAuthenticatedToken();
        const { shouldRefetch, resetRefetch } = useRefetch();

        const readOneSchema = useCallback(async () => {
          if (!token) return;

          setLoading(true);
          try {
            const res = await axios.post(
              \`\${String(
                process.env.NEXT_PUBLIC_EC2_WALACOR
              )}/api/query/get?fromSummary=true\`,
              { id },
              {
                headers: {
                  ETId: etid,
                  Authorization: \`\${token}\`,
                  "Content-Type": "application/json",
                },
              }
            );

            const data = res.data?.data || [];
            const latestRecord = data.reduce(
              (latest: BlogData | null, current: BlogData) => {
                if (!latest || current.UpdatedAt > latest.UpdatedAt) {
                  return current;
                }
                return latest;
              },
              null
            );

            setError(null);
            setResponse(latestRecord);
          } catch (err) {
            setError(err as Error);
          } finally {
            setLoading(false);
          }
        }, [token, id, etid]);

        useEffect(() => {
          if (token) {
            readOneSchema();
          }
        }, [readOneSchema, token]);

        useEffect(() => {
          if (shouldRefetch) {
            readOneSchema().then(resetRefetch);
          }
        }, [shouldRefetch, readOneSchema, resetRefetch]);

        return { response, error, loading, readOneSchema };
      };

      export default useReadOneSchema;
    `,
    explanation: `This hook allows you to fetch a single schema record based on its ID and ETId. 
      It handles authentication, filtering, and ensures you get the latest version of the record.`,
  },
  {
    name: "useReadSchemas",
    description: "Fetch and read data schemas from the Walacor platform.",
    code: `
      import { useState, useCallback, useEffect } from "react";
      import axios from "axios";
      import useAuthenticatedToken from "./useAuthenticatedToken";
      import { BlogData } from "@/schemas/blogSchema";
      import { useRefetch } from "@/context/RefetchContext";

      const useReadSchemas = (etid: number, onlyPublished: boolean = false) => {
        const [response, setResponse] = useState<BlogData[] | null>(null);
        const [error, setError] = useState<Error | null>(null);
        const [loading, setLoading] = useState(false);

        const token = useAuthenticatedToken();
        const { shouldRefetch, resetRefetch } = useRefetch();

        const readSchema = useCallback(async () => {
          setLoading(true);
          try {
            const res = await axios.post(
              \`\${String(
                process.env.NEXT_PUBLIC_EC2_WALACOR
              )}/api/query/get?fromSummary=true\`,
              {},
              {
                headers: {
                  ETId: etid,
                  Authorization: \`\${token}\`,
                  "Content-Type": "application/json",
                },
              }
            );

            const filteredData = (res.data?.data || []).filter((blog: BlogData) => {
              return !blog.IsDeleted && (!onlyPublished || blog.isPublished);
            });

            const latestData = filteredData.reduce(
              (acc: BlogData[], current: BlogData) => {
                const existing = acc.find((item) => item.id === current.id);
                if (
                  !existing ||
                  new Date(current.CreatedAt) > new Date(existing.CreatedAt)
                ) {
                  acc = acc.filter((item) => item.id !== current.id);
                  acc.push(current);
                }
                return acc;
              },
              [] as BlogData[]
            );

            setError(null);
            setResponse(latestData);
          } catch (err) {
            setError(err as Error);
          } finally {
            setLoading(false);
          }
        }, [token, etid, onlyPublished]);

        useEffect(() => {
          readSchema();
        }, [readSchema]);

        useEffect(() => {
          if (shouldRefetch) {
            readSchema().then(resetRefetch);
          }
        }, [shouldRefetch, readSchema, resetRefetch]);

        return { response, error, loading, readSchema };
      };

      export default useReadSchemas;
    `,
    explanation: `This hook allows you to fetch data schemas based on the ETId. 
      It handles authentication, filtering, and refetching data as needed.`,
  },
  {
    name: "useUpdateSchema",
    description: "Update an existing schema on the Walacor platform.",
    code: `
      import { useState } from "react";
      import axios from "axios";
      import useAuthenticatedToken from "./useAuthenticatedToken";
      import { BlogData, blogSchema } from "@/schemas/blogSchema";
      import { useRefetch } from "@/context/RefetchContext";

      export function useUpdateSchema(etid: number) {
        const token = useAuthenticatedToken();
        const { triggerRefetch } = useRefetch();
        const [loading, setLoading] = useState<boolean>(false);
        const [response, setResponse] = useState<any>(null);
        const [error, setError] = useState<Error | null>(null);

        const filterValidFields = (data: Partial<BlogData>): Partial<BlogData> => {
          const validFields = blogSchema.Fields.map((field) => field.FieldName);
          const filteredData = Object.keys(data)
            .filter(
              (key): key is keyof BlogData =>
                validFields.includes(key) || key === "UID"
            )
            .reduce((obj, key) => {
              obj[key] = data[key as keyof BlogData] as undefined;
              return obj;
            }, {} as Partial<BlogData>);
          return filteredData;
        };

        const updateRecord = async (data: Partial<BlogData>) => {
          setLoading(true);
          setError(null);
          setResponse(null);

          const filteredData = filterValidFields(data);
          const payload = {
            Data: [
              {
                ...filteredData,
              },
            ],
          };

          try {
            const response = await axios.post(
              \`\${String(process.env.NEXT_PUBLIC_EC2_WALACOR)}/api/envelopes/submit\`,
              payload,
              {
                headers: {
                  Authorization: \`\${token}\`,
                  ETId: etid,
                  "Content-Type": "application/json",
                },
              }
            );

            setResponse(response.data);
            triggerRefetch();

            return response.data;
          } catch (error) {
            console.error("Error updating record:", error);
            setError(error as Error);
            throw error;
          } finally {
            setLoading(false);
          }
        };

        return { updateRecord, loading, response, error };
      }
    `,
    explanation: `This hook allows you to update an existing schema on the Walacor platform by 
      filtering and submitting the necessary fields. It handles authentication and triggers a refetch after a successful update.`,
  },
];

const HooksPage = () => {
  const [selectedHook, setSelectedHook] = useState<string>("about");

  const getHookContent = (hookName: string) => {
    const hook = hooks.find((hook) => hook.name === hookName);
    if (hook) {
      return (
        <div className="bg-white p-6">
          <h2 className="text-2xl mb-4">{hook.name}</h2>
          <p className="text-gray-700 mb-4">{hook.description}</p>
          <p className="text-gray-700 mt-4">{hook.explanation}</p>
          <pre className="bg-gray-100 overflow-x-auto whitespace-pre-wrap break-all rounded-lg text-xs">
            <code dangerouslySetInnerHTML={{ __html: hook.code }} />
          </pre>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-12">
        <h1 className="text-4xl mb-6 text-center">Hooks</h1>

        {/* Tab Selector */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedHook("about")}
              className={`px-4 py-2 text-white ${
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
                className={`px-4 py-2 text-white ${
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
            <h2 className="text-2xl mb-4">About Hooks</h2>
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
