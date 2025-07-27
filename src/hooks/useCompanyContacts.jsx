import { useGetQuery } from "./requestHook"
import config from "../config/env.js"

export const useCompanyContacts = () => {
  const { data, isPending, isError, error } = useGetQuery(`${config.NsiApiUri}api/v1/CompanyContacts`, ["company_contacts"]);

  if (isError) return error;
  return isPending ? null : data.filter(r => r.isUseForWayBill);
}