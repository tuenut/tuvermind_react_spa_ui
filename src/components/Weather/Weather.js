import React from 'react';

import Table from 'react-bootstrap/Table';

import {Clock} from "../Clock/ClockContainer";
import {TodayForecast} from "./parts";


export const Weather = props => (
  <Table borderless variant={"dark"} className={"mx-auto h-100"}>
    <tbody>

    <tr>
      <td>
        <Clock/>
      </td>
    </tr>

    <tr>
      <td>
        <TodayForecast/>
      </td>
    </tr>

    </tbody>
  </Table>
);