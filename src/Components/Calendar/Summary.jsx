import React from "react";
import SummarySingle from "./SummarySingle";
import SummaryRange from "./SummaryRange";

const Summary = ({ timeframe, summaryData }) => {
  if (timeframe === "Single Day") {
    return <SummarySingle {...{ summaryData }} />;
  }
  return <SummaryRange {...{ summaryData }} />;
};

export default Summary;
