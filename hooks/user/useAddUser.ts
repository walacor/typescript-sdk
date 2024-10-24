import { useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import usePostSchema from "../schema/usePostSchema";
import { useGetUser } from "@/hooks/user/useGetUser";
import { ProfileData } from "@/schemas/profileSchema";

export const useAddUser = () => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { data: existingUser, getUser } = useGetUser();

  const { postSchema, response: postResponse, error: postError } = usePostSchema(Number(process.env.NEXT_PUBLIC_WALACOR_PROFILE_ETID));

  const addUser = useCallback(async () => {
    if (!user) {
      setError(new Error("User not authenticated"));
      return;
    }

    setLoading(true);

    try {
      await getUser({ userId: user.id });

      if (existingUser) {
        throw new Error("User with the same userId already exists.");
      }

      const payload: Partial<ProfileData> = {
        userId: user.id,
        firstName: user.firstName || "First",
        lastName: user.lastName || "Last",
        userRole: "Viewe1123r",
      };

      await postSchema(payload);

      if (postError) {
        setError(postError);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [user, postSchema, postError, getUser, existingUser]);

  return { response: postResponse, error, loading, addUser };
};
