import { useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import usePostSchema from "../schema/usePostSchema";

export const useAddUser = () => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const {
    postSchema,
    response: postResponse,
    error: postError,
  } = usePostSchema(Number(process.env.NEXT_PUBLIC_WALACOR_PROFILE_ETID));

  const addUser = useCallback(async () => {
    console.log(user);
    if (!user) {
      setError(new Error("User not authenticated"));
      return;
    }

    setLoading(true);

    console.log(user);
    console.log(user.fullName || user.id);
    console.log(user.firstName);

    try {
      const payload = {
        UserName: user.fullName || user.id,
        FirstName: user.firstName || "First",
        LastName: user.lastName || "Last",
      };

      console.log(payload);
      await postSchema(payload);

      if (postError) {
        setError(postError);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [user, postSchema, postError]);

  return { response: postResponse, error, loading, addUser };
};
