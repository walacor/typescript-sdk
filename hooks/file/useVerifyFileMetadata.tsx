import { useState, useCallback } from "react";
import axios from "axios";
import useAuthenticatedToken from "../auth/useAuthenticatedToken";
import { FileVerificationResponse } from "@/types/schema";

export const useVerifyFileMetadata = () => {
  const [result, setResult] = useState<FileVerificationResponse | string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const token = useAuthenticatedToken();

  const verifyMetadata = useCallback(
    async (file: File) => {
      if (!token || !file) return;

      const formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_EC2_WALACOR}/api/v2/files/verify`, formData, {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data) {
          setResult(res.data);
          setError(null);
        } else {
          setError(new Error("Unexpected response structure"));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return { result, error, loading, verifyMetadata };
};
