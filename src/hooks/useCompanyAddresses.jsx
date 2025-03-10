import { useGetQuery } from "./requestHook"

export const useCompanyAddresses = () => {
  const { data, isPending, isError, error } = useGetQuery("https://stagensi.predreysdoc.com/api/v1/CompanyAddresses", ["company_addresses"]);

  if (isError) return error;
  return isPending ? null : data.map(a=>`${a.postalCode} г. ${a.city}, ул. ${a.street}, д. ${a.house}`);
}