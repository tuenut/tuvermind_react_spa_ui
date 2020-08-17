import React, {Fragment} from "react";

import {Image} from 'react-bootstrap';

import humidity_icon from "../../../assets/icons/weather/027-humidity.svg";
import barometer_icon from "../../../assets/icons/weather/050-barometer.svg";

const invert_style = {WebkitFilter: "invert(.90)"};

export class ForecastCard extends React.Component {
  getTime() {
    return this.props.data && new Date(this.props.data.timestamp).toLocaleTimeString().split(':').slice(0, 2).join(':')
  }

  getDate() {
    return this.props.data && new Date(this.props.data.timestamp).toLocaleDateString("ru", {
      day: 'numeric',
      month: 'long',
    })
  }

  getTemperature() {
    let temperature = this.props.data && Math.round(this.props.data.temperature - 273);
    let color;

    if (!temperature) {
      return
    } else if (25 <= temperature) {
      color = "text-danger";
    } else if (15 <= temperature && temperature < 25) {
      color = "text-warning";
    } else if (0 <= temperature && temperature < 15) {
      color = "text-success";
    } else if (temperature < 0) {
      color = "text-info";
    } else {
      console.log('else')
    }

    return <b className={color}>{temperature}°</b>
  }

  getWeatherIcon(w, h) {
    try {
      return (
        <img
          height={w}
          width={h}
          alt={this.props.data.weather_data.description}
          src={this.props.data.weather_data.icon}
        />
      )
    }
    catch (e) {
      return ""
    }
  }

  getHumidity() {
    return this.props.data &&
      <span style={{color: "#c3c3c3"}}>
        <Image width={16} height={16} src={humidity_icon} alt={"humidity"} className={"mr-2"} style={invert_style}/>
        {`${this.props.data.humidity}%`}
      </span>
  }

  getPressure() {
    return this.props.data &&
      <span style={{color: "#c3c3c3"}}>
        <Image width={16} height={16} src={barometer_icon} alt={"humidity"} className={"mr-2"} style={invert_style}/>
        {`${Math.round(this.props.data.pressure / 1.333)}мм рт.ст.`}
      </span>
  }

  render() {
    return (<Fragment/>)
  }
}