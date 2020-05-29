import React from 'react';
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from ".././Store/reducers";

import TimeFrameContainer from "./containers/ClockFrame/Clock";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


class App extends React.Component {
  render() {
    return (

      <div className={"container-fluid"}>
        <div className={"row flex-xl-nowrap"}>
          <Provider store={store}>

            <div className={"mx-auto"}>
              <TimeFrameContainer/>
            </div>


          </Provider>
        </div>
      </div>

    )
  }
}

export default App;
