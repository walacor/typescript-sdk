import { useState, useCallback } from "react";
import axios from "axios";
import useAuthenticatedToken from "../auth/useAuthenticatedToken";

type User = {
  UID: string;
  UserName: string;
  FirstName: string;
  LastName: string;
  UserType: string;
};

export const useGetUser = () => {
  const [data, setData] = useState<User[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const token = useAuthenticatedToken();

  const getUser = useCallback(
    async (filter: { UserName?: string; UserUID?: string }) => {
      setLoading(true);

      try {
        const res = await axios.post(
          `${String(
            process.env.NEXT_PUBLIC_EC2_WALACOR
          )}/api/query/get?fromSummary=true`,
          {},
          {
            headers: {
              ETId: Number(process.env.NEXT_PUBLIC_WALACOR_PROFILE_ETID),
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.data && res.data.success && Array.isArray(res.data.data)) {
          const filteredData = res.data.data.filter((user: User) => {
            if (filter.UserName) {
              return user.UserName === filter.UserName;
            }
            if (filter.UserUID) {
              return user.UID === filter.UserUID;
            }
            return false;
          });

          setData(filteredData);
        } else {
          setError(new Error("Unexpected response structure"));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return { data, error, loading, getUser };
};
