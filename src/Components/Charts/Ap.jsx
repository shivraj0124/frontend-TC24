import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function Ap() {
  const data = [
    {
      name: "Page A",
      uv: 1000,
    },
    {
      name: "Page B",
      uv: 1700,
    },
    {
      name: "Page C",
      uv: 500,
    },
  ];

  ``;
  return (
    <AreaChart
      width={680}
      height={300}
      data={data}
      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>

      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="uv"
        stroke="#82ca9d"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
    </AreaChart>
  );
}
