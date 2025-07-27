import { useGetQuery } from "./requestHook"
import config from "../config/env.js"

export const useSuggestPerson = (suggest) => {
  const { data, isPending, isError, error } = useGetQuery(`${config.NsiApiUri}api/v1/Persons/Suggest`, ["suggest_person", suggest], { params: { "Suggest": suggest, "MaxItems": 50 } });

  if (isError) return error;
  return isPending ? [] : data;
}