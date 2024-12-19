import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const PopulationChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchPopulationData = async () => {
      try {
        const response = await axios.get(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
        );
        const data = response.data.data;
        data.push({
          "ID Nation": "01000US",
          Nation: "India",
          "ID Year": 2022,
          Year: "2022",
          Population: 231097593,
          "Slug Nation": "ind",
        });
        // Group data by nation
        const nations = [...new Set(data.map((item) => item.Nation))];
        const labels = [...new Set(data.map((item) => item.Year))];

        const datasets = nations.map((nation, index) => {
          const nationData = data.filter((item) => item.Nation === nation);
          return {
            label: nation,
            data: nationData.map((item) => item.Population),
            backgroundColor: `rgba(${(index + 1) * 50}, ${100 + index * 40}, ${
              200 - index * 30
            }, 0.6)`,
            borderColor: `rgba(${(index + 1) * 50}, ${100 + index * 40}, ${
              200 - index * 30
            }, 1)`,
            borderWidth: 1,
          };
        });

        setChartData({
          labels,
          datasets,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPopulationData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Population Data by Nation</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            title: {
              display: true,
              text: "Population Data of Different Nations Over Years",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Year",
              },
            },
            y: {
              title: {
                display: true,
                text: "Population",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default PopulationChart;
