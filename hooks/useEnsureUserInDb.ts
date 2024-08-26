"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useGetUser } from "./useGetUser";
import { useAddUser } from "./useAddUser";
import bcrypt from "bcryptjs";

const useEnsureUserInDb = () => {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const { data: userData, getUser } = useGetUser();
  const { addUser } = useAddUser();
  const [hasCheckedUser, setHasCheckedUser] = useState(false);

  useEffect(() => {
    const ensureUserInDb = async () => {
      if (isLoaded && isSignedIn && userId && !hasCheckedUser) {
        setHasCheckedUser(true);

        const userResponse = await getUser({ UserUID: userId });

        if (userResponse === undefined || userResponse === null) {
          const password = "TemporaryPassword123";
          const passwordHash = bcrypt.hashSync(password, 10);

          await addUser({
            UserName: userId,
            FirstName: "test",
            LastName: "test",
            Password: passwordHash,
          });
        }
      }
    };

    ensureUserInDb();
  }, [isLoaded, isSignedIn, userId, hasCheckedUser, getUser, addUser]);
};

export default useEnsureUserInDb;
