import React, {useEffect, useState} from "react";

import {URI} from "../../API/bases/apiProvider";
import {WEATHER_URL} from "../../settings/remoteAPI";

import {roundDate} from "../../utils/roundDate";
import {ForecastCard} from "./parts";
import {API} from "../../API/bases/apiProvider";


const MINUTE = 1000 * 60;


export const CurrentForecast = () => {
  const [data, setData] = useState({
    timestamp: undefined,
    temperature: undefined,
    pressure: undefined,
    humidity: undefined,
    weather: undefined,
    weather_data: undefined
  });

  const request = React.useCallback(() => {
    const api = new API();

    const options = {timestamp: roundDate(new Date()).toISOString()};
    const url = new URI(WEATHER_URL).list(1, 1, options);

    const successHandler = res => setData(res.data.results[0]);

    api.list(url, successHandler);
  }, []);

  useEffect(() => {
    request();

    const interval = setInterval(request, 10 * MINUTE);

    return () => clearInterval(interval);
  }, []);

  return (
    <ForecastCard current {...data}/>
  )
};