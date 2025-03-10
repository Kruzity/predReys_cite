import { useGetQuery } from "./requestHook"

export const useTechnicians = (addParams, pocId) => {
  const { data, isPending, isError, error } = useGetQuery("https://stagensi.predreysdoc.com/api/v1/Employees", pocId ? ["techs", pocId] : ["techs"], { params: { isTechnical: true, ...addParams } });

  if (isError) return error;
  return isPending ? null : data.filter(r => r.person);
}