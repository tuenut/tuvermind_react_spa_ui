import React from 'react';

import {Table, Row, Col} from 'react-bootstrap';

import {ClockCard} from "../Clock";
import {CurrentForecast, TodayForecast} from "./parts";


export const Weather = props => (
  <Table borderless variant={"dark"} className={"mx-auto h-100"}>
    <tbody>

    <tr>
      <td>
        <ClockCard/>
      </td>
    </tr>

    <tr>
      <td>
        <Row>
          <Col>
            <CurrentForecast/>
          </Col>
          <Col xs={9}>
            <TodayForecast/>
          </Col>
        </Row>
      </td>
    </tr>

    </tbody>
  </Table>
);