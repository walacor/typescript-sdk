import { useState, useCallback } from "react";
import axios from "axios";
import useAuthenticatedToken from "./useAuthenticatedToken";

interface BlogData {
  id: string;
  userId: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  authorName: string;
  authorImage: string;
  authorFallback: string;
  date: string;
  content: string;
  IsDeleted?: boolean;
}

interface ResponseData {
  Data: BlogData[];
  [key: string]: any;
}

const useReadOneSchema = (id: string) => {
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const token = useAuthenticatedToken();

  const readOneSchema = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_EC2_WALACOR}/api/query/get?fromSummary=true`,
        {
          id: String(id),
        },
        {
          headers: {
            ETId: Number(process.env.NEXT_PUBLIC_WALACOR_SCHEMA),
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setError(null);
      setResponse(res.data[0] || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [token]);
  return { response, error, loading, readOneSchema };
};

export default useReadOneSchema;
