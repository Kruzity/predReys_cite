import { useGetQuery } from "./requestHook"

export const useAddresses = (companyId) => {
  const { data, isPending, isError, error } = useGetQuery("https://stagensi.predreysdoc.com/api/v1/CompanyAddresses", ["addresses"], { params: { "CompanyId": companyId } });

  if (isError) return error;
  return isPending ? null : (data.map(r => `${r.postalCode} г. ${r.city}, ул. ${r.street}, д. ${r.house}`));
}