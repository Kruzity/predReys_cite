import { useGetQuery } from "./requestHook"
import config from "../config/env.js"


export const useMedics = (addParams, pocId) => {
  const { data, isPending, isError, error } = useGetQuery(`${config.NsiApiUri}api/v1/Employees`, pocId ? ["medics", pocId] : ["medics"], { params: { isMedic: true, ...addParams } });

  if (isError) return error;
  return isPending ? null : data.filter(r => r.person);
}