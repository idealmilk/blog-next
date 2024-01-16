import { GetUserAPI } from "@/app/api/user";
import useSWR from "swr";

export default function useUser() {
  const { data, mutate, error } = useSWR("user", GetUserAPI);

  console.log("error: ", error);
  console.log("data: ", data);

  const loading = !data && !error;
  const loggedIn = data && !("error" in data);

  return {
    loading,
    loggedIn,
    user: data,
    mutate,
  };
}
