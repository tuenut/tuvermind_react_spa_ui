import React from 'react';

import {CardDeck, Row, Col} from 'react-bootstrap'

import {CurrentWeatherCardContainer} from "./CurrentForecastCardContainer";
import {TodayForecastCards} from "./TodayForecastCards";


export class TodayForecast extends React.Component {
  componentDidMount() {
    this.props.getTodayWeather();

    this.timerID = setInterval(
      this.props.getTodayWeather,
      1000 * 60 * 10
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <Row>
        <Col>
          <CurrentWeatherCardContainer/>
        </Col>
        <Col xs={9}>
          <CardDeck style={{maxWidth: "100%"}}>
            {
              this.props.data && this.props.data.map((data) =>
                (new Date(data.timestamp) > new Date())
                && <TodayForecastCards key={data.timestamp} data={data}/>
              )
            }

          </CardDeck>
        </Col>
      </Row>
    )
  }
}