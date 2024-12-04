import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

interface DaysCount {
  [day: string]: number;
}

interface BarChartProps {
  data: DaysCount;
}

// Function to shorten day names to three letters
const shortenDayName = (day: string): string => {
  return day.substring(0, 3); // Take the first three characters
};

// Colors for the bars
const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#d0ed57",
  "#a4de6c",
  "#8dd1e1",
  "#83a6ed",
];

const DayBornChart: React.FC<BarChartProps> = ({ data }) => {
  // Transform the data object into an array of objects suitable for Recharts
  const barData = Object.entries(data).map(([day, count]) => ({
    name: shortenDayName(day), // Shorten day name
    value: count,
  }));

  return (
    <>
      <div className="w-full h-[22rem] bg-white p-2 rounded-sm border border-gray-200 flex flex-col justify-center items-center">
        <strong className="text-gray-700 font-medium">Day Born Chart</strong>
        <div className="mt-3 w-full flex-1 text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} width={600} height={300}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {/* Apply different colors for each bar */}
                {barData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                {/* Add LabelList to display values on top of each bar */}
                <LabelList dataKey="value" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default DayBornChart;
