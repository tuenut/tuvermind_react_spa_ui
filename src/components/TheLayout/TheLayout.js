import  React from "react";

import {TheContent} from "./TheContent";


export const TheLayout = () => (
  <div>

    <div id={"sidebar"}/>

    <div>
      <div id={"headbar"}/>
      <TheContent/>
    </div>

  </div>
);
