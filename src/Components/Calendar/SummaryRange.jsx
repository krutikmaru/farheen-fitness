import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost } from "@fortawesome/free-solid-svg-icons";
import { Legend, Line, LineChart, Tooltip, XAxis } from "recharts";
import { useUser } from "../../contexts/UserContext";
import { formatToDDMon } from "../../utils/functions/formatToDDMon";

const SummaryRange = ({ summaryData }) => {
  const { goals } = useUser();

  let data = [];
  for (const key of Object.keys(summaryData[0].track)) {
    const goal = goals.find((goal) => goal.name === key);
    data.push({
      name: key,
      title: goal.title,
      icon: goal.icon,
      data: [],
    });
  }
  for (let i = 0; i < data.length; i++) {
    let name = data[i].name;
    for (let j = 0; j < summaryData.length; j++) {
      let value = 0;
      if (summaryData[j].track[name].values.length !== 0) {
        value = summaryData[j].track[name].values.reduce(
          (acc, val) => acc + val
        );
      }
      const date = formatToDDMon(String(summaryData[j].dateId));
      data[i].data.push({ value, date });
    }
  }
  console.log(summaryData);
  console.log("SUMM", data);
  return (
    <div className="mt-10 ">
      <div className="flex flex-col space-y-5">
        {data.map((d) => {
          return (
            <>
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
                      <XAxis dataKey="date" />
                      {/* <YAxis /> */}
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
            </>
          );
        })}
      </div>
    </div>
  );
};

export default SummaryRange;
