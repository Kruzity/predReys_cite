import { useGetQuery } from "./requestHook"

export const useCars = () => {
  const { data, isPending, isError, error } = useGetQuery("https://stagensi.predreysdoc.com/api/v1/Cars", ["cars"]);

  if (isError) return error;
  return isPending ? null : data.filter(r => r.sts?.car?.value);
}