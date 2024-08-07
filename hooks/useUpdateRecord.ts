// useUpdateRecord.ts
import { useState } from "react";
import axios from "axios";
import useAuthenticatedToken from "./useAuthenticatedToken";
import { BlogData, blogSchema } from "@/schemas/blogSchema";
import { useRefetch } from "@/context/RefetchContext";

export function useUpdateRecord(etid: number) {
  const token = useAuthenticatedToken();
  const { triggerRefetch } = useRefetch();
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  const filterValidFields = (data: Partial<BlogData>): Partial<BlogData> => {
    const validFields = blogSchema.Fields.map((field) => field.FieldName);
    const filteredData = Object.keys(data)
      .filter((key): key is keyof BlogData => validFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = data[key as keyof BlogData] as undefined;
        return obj;
      }, {} as Partial<BlogData>);
    return filteredData;
  };

  const updateRecord = async (data: Partial<BlogData>) => {
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

      console.log("Record updated:", response.data);
      setResponse(response.data);
      triggerRefetch(); // Trigger refetch

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
