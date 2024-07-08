import { useEffect } from "react";
const DonutChart = () => {
  useEffect(() => {
    const loadGoogleCharts = () => {
      const script = document.createElement("script");
      script.src = "https://www.gstatic.com/charts/loader.js";
      script.onload = () => {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
      };
      document.body.appendChild(script);
    };

    const drawChart = () => {
      const data = google.visualization.arrayToDataTable([
        ["Task", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7],
      ]);

      const options = {
        title: "My Daily Activities",
        pieHole: 0.4,
      };

      const chart = new google.visualization.PieChart(
        document.getElementById("donutchart")
      );
      chart.draw(data, options);
    };

    if (!window.google) {
      loadGoogleCharts();
    } else {
      drawChart();
    }
  }, []);

  return (
    <div id="donutchart"   style={{ width: "100%", height: "400px" }}></div>
  );
};

export default DonutChart;