import React from "react";
import { useTheme } from "@material-ui/core/styles/index";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";


export const useCardCols = () => {
  const theme = useTheme();

  const breakpoints = [
    useMediaQuery(theme.breakpoints.up('lg')) && 4,
    useMediaQuery(theme.breakpoints.up('md')) && 3,
    useMediaQuery(theme.breakpoints.up('sm')) && 2,
    useMediaQuery(theme.breakpoints.up('xs')) && 1,
  ];

  return breakpoints.find(x => x) || 1;
};