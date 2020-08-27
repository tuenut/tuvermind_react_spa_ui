import React, {Fragment} from "react";

import {Image} from 'react-bootstrap';

import humidity_icon from "../../../assets/icons/weather/027-humidity.svg";
import barometer_icon from "../../../assets/icons/weather/050-barometer.svg";

export const getTime = timestamp => new Date(timestamp).toLocaleTimeString().split(':').slice(0, 2).join(':');

export const getDate = timestamp => new Date(timestamp).toLocaleDateString("ru", {day: 'numeric', month: 'long',});

export const getTemperature = temperature => {
  let _temperature = Math.round(temperature - 273);
  let color;

  if (!_temperature) {
    return
  } else if (25 <= _temperature) {
    color = "text-danger";
  } else if (15 <= _temperature && _temperature < 25) {
    color = "text-warning";
  } else if (0 <= _temperature && _temperature < 15) {
    color = "text-success";
  } else if (_temperature < 0) {
    color = "text-info";
  }

  return <b className={color}>{_temperature}°</b>
};

export const getWeatherIcon = (weather_data, w, h) => (
  <img height={w} width={h} alt={weather_data.description} src={weather_data.icon}/>
);

const imageStyle = {WebkitFilter: "invert(.90)"};
const spanStyle = {color: "#c3c3c3"};

export const getHumidity = humidity => (
  <span style={spanStyle}>
    <Image width={16} height={16} src={humidity_icon} alt={"humidity"} className={"mr-2"} style={imageStyle}/>
    {`${humidity}%`}
  </span>
);

export const getPressure = pressure => (
  <span style={spanStyle}>
    <Image width={16} height={16} src={barometer_icon} alt={"humidity"} className={"mr-2"} style={imageStyle}/>
    {`${Math.round(pressure / 1.333)}мм рт.ст.`}
  </span>
);