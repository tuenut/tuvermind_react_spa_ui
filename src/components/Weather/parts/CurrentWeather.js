import React from "react";
import {Card, Row, Col} from 'react-bootstrap';
import BaseWeatherCard from "./BaseWeatherCard";


export default class CurrentWeatherCard extends BaseWeatherCard {
  componentDidMount() {
    this.props.getCurrentWeather();

    this.timerID = setInterval(
      this.props.getCurrentWeather,
      1000 * 60 * 10
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <Card bg={"dark"} className={"text-center border-0"}>
        <Card.Body>

          <Card.Title>
            <h1>Погода сейчас</h1>
          </Card.Title>

          <Row>
            <Col className={"my-4"} style={{fontSize: 48}}>
              {this.getTemperature()}
            </Col>
            <Col>
              {this.getWeatherIcon(128, 128)}
            </Col>
          </Row>

          <Row>
            <Col className={"mx-2"}>
              {this.getHumidity()}
            </Col>
            <Col className={"mx-2"}>
              {this.getPressure()}
            </Col>
          </Row>

        </Card.Body>
      </Card>
    )
  }
}