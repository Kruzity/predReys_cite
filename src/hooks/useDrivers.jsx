import { useGetQuery } from "./requestHook"

export const useDrivers = () => {
  const { data, isPending, isError, error } = useGetQuery("https://stagensi.predreysdoc.com/api/v1/Employees", ["drivers"], { params: { isDriver: true } });

  if (isError) return error;
  return isPending ? null : data.filter(r => r.person);
}