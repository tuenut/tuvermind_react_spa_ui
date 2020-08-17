import React from "react";
import {Card, Row, Col} from 'react-bootstrap';
import BaseWeatherCard from "../BaseWeatherCard";


export default class NextWeatherCard extends BaseWeatherCard {
  render() {
    return (
      <Card bg={"dark"} className={"text-center border-0"}>
        <Card.Body>

          <Card.Title className={"pl-4"}>
            <h4>
              {this.getDate()} {this.getTime()}
            </h4>
          </Card.Title>

          <Row>
            <Col className={"mx-2"} style={{fontSize: 24}}>
              {this.getTemperature()}
            </Col>
            <Col>
              {this.getWeatherIcon(48, 48)}
            </Col>
          </Row>

          <Row>
            <Col>
              {this.getHumidity()}
            </Col>
            <Col xs={6} className={"px-0"}>
              {this.getPressure()}
            </Col>
          </Row>

        </Card.Body>
      </Card>
    )
  }
}