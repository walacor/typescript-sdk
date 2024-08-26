import { useState } from "react";
import axios from "axios";
import useAuthenticatedToken from "@/hooks/auth/useAuthenticatedToken";
import { useRefetch } from "@/context/RefetchContext";

export function useAddRole(etid: number) {
  const token = useAuthenticatedToken();
  const { triggerRefetch } = useRefetch();
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  const addRole = async (roleData: { RoleName: string; Scopes: string[] }) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    const payload = {
      ETId: etid,
      Data: [
        {
          ...roleData,
        },
      ],
    };

    try {
      const response = await axios.post(
        `${String(process.env.NEXT_PUBLIC_EC2_WALACOR)}/api/envelopes/submit`,
        payload,
        {
          headers: {
            ETId: etid,
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(response.data);
      triggerRefetch();

      return response.data;
    } catch (error) {
      console.error("Error adding role:", error);
      setError(error as Error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { addRole, loading, response, error };
}
