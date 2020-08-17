import {connect} from "react-redux";

import Clock from "./Clock";
import {timeTickAction} from "../../Store/Clock/actions";


const mapStateToProps = state => {
  return {
    current_date: state.time.current_date,
    current_time: state.time.current_time
  }
};

const mapDispatchToProps = {
  timeTick: timeTickAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Clock);