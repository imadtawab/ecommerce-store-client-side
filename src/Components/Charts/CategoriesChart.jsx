import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
//  best colors : #FF6384 #4BC0C0 #E7E9ED
const CategoriesChart = ({apiData}) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const dataGategorie = [

      {
        name: "Confirmed",
        value: 19,
        color: "#2ec4b6",
      },
      {
        name: "Shipped",
        value: 41,
        color: "#ffe66d",
      },
      {
        name: "Delivered",
        value: 9,
        color: "#F653A6",
      },
      {
        name: "Pending",
        value: 40,
        color: "#20a4f3",
      },
      {
        name: "Cancelled",
        value: 10,
        color: "#EE204E",
      },
      {
        name: "On Hold",
        value: 10,
        color: "#BEBFC5",
      },
      {
        name: "Delayed",
        value: 13,
        color: "#FF7538",
      },
      {
          name: "Returned",
          value: 4,
          color: "#9966CC",
        },
       
  ];
  let nowMonth = months[new Date(apiData.month).getMonth()] + " - " + new Date(apiData.month).getFullYear()
  const chart_data = {
    labels: Object.keys(apiData.data), //['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: nowMonth,
        data: Object.keys(apiData.data).map(a => {
          return apiData.data[a];
        }), // [12, 19, 3, 5, 2, 3, 8],
        // borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: dataGategorie.map((data) => data.color), // 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    // Customize chart options here
  };

  return <Doughnut data={chart_data} options={options} />;
};

export default CategoriesChart;
