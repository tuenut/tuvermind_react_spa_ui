import React, {useEffect, useState} from "react";

import axios from "axios/index";

import {CardDeck} from 'react-bootstrap';
import {roundDate} from "../../utils/roundDate";
import {WEATHER_URL} from "../../settings/remoteAPI";
import {ForecastCard} from "./parts";


export const TodayForecast = () => {
  const [data, setData] = useState([]);

  const request = () => {
    const dateFrom = roundDate(new Date());
    const dateTo = new Date(dateFrom);
    dateTo.setHours(dateFrom.getHours() + 12);

    const opts = Object
      .entries({
        timestamp__gte: dateFrom.toISOString(),
        timestamp__lte: dateTo.toISOString()
      })
      .map((opt) => opt.join("="))
      .join("&");

    axios
      .get(`${WEATHER_URL}?${opts}`)
      .then(res => setData(res.data.results))
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
    <CardDeck className="w-100">
      {
        data && data
          .sort((item1, item2) => {
            if (item1.timestamp > item2.timestamp) return 1;
            if (item1.timestamp < item2.timestamp) return -1;
            return 0;
          })
          .map((item, index) =>
            <ForecastCard {...item} key={index}/>
          )}
    </CardDeck>
  )
};