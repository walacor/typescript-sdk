// Hook
import { useState, useCallback } from "react";
import axios from "axios";
import useAuthenticatedToken from "@/hooks/auth/useAuthenticatedToken";
import { MainData } from "@/types/schema";

export const useReadSchemas = (etid: number) => {
  const [data, setData] = useState<MainData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const token = useAuthenticatedToken();

  const readSchemas = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${String(process.env.NEXT_PUBLIC_EC2_WALACOR)}/api/query/getcomplex`,
        {},
        {
          headers: {
            ETId: etid,
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        setData(res.data.data);
        setError(null);
      } else {
        setError(new Error("Unexpected response structure"));
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [token, etid]);

  return { data, error, loading, readSchemas };
};
