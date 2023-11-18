import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

export default function SalesReportCharts({apiData}) {

 
    
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const dataSales = [
    { day: "1 jan", count: 10 },
    { day: "2 jan", count: 20 },
    { day: "3 jan", count: 35 },
    { day: "4 jan", count: 5 },
    { day: "5 jan", count: 22 },
    { day: "6 jan", count: 30 },
    { day: "7 jan", count: 5 },
    { day: "8 jan", count: 0 },
    { day: "9 jan", count: 40 },
    { day: "10 jan", count: 30 },
    { day: "11 jan", count: 9 },
    { day: "12 jan", count: 25 },
  ];

    let nowMonth = months[new Date(apiData.month).getMonth()] + " - " + new Date(apiData.month).getFullYear()
    // const dataGategorie = [
    //     {
    //         name: "Pending",
    //         value: 40,
    //         color: "#20a4f3",
    //       },
    //       {
    //         name: "Confirmed",
    //         value: 19,
    //         color: "#2ec4b6",
    //       },
    //       {
    //         name: "Shipped",
    //         value: 41,
    //         color: "#ffe66d",
    //       },
    //       {
    //         name: "Delivered",
    //         value: 9,
    //         color: "#F653A6",
    //       },
    //       {
    //         name: "Cancelled",
    //         value: 10,
    //         color: "#EE204E",
    //       },
    //       {
    //         name: "On Hold",
    //         value: 10,
    //         color: "#BEBFC5",
    //       },
    //       {
    //         name: "Delayed",
    //         value: 13,
    //         color: "#FF7538",
    //       },
    //       {
    //           name: "Returned",
    //           value: 4,
    //           color: "#9966CC",
    //         },
           
    //   ];
    const chart_data = {
        labels: apiData.data.map((data) => data?.day),
        datasets: [
          {
            label: nowMonth || "...",
            data: apiData.data.map((data) => data?.count), // [12, 19, 3, 5, 2, 3, 8],
            // borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor:  "#2ec4b6" //dataGategorie.map((data) => data.color),// 'rgba(75, 192, 192, 0.2)',
          }
        ],
      };
    const options = {
      // Customize chart options here
    };
  
    return <Bar data={chart_data} options={options} />;
}