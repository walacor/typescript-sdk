import axios from "axios";
import { useRecoilState } from "recoil";
import { tokenState } from "@/recoil/atoms";

interface LoginResponse {
  api_token: string;
}

export function useLogin() {
  const [token, setToken] = useRecoilState(tokenState);

  async function login() {
    try {
      const res = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_EC2_WALACOR}/api/auth/login`,
        {
          userName: "Admin",
          password: "password",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setToken(res.data.api_token);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  return { token, login };
}
