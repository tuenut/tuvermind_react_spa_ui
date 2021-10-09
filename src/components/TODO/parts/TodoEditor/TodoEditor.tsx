import React from "react";

import Grid from "@material-ui/core/Grid";

import { EditTitleSection } from "./EditTitleSection";
import { EditDescriptionSection } from "./EditDescriptionSection";
import { EditStartDateSection } from "./EditStartDateSection";
import { EditDurationSection } from "./EditDurationSection";
import { EditRemindersSection } from "./EditRemindersSection";


export const TodoEditor = () => {

  return (
    <React.Fragment>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <EditTitleSection/>
        </Grid>

        <Grid item xs={12}>
          <EditDescriptionSection/>
        </Grid>

        <Grid item xs={12}>
          <EditStartDateSection/>
        </Grid>

        <Grid item xs={6}>
          <EditDurationSection/>
        </Grid>

        <Grid item xs={12}>
          <EditRemindersSection/>
        </Grid>

      </Grid>
    </React.Fragment>
  )
};