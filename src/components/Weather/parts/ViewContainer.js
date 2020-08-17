import {connect} from "react-redux";

import {getTodayWeather} from "../../../Store/Weather/CurrentDay/actions";
import View from "./View";


const mapStateToProps = state => {
  return {
    data: state.weather.today.data,
    loading: state.weather.today.loading,
    error: state.weather.today.error
  }
};


const mapDispatchToProps = {
  getTodayWeather: getTodayWeather
};

export default connect(mapStateToProps, mapDispatchToProps)(View);