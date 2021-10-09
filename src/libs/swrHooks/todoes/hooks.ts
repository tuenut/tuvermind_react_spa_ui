import useSWR from "swr";

import { HOST } from "../../../settings/remoteAPIHost";
import { TODOES_URL } from "../../../settings/remoteAPI";

import { todoesListFetcher } from "./fetchers";


export const useTodoList =
  (page?: number, pageSize?: number, queryParams?: object) => {
    const url = new URL(TODOES_URL, HOST);

    if ( page ) {
      url.searchParams.set("page", page.toString());
    }

    const {data, error, isValidating, mutate} =
      useSWR(url.toString(), todoesListFetcher);

    return {
      data,
      error,
      isValidating,
      isLoading: !data && !error
    }
  };
