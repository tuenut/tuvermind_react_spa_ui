import {connect} from "react-redux";

import {ClockCard} from "./Clock";
import {timeTickAction} from "../../Store/actions";


const mapStateToProps = state => {
  return {
    current_date: state.time.current_date,
    current_time: state.time.current_time
  }
};

const mapDispatchToProps = {
  timeTick: timeTickAction
};

export const Clock = connect(mapStateToProps, mapDispatchToProps)(ClockCard);