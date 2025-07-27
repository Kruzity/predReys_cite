import { useGetQuery } from "./requestHook"
import config from "../config/env.js"

export const useDispatchers = () => {
  const { data, isPending, isError, error } = useGetQuery(`${config.NsiApiUri}api/v1/Employees`, ["dispatchers"], { params: { isDispatcher: true } });

  if (isError) return error;
  return isPending ? null : data.filter(r => r.person);
}