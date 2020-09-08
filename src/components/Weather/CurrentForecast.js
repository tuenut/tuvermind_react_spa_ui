import React, {useEffect, useState} from "react";

import axios from "axios/index";

import {roundDate} from "../../utils/roundDate";
import {WEATHER_URL} from "../../settings/remoteAPI";
import {ForecastCard} from "./parts";


export const CurrentForecast = props => {
  const [data, setData] = useState({
    timestamp: undefined,
    temperature: undefined,
    pressure: undefined,
    humidity: undefined,
    weather: undefined,
    weather_data: undefined
  });

  const request = () => {
    const nearestDate = roundDate(new Date());
    axios
      .get(`${WEATHER_URL}?timestamp=${nearestDate.toISOString()}`)
      .then(res => setData(res.data.results[0]))
      .catch(err => {
        console.log(err);
        alert(err.message);
      });
  };

  useEffect(() => {
    request();

    const interval = setInterval(request, 1000 * 60 * 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <ForecastCard current {...data}/>
  )
};