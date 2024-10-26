import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import useAuthenticatedToken from "../auth/useAuthenticatedToken";
import { useRefetch } from "@/context/RefetchContext";

export const useVerifyFile = (file: File) => {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const token = useAuthenticatedToken();
  const { shouldRefetch, resetRefetch } = useRefetch();

  const verifyFile = useCallback(async () => {
    if (!token || !file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await axios({
        method: "post",
        url: `${String(process.env.NEXT_PUBLIC_EC2_WALACOR)}/api/v2/files/verify`,
        data: formData,
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data, "RESP");

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
  }, [token, file]);

  useEffect(() => {
    if (file && token) {
      verifyFile();
    }
  }, [verifyFile, file, token]);

  useEffect(() => {
    if (shouldRefetch) {
      verifyFile().then(resetRefetch);
    }
  }, [shouldRefetch, verifyFile, resetRefetch]);

  return { result, error, loading, verifyFile };
};
