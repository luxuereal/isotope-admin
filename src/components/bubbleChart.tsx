import React, { useEffect, useState } from "react";
import { ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend
);

const options: ChartOptions<"bubble"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
                label += ': ';
            }
            if (context.parsed.y !== null) {
                label += context.parsed._custom;
            }
            label+='%'
            return label;
        }
      }
    },
    legend: {
      display: true,
      position: "right",

      labels: {
        font: {
          size: 16,
          family: "Inter",
        },
        color: "#000000",
        boxWidth: 16,
        useBorderRadius: true,
        borderRadius: 8,
      },
    },
  },
  scales: {
    x: {
      type: "linear",
      grace: "5%",
      grid: {
        display: false,
      },
      ticks: {
        display: false,
        // stepSize: 50,
      },
      display: false,
    },
    y: {
      display: false,
      type: "linear",
      grace: "5%",
      grid: {
        display: false,
        // beginAtZero: true,
      },
      //   min: 0,
      // max: 1,
      ticks: {
        // forces step size to be 50 units
        display: false,
      },
    },
  },
};

interface props {
  data: any;
}
export const BubbleChart: React.FC<props> = ({ data }) => {
  const [chart , setChart] = useState<any>(null);
  useEffect(()=>{
    let temp = data.filter((item:any) => (item.label !== 'Nan'));
    setChart(temp);
  },[data])
  if(chart)
    return <Bubble options={options} data={{ datasets: chart }} className="min-h-[200px]"/>;
};
export default BubbleChart;
