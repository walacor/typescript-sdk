import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import useAuthenticatedToken from "../auth/useAuthenticatedToken";
import { BlogData } from "@/schemas/blogSchema";
import { useRefetch } from "@/context/RefetchContext";

const useReadSchemas = (
  etid: number,
  userId: string,
  onlyPublished: boolean = false
) => {
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

      const filteredData = (res.data?.data || []).filter((blog: BlogData) => {
        // Ensure blogs are not deleted, belong to the current user, and match the published filter
        return (
          !blog.IsDeleted &&
          blog.userId === userId &&
          (!onlyPublished || blog.isPublished)
        );
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

      const liveData = filteredData.filter(
        (blog: BlogData) => blog.liveVersion
      );

      const mergedData = latestData.map((latestBlog: BlogData) => {
        const liveBlog = liveData.find(
          (blog: BlogData) => blog.id === latestBlog.id
        );
        return liveBlog ? { ...latestBlog, ...liveBlog } : latestBlog;
      });

      setError(null);
      setResponse(mergedData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [token, etid, userId, onlyPublished]);

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
