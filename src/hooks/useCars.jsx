import { useGetQuery } from "./requestHook"
import config from "../config/env.js"

export const useCars = () => {
  const { data, isPending, isError, error } = useGetQuery(`${config.NsiApiUri}api/v1/Cars`, ["cars"]);

  if (isError) return error;
  return isPending ? null : data.filter(r => r.sts?.car?.value);
}