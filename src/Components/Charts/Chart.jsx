import React, { useEffect, useState } from "react";
// import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Chart({ clg, poc, hod }) {
  console.log(clg);
  const data = [
    {
      name: "colleges ",
      value: clg,
    },
    {
      name: "pocs ",
      value: poc,
    },
    {
      name: " Hods",
      value: hod,
    },
  ];

  return (
    <div style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <BarChart
        width={400}
        height={310}
        data={data}
        margin={{
          top: 5,
          right: 100,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 40, right: 5 }} />
        <YAxis />
        <Legend />
        <Bar dataKey="value" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}
