import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import axios from "axios";
import { formatNumber } from "../../utils/functions/formatNumber";

const AIPanel = () => {
  const { goals } = useUser();
  const [AIData, setAIData] = useState([
    {
      categoryTitle: "Calories",
      valueTitle: "You've burnt",
      predictionTitle: "Predicted Weight Change",
      valueUnit: "calories",
      predictionUnit: "lbs",
      icon: "🔥",
      color: "#ffb02e",
      endpoint: "http://127.0.0.1:5000/predict-weight-change",
      isSet: false,
      value: 0,
      prediction: 0,
    },
    {
      categoryTitle: "Water",
      valueTitle: "You've consumed",
      predictionTitle: "Predicted Hydration",
      valueUnit: "liters",
      predictionUnit: "",
      icon: "💧",
      color: "#6fc3ff",
      endpoint: "http://127.0.0.1:5000/predict-hydration",
      isSet: false,
      value: 0,
      prediction: 0,
    },
    {
      categoryTitle: "Steps",
      valueTitle: "You've walked",
      predictionTitle: "Predicted Distance",
      valueUnit: "steps",
      predictionUnit: "km",
      icon: "👣",
      color: "#6fff81",
      endpoint: "http://127.0.0.1:5000/predict-distance",
      isSet: false,
      value: 0,
      prediction: 0,
    },
    {
      categoryTitle: "Steps",
      valueTitle: "You've walked",
      predictionTitle: "Predicted Walk Time",
      valueUnit: "steps",
      predictionUnit: "mins",
      icon: "👣",
      color: "#6fff81",
      endpoint: "http://127.0.0.1:5000/predict-walking-time",
      isSet: false,
      value: 0,
      prediction: 0,
    },
  ]);

  useEffect(() => {
    async function fetchAIData() {
      let AIDataCopy = JSON.parse(JSON.stringify(AIData));
      AIDataCopy = AIDataCopy.map((obj) => {
        const found = goals.find(
          (goal) => goal.name === obj.categoryTitle.toLowerCase()
        );
        obj.isSet = found.isSet;
        if (found.isSet) {
          obj.value = Number(found.yearly.value);
        }
        return obj;
      });

      let requests = [];
      for (let i = 0; i < AIDataCopy.length; i++) {
        if (AIDataCopy[i].isSet) {
          const goal = goals.find(
            (g) => g.name === AIDataCopy[i].categoryTitle.toLowerCase()
          );
          const request = axios.post(AIDataCopy[i].endpoint, {
            value: Number(goal.yearly.value),
          });
          requests.push(request);
        }
      }

      try {
        console.log(requests);
        const responses = await Promise.all(requests);
        console.log(responses);
        for (let i = 0; i < responses.length; i++) {
          AIDataCopy[i].prediction = responses[i].data.prediction;
        }
        setAIData(AIDataCopy);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchAIData();
  }, [goals]);
  return (
    <div className="mt-10 w-full ">
      <div>
        <h1 className="text-2xl">
          Your <span className="text-green-primary">AI Predictions</span> 🐍
        </h1>
        <p className="text-[#666] mt-1 text-sm">
          Here's what you AI has predicted based on your activity
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {AIData.map((aiData) => {
          if (aiData.isSet) {
            return (
              <SingleAIPrediction key={aiData.categoryTitle} data={aiData} />
            );
          }
        })}
      </div>
    </div>
  );
};

export default AIPanel;

const SingleAIPrediction = ({ data }) => {
  return (
    <div className="w-full bg-[#101010] border-2 border-[#272727] border-dashed p-5  min-h-[180px] rounded-md overflow-hidden flex flex-col  justify-between items-center">
      {/* Title */}
      <div className="w-full flex justify-between items-center">
        <span className="text-[#555555] font-medium">{data.categoryTitle}</span>
        <span>{data.icon}</span>
      </div>
      {/* Calculated */}
      <div className="flex flex-col space-y-2 p-4 px-6 rounded-md">
        <h1>{data.valueTitle}</h1>
        <div className="flex items-end space-x-2">
          <span className="text-5xl" style={{ color: data.color }}>
            {formatNumber(data.value)}
          </span>
          <p className="mb-2">{data.valueUnit}</p>
        </div>
      </div>
      {/* Prediction */}
      <div className="flex flex-col space-y-2 bg-[#181818] border-2 border-[#272727] p-6 rounded-md  items-center">
        <h1 className="text-[#7c7c7c] font-medium">{data.predictionTitle}</h1>
        <div className="flex items-end space-x-2">
          <span className="text-4xl text-green-primary">
            {formatNumber(data.prediction)}
          </span>
          <p>{data.predictionUnit}</p>
        </div>
      </div>
    </div>
  );
};
