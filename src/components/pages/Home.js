import React, {Fragment} from "react";

import {Table, Row, Col} from 'react-bootstrap';
import {ClockCard} from "../Clock";
import {CurrentForecast, TodayForecast} from "../Weather";


export const Home = () => (
  <Fragment>
    <Row className={"justify-content-center text-light"}>
      <ClockCard/>
    </Row>
    <Row className={"justify-content-center text-light"}>
      <Col xs={3}>

        <CurrentForecast/>

      </Col>
      <Col>

        <TodayForecast/>

      </Col>
    </Row>
  </Fragment>
);
