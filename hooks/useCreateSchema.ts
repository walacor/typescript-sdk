import axios from "axios";
import useAuthenticatedToken from "./useAuthenticatedToken";
import { blogSchema } from "@/data/blogSchema";

export function useCreateSchema() {
  const token = useAuthenticatedToken();

  const createSchema = async () => {
    const schema = {
      ETId: 50,
      SV: 1,
      Schema: blogSchema,
    };

    try {
      const response = await axios.post(
        `${String(process.env.NEXT_PUBLIC_EC2_WALACOR)}/api/schemas/`,
        schema,
        {
          headers: {
            Authorization: `${token}`,
            ETId: Number(process.env.NEXT_PUBLIC_WALACOR_ETID),
            SV: 1,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error creating schema:", error);
      throw error;
    }
  };

  return { createSchema };
}
