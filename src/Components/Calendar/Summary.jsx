import React from "react";
import SummarySingle from "./SummarySingle";

const Summary = ({ timeframe, summaryData }) => {
  if (timeframe === "Single Day") {
    return <SummarySingle {...{ summaryData }} />;
  }
  return <div>Summary {timeframe}</div>;
};

export default Summary;
