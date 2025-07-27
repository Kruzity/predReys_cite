import { useGetQuery } from "./requestHook"

export const useCompanyContacts = (companyId) => {
  const { data, isPending, isError, error } = useGetQuery(`https://stagecompanybalance.predreysdoc.com/api/v1/CompanyBalance?Companies=${companyId}`, ["company_balance", companyId]);

  if (isError) return error;
  return isPending ? null : (data && data.length ? data[0].balance : "Баланс не доступен");
}