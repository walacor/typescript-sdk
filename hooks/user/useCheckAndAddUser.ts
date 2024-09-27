import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useGetUser } from "@/hooks/user/useGetUser";
import { useAddUser } from "@/hooks/user/useAddUser";

export const useCheckAndAddUser = () => {
  const { user } = useUser();
  const { data, getUser, loading: loadingGet } = useGetUser();
  const { addUser, loading: loadingAdd } = useAddUser();
  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    if (user && !userChecked) {
      console.log(user);
      const checkAndAddUser = async () => {
        console.log(user);
        await getUser({ UserName: user.fullName || user.id });

        console.log(data);

        if ((data && data.length === 0) || data === null) {
          console.log(data);
          await addUser();
        }

        console.log(user);

        setUserChecked(true);
      };

      checkAndAddUser();
    }
  }, [user, userChecked, getUser, addUser, data]);

  return { loading: loadingGet || loadingAdd };
};
