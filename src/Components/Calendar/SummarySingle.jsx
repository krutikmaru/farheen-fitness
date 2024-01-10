import { faGhost } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { useUser } from "../../contexts/UserContext";

const SummarySingle = ({ summaryData }) => {
  const { goals } = useUser();
  let data = [];
  for (const property in summaryData.track) {
    let dataArray = [];
    const goal = goals.find((goal) => goal.name === property);
    for (let i = 0; i < summaryData.track[property].values.length; i++) {
      dataArray.push({
        value: summaryData.track[property].values[i],
        time: summaryData.track[property].time[i],
      });
    }
    data.push({
      name: property,
      icon: goal.icon,
      title: goal.title,
      data: dataArray,
      maxValue: Math.max(...dataArray.map((item) => parseInt(item.value, 10))),
    });
  }
  return (
    <div className="mt-10 ">
      <div className="flex flex-col space-y-5">
        {data.map((d) => {
          return (
            <div key={d.name}>
              <h1 className="text-4xl text-left lg:text-center">
                {d.title} {d.icon}
              </h1>
              <div className="w-full overflow-x-scroll rounded-lg pb-4 overflow-y-hidden flex items-center justify-start lg:justify-center">
                {d.data.length !== 0 ? (
                  <div className="w-[700px] h-[400px] bg-[#101010] p-5 rounded-md">
                    <LineChart
                      width={650}
                      height={350}
                      data={d.data}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <Tooltip
                        contentStyle={{
                          background: "#deff10",
                          border: "none",
                          borderRadius: 10,
                          color: "black",
                        }}
                        itemStyle={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: 15,
                        }}
                      />
                      <Legend />
                      <Line
                        type="bump"
                        dataKey="value"
                        stroke="#deff10"
                        strokeWidth={3}
                        dot={false}
                      />
                      <XAxis dataKey="time" />
                      <YAxis hide type="number" domain={[0, d.maxValue]} />
                    </LineChart>
                  </div>
                ) : (
                  <div className="w-[700px] h-[400px] border-2 border-dashed border-[#252525]  p-5 rounded-md">
                    <div className="w-full h-full flex justify-center items-center">
                      <h1 className="text-2xl text-[#7c7c7c] ">
                        No Data Available
                        <FontAwesomeIcon icon={faGhost} className="ml-4" />
                      </h1>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SummarySingle;
