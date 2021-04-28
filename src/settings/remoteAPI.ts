import {makeApiGetter} from "../libs/Api/index";
import {IEffectiveApiObject} from "../types";

export const WEATHER_URL = "/api/weather/";
export const TODOES_URL = "/api/todo/";
export const TODOES_SCHEDULED_URL = "/api/todo/scheduled/";


export const getApi: () => IEffectiveApiObject = makeApiGetter();