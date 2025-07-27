import { useGetQuery } from "./requestHook"
import config from "../config/env.js"

export const useAuthorizedContext = () => {
  const { data, isPending, isError, error } = useGetQuery(`${config.AuthApiUri}api/v1/Users/AuthorizedContext`, ["authorized_context"]);

  if (isError) return error;
  return isPending ? null : data;
}