import { useGetQuery } from "./requestHook"
import config from "../config/env.js"

export const useDrivers = () => {
  const { data, isPending, isError, error } = useGetQuery(`${config.NsiApiUri}api/v1/Employees`, ["drivers"], { params: { isDriver: true } });

  if (isError) return error;
  return isPending ? null : data.filter(r => r.person);
}