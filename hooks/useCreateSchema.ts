import axios from "axios";
import useAuthenticatedToken from "./useAuthenticatedToken";
import { profileSchema } from "@/schemas/profileSchema";

export function useCreateSchema(etid: number) {
  const token = useAuthenticatedToken();

  const createSchema = async () => {
    const schema = {
      ETId: 50,
      SV: 1,
      Schema: profileSchema,
    };

    try {
      const response = await axios.post(
        `${String(process.env.NEXT_PUBLIC_EC2_WALACOR)}/api/schemas/`,
        schema,
        {
          headers: {
            Authorization: `${token}`,
            ETId: etid,
            SV: 1,
          },
        }
      );

      console.log("Schema created:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error creating schema:", error);
      throw error;
    }
  };

  return { createSchema };
}
