import {createApi} from "../libs/Api";

import {HOST} from "../settings/remoteAPIHost";
import {TodoesApi} from "./todoes";


export {TodoesApi};
export const [getConfigurator, getApi] = createApi(HOST, {todoes: TodoesApi});