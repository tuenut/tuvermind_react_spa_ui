import {connect} from "react-redux";

import {requestCurrentForecast} from "../../../Store/actions";
import {CurrentForecastCard} from "./CurrentForecastCard";


const mapStateToProps = state => {
  return {
    data: state.weather.current.data,
    loading: state.weather.current.loading,
    error: state.weather.current.error
  }
};


const mapDispatchToProps = {
  getCurrentWeather: requestCurrentForecast
};

export const CurrentWeatherCardContainer = connect(mapStateToProps, mapDispatchToProps)(CurrentForecastCard);