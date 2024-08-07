// useReadSchema.ts
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import useAuthenticatedToken from "./useAuthenticatedToken";
import { BlogData } from "@/schemas/blogSchema";
import { useRefetch } from "@/context/RefetchContext";

const useReadSchema = (etid: number) => {
  const [response, setResponse] = useState<BlogData[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const token = useAuthenticatedToken();
  const { shouldRefetch, resetRefetch } = useRefetch();

  const readSchema = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${String(
          process.env.NEXT_PUBLIC_EC2_WALACOR
        )}/api/query/get?fromSummary=true`,
        {},
        {
          headers: {
            ETId: etid,
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const filteredData = (res.data?.data || []).filter(
        (blog: BlogData) => !blog.IsDeleted
      );

      const latestData = filteredData.reduce(
        (acc: BlogData[], current: BlogData) => {
          const existing = acc.find((item) => item.id === current.id);
          if (
            !existing ||
            new Date(current.UpdatedAt) > new Date(existing.UpdatedAt)
          ) {
            acc = acc.filter((item) => item.id !== current.id);
            acc.push(current);
          }
          return acc;
        },
        [] as BlogData[]
      );

      console.log(res);

      setError(null);
      setResponse(latestData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [token, etid]);

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

export default useReadSchema;
