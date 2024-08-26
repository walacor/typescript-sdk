import { useState } from "react";
import axios from "axios";
import useAuthenticatedToken from "@/hooks/auth/useAuthenticatedToken";
import { useRefetch } from "@/context/RefetchContext";

export function useAssignRole(etid: number) {
  const token = useAuthenticatedToken();
  const { triggerRefetch } = useRefetch();
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  const assignRole = async (
    roleAssignments: { RoleID: string; UserUID: string }[]
  ) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    const payload = {
      ETId: etid,
      Data: roleAssignments,
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
      console.error("Error assigning role:", error);
      setError(error as Error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { assignRole, loading, response, error };
}
