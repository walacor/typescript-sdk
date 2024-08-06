import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import useAuthenticatedToken from "./useAuthenticatedToken";
import { BlogData } from "@/types/BlogData";

const useReadOneSchema = (id: string, etid: number) => {
  const [response, setResponse] = useState<BlogData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const token = useAuthenticatedToken();

  const readOneSchema = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${String(
          process.env.NEXT_PUBLIC_EC2_WALACOR
        )}/api/query/get?fromSummary=true`,
        { id },
        {
          headers: {
            ETId: etid,
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setError(null);
      setResponse(res.data.data[0] || null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [token, id]);

  useEffect(() => {
    if (token) {
      readOneSchema();
    }
  }, [readOneSchema, token]);

  return { response, error, loading, readOneSchema };
};

export default useReadOneSchema;
