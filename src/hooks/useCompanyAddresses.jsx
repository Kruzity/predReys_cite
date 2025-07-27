import { useGetQuery } from "./requestHook"
import config from "../config/env.js"

export const useCompanyAddresses = () => {
  const { data, isPending, isError, error } = useGetQuery(`${config.NsiApiUri}api/v1/CompanyAddresses`, ["company_addresses"]);

  if (isError) return error;
  return isPending ? null : data.map(a=>`${a.postalCode} г. ${a.city}, ул. ${a.street}, д. ${a.house}`);
}