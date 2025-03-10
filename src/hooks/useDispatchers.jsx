import { useGetQuery } from "./requestHook"

export const useDispatchers = () => {
  const { data, isPending, isError, error } = useGetQuery("https://stagensi.predreysdoc.com/api/v1/Employees", ["dispatchers"], { params: { isDispatcher: true } });

  if (isError) return error;
  return isPending ? null : data.filter(r => r.person);
}