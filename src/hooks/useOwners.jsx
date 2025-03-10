import { useGetQuery } from "./requestHook"

export const useOwners = () => {
  const { data, isPending, isError, error } = useGetQuery("https://stagensi.predreysdoc.com/api/v1/Companies/CompaniesPlatformOwner", ["owners"]);

  if (isError) return error;
  return isPending ? null : data;
}