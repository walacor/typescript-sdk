import { useState, useCallback } from "react";
import axios from "axios";
import useAuthenticatedToken from "./useAuthenticatedToken";
import { BlogData } from "@/types/BlogData";

const useReadSchema = () => {
  const [response, setResponse] = useState<BlogData[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const token = useAuthenticatedToken();

  const readSchema = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_EC2_WALACOR}/api/query/get?fromSummary=true`,
        {},
        {
          headers: {
            ETId: Number(process.env.NEXT_PUBLIC_WALACOR_SCHEMA),
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const filteredData = (res.data?.data || []).filter(
        (blog: BlogData) => !blog.IsDeleted
      );

      setError(null);
      setResponse(filteredData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { response, error, loading, readSchema };
};

export default useReadSchema;
