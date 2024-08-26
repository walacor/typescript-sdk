import { useState } from "react";
import axios from "axios";
import useAuthenticatedToken from "../auth/useAuthenticatedToken";
import { useRefetch } from "@/context/RefetchContext";

type User = {
  UID: string;
  UserName?: string;
  FirstName?: string;
  LastName?: string;
  UserType?: string;
};

export function useUpdateUser(etid: number) {
  const token = useAuthenticatedToken();
  const { triggerRefetch } = useRefetch();
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  const filterValidFields = (data: Partial<User>): Partial<User> => {
    const validFields = [
      "UID",
      "UserName",
      "FirstName",
      "LastName",
      "UserType",
    ];
    const filteredData = Object.keys(data)
      .filter((key): key is keyof User => validFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = data[key as keyof User] as undefined;
        return obj;
      }, {} as Partial<User>);

    return filteredData;
  };

  const updateRecord = async (data: Partial<User>) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    const filteredData = filterValidFields(data);
    const payload = {
      Data: [
        {
          ...filteredData,
        },
      ],
    };

    try {
      const response = await axios.post(
        `${String(process.env.NEXT_PUBLIC_EC2_WALACOR)}/api/envelopes/submit`,
        payload,
        {
          headers: {
            Authorization: `${token}`,
            ETId: etid,
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(response.data);
      triggerRefetch();

      return response.data;
    } catch (error) {
      console.error("Error updating record:", error);
      setError(error as Error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { updateRecord, loading, response, error };
}
