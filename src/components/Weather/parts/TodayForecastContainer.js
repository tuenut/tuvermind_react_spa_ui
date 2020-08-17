import {connect} from "react-redux";

import {requestTodayForecast} from "../../../Store/actions";
import {TodayForecast} from "./TodayForecast";


const mapStateToProps = state => {
  return {
    data: state.weather.today.data,
    loading: state.weather.today.loading,
    error: state.weather.today.error
  }
};


const mapDispatchToProps = {
  getTodayWeather: requestTodayForecast
};

export const TodayForecastContainer = connect(mapStateToProps, mapDispatchToProps)(TodayForecast);