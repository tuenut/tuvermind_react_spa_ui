import { configureApi } from "../libs/Api";

import { HOST } from "../settings/remoteAPIHost";
import {TodoesApi, TodoesHandler} from "./todoes";
import { AxiosRequestConfig } from "axios";
import { ApiProvider } from "../libs/Api/apiProvider";


const endpoints = {
  todoes: {
    endpoint: TodoesApi,
    handler: TodoesHandler
  }
};

export interface Api extends ApiProvider {
  todoes: TodoesApi
}

const headers = {};

const axiosConfig: AxiosRequestConfig = {
  withCredentials: false  // временно, пока авторизация не реализована.
};

export const enableApi = () => configureApi(HOST, endpoints, headers, axiosConfig);