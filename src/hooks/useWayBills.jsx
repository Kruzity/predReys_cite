import { useGetQuery } from "./requestHook"

export const useWayBills = () => {
  const { data, isPending, isError, error } = useGetQuery("https://stagewaybills.predreysdoc.com/api/v1/WayBillRequests", ["way_bills"]);

  if (isError) return error;
  return isPending ? null : data;
}