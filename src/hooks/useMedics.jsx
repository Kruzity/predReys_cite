import { useGetQuery } from "./requestHook"

export const useMedics = (addParams, pocId) => {
  const { data, isPending, isError, error } = useGetQuery("https://stagensi.predreysdoc.com/api/v1/Employees", pocId ? ["medics", pocId] : ["medics"], { params: { isMedic: true, ...addParams } });

  if (isError) return error;
  return isPending ? null : data.filter(r => r.person);
}