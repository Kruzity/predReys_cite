import { useGetQuery } from "./requestHook"

export const useCompanyContacts = () => {
  const { data, isPending, isError, error } = useGetQuery("https://stagensi.predreysdoc.com/api/v1/CompanyContacts", ["company_contacts"]);

  if (isError) return error;
  return isPending ? null : data.filter(r => r.isUseForWayBill);
}