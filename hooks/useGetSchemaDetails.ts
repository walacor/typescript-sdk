import { useState } from "react";
import axios from "axios";
import useAuthenticatedToken from "./useAuthenticatedToken";

export function useGetSchemaDetails(etid: number) {
  const token = useAuthenticatedToken();

  const [schemaDetails, setSchemaDetails] = useState(null);

  const fetchSchemaData = async () => {
    if (!token) {
      console.error("No token available. Please log in first.");
      return;
    }

    try {
      const res = await axios.get(
        `${String(
          process.env.NEXT_PUBLIC_EC2_WALACOR
        )}/api/schemas/envelopeTypes/${Number(
          process.env.NEXT_PUBLIC_WALACOR_BLOG_ETID
        )}/details`,
        {
          headers: {
            ETid: etid,
            Authorization: `${token}`,
          },
        }
      );

      setSchemaDetails(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return { schemaDetails, fetchSchemaData };
}
