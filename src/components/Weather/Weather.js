import React from 'react';

import Table from 'react-bootstrap/Table';

import {ClockCard} from "../Clock";
import {TodayForecast} from "./parts";


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
        <TodayForecast/>
      </td>
    </tr>

    </tbody>
  </Table>
);