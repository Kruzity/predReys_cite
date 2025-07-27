import { useGetQuery } from "./requestHook"
import config from "../config/env.js"

export const useOwners = () => {
  const { data, isPending, isError, error } = useGetQuery(`${config.NsiApiUri}api/v1/Companies/CompaniesPlatformOwner`, ["owners"]);

  if (isError) return error;
  return isPending ? null : data;
}