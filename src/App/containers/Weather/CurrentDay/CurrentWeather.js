import {connect} from "react-redux";

import {getCurrentWeather} from "../../../../Store/Weather/CurrentDay/CurrentWeather/actions";
import CurrentWeatherCard from "../../../components/Weather/CurrentDay/CurrentWeather";


const mapStateToProps = state => {
  return {
    data: state.weather.current.data,
    loading: state.weather.current.loading,
    error: state.weather.current.error
  }
};


const mapDispatchToProps = {
  getCurrentWeather: getCurrentWeather
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeatherCard);