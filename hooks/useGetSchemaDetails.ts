import { useState } from "react";
import axios from "axios";
import useAuthenticatedToken from "./useAuthenticatedToken";

export function useGetSchemaDetails() {
  const token = useAuthenticatedToken();

  const [schemaDetails, setSchemaDetails] = useState(null);

  const fetchSchemaData = async () => {
    if (!token) {
      console.error("No token available. Please log in first.");
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_EC2_WALACOR}/api/schemas/envelopeTypes/Number(process.env.NEXT_PUBLIC_WALACOR_SCHEMA)/details`,
        {
          headers: {
            ETid: Number(process.env.NEXT_PUBLIC_WALACOR_SCHEMA),
            Authorization: `${token}`,
          },
        }
      );

      console.log("Data fetched:", res.data);
      setSchemaDetails(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return { schemaDetails, fetchSchemaData };
}
