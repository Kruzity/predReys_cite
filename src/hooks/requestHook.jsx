import { useQuery } from "@tanstack/react-query";
import { API } from "../requestAPI"

export const useGetQuery = (path, key, options) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = (await API.get(path, options)).data;
      return response.items ? response.items : response;
    }
  });
};

export const usePostQuery = (path, key, options) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = (await API.post(path, options)).data;
      return response.items ? response.items : response;
    }
  });
};