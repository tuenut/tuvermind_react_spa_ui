import useSWR from "swr";

import { defaultFetcher } from "./_fetchers";

import { TODOES_URL } from "../../settings/remoteAPI";
import { HOST } from "../../settings/remoteAPIHost";


export const useTodoList = (page?) => {
  const url = new URL(TODOES_URL, HOST);

  if ( page ) {
    url.searchParams.set("page", page);
  }

  return useSWR(url.toString(), defaultFetcher);
};