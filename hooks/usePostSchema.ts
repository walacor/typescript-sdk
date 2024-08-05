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
  [key: string]: any;
}

const usePostSchema = () => {
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const token = useAuthenticatedToken();

  const postSchema = useCallback(
    async (data: BlogData) => {
      setLoading(true);
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_EC2_WALACOR}/api/envelopes/submit`,
          { Data: [data] },
          {
            headers: {
              ETId: Number(process.env.NEXT_PUBLIC_WALACOR_SCHEMA),
              Authorization: `${token}`,
              SV: 1,
              "Content-Type": "application/json",
            },
          }
        );
        setResponse(res.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return { response, error, loading, postSchema };
};

export default usePostSchema;
