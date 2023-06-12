import React from "react";

import { ChartOptions } from "chart.js";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend
);

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: false,
    },
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,
        stepSize: 50,
      },
    },
    y: {
      grid: {
        display: false,
      },
      min: 0,
      max: 1.1,

      ticks: {
        // forces step size to be 50 units
        display: false,
        stepSize: 100,
      },
    },
  },
};
const bezier: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: "index",
  },
  plugins: {
    title: {
      text: "Monthly Views",
      display: true,
      align: "start",
      color: "#000000",
      font: {
        size: 20,
        weight: "bold",
      },
    },
    legend: {
      display: true,
      labels: {
        color: "rgb(0, 0, 0)",
        boxWidth: 13,
        useBorderRadius: true,
        borderRadius: 7,
      },
    },
  },
  scales: {
    x: {
      grid: {},
      ticks: {
        stepSize: 50,
      },
    },
    y: {
      grid: {
        display: true,
      },
      min: 0,

      ticks: {
        // forces step size to be 50 units
        display: true,
        stepSize: 10,
      },
    },
  },
  elements: {
    line: {
      tension: 0.5,
    },
  },
};

const labels = ["1", "2", "3", "4", "5", "6"];
const monthlabels = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const data1 = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [0.1, 0.3, 0.4, 0.6, 0.9, 1],
      borderColor: "#FBBC05",
      backgroundColor: "#FBBC05",
    },
  ],
};
interface props {
  data: any;
  option: number;
}
export const LineChart: React.FC<props> = ({ data, option }) => {
  return option === 1 ? (
    <Line options={options} data={{ labels: labels, datasets: data }} />
  ) : (
    <Line options={bezier} data={{ labels: monthlabels, datasets: data }} />
  );
};
export default LineChart;
