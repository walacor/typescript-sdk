import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import useAuthenticatedToken from "../auth/useAuthenticatedToken";
import { BlogData } from "@/schemas/blogSchema";
import { useRefetch } from "@/context/RefetchContext";

const useReadBlogRevisions = (etid: number, blogId: string) => {
  const [revisions, setRevisions] = useState<BlogData[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const token = useAuthenticatedToken();
  const { shouldRefetch, resetRefetch } = useRefetch();

  const fetchRevisions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${String(process.env.NEXT_PUBLIC_EC2_WALACOR)}/api/query/get`,
        {},
        {
          headers: {
            ETId: etid,
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data?.data) {
        const filteredRevisions = response.data.data.filter(
          (revision: BlogData) => revision.id === blogId && !revision.IsDeleted
        );

        setRevisions(filteredRevisions);
        setError(null);
      } else {
        setError(new Error("Failed to fetch revisions"));
      }
    } catch (err) {
      console.error("Error fetching revisions:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [etid, blogId, token]);

  useEffect(() => {
    if (blogId) {
      fetchRevisions();
    }
  }, [blogId, fetchRevisions]);

  useEffect(() => {
    if (shouldRefetch) {
      fetchRevisions().then(resetRefetch);
    }
  }, [shouldRefetch, fetchRevisions, resetRefetch]);

  return { revisions, error, loading };
};

export default useReadBlogRevisions;
