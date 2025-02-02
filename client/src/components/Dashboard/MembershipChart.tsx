import React, { FC, useContext } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import countGender from "@/helpers/countGender";

import { MemberContext } from "../../contexts/MemberContext";

const MembershipChart: FC = () => {
  const { members } = useContext(MemberContext);
  const { male, female } = countGender(members);

  const data = [
    { name: "Male", value: male },
    { name: "Female", value: female },
  ];

  const RADIAN = Math.PI / 180;
  const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <div className="w-full h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col justify-center items-center">
        <strong className="text-gray-700 font-medium">Membership Chart</strong>
        <div className="mt-3 w-full flex-1 text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={300}>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={105}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default MembershipChart;
