import React from "react";

import {Card, Row, Col} from 'react-bootstrap';

import {getDate, getHumidity, getPressure, getTemperature, getTime, getWeatherIcon} from "./_utils";


const temperatureStyle = {fontSize: 24};
const currentTemperatureStyle = {fontSize: 48};

export const ForecastCard = props => (
  <Card bg={"dark"} className={"text-center border-0"}>
    <Card.Body>

      <Card.Title className={"pl-4"}>
        {
          props.current
            ? <h1>Погода сейчас</h1>
            : <h4>{`${getDate(props.timestamp)} ${getTime(props.timestamp)}`}</h4>
        }

      </Card.Title>

      <Row>
        <Col
          className={"mx-2"}
          style={props.current ? currentTemperatureStyle : temperatureStyle}
        >
          {getTemperature(props.temperature)}
        </Col>
        <Col>
          {props.weather_data && getWeatherIcon(
            props.weather_data,
            props.current ? 128 : 48,
            props.current ? 128 : 48
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          {getHumidity(props.humidity)}
        </Col>
        <Col xs={6} className={"px-0"}>
          {getPressure(props.pressure)}
        </Col>
      </Row>

    </Card.Body>
  </Card>
);