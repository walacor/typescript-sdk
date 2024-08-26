import { useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import usePostSchema from "./usePostSchema";

export const useAddUser = () => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const {
    postSchema,
    response: postResponse,
    error: postError,
  } = usePostSchema(10);

  const addUser = useCallback(async () => {
    if (!user) {
      setError(new Error("User not authenticated"));
      return;
    }

    setLoading(true);

    try {
      const payload = {
        UserName: user.fullName || user.id,
        FirstName: user.firstName || "First",
        LastName: user.lastName || "Last",
        Password: "TemporaryPassword123",
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
  }, [user, postSchema, postError]);

  return { response: postResponse, error, loading, addUser };
};
