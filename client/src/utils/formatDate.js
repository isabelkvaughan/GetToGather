import React from "react";
import Moment from "react-moment";

export const formatDate = (date) => {
  return <Moment format="h:mma dddd Do MMMM, YYYY" date={date * 1} />;
};