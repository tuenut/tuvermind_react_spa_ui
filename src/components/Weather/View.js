import React from 'react';

import Table from 'react-bootstrap/Table';

import ClockContainer from "../Clock/ClockContainer";
import CurrentDayWeatherViewContainer from "./parts/ViewContainer";


export default class View extends React.Component {
  render() {
    return (
      <Table borderless variant={"dark"} className={"mx-auto h-100"}>
        <tbody>

        <tr>
          <td>
            <ClockContainer/>
          </td>
        </tr>

        <tr>
          <td>
            <CurrentDayWeatherViewContainer/>
          </td>
        </tr>

        </tbody>
      </Table>
    )
  }
};