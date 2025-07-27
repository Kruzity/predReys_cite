import { useGetQuery } from "./requestHook"
import config from "../config/env.js"

export const useTechnicians = (addParams, pocId) => {
  const { data, isPending, isError, error } = useGetQuery(`${config.NsiApiUri}api/v1/Employees`, pocId ? ["techs", pocId] : ["techs"], { params: { isTechnical: true, ...addParams } });

  if (isError) return error;
  return isPending ? null : data.filter(r => r.person);
}