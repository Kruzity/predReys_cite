import { useGetQuery } from "./requestHook"
import config from "../config/env.js"

export const useAddresses = (companyId) => {
  const { data, isPending, isError, error } = useGetQuery(`${config.NsiApiUri}api/v1/CompanyAddresses`, ["addresses"], { params: { "CompanyId": companyId } });

  if (isError) return error;
  return isPending ? null : (data.map(r => `${r.postalCode} г. ${r.city}, ул. ${r.street}, д. ${r.house}`));
}