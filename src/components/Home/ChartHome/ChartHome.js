import React, {useEffect, useState} from "react";
import {Bar} from "react-chartjs-2";
import {MDBContainer} from "mdbreact";
import {API} from "../../utils/API";

export default function ChartHome({categories}) {
    const dataBar = {
        labels: Object.keys(categories).map(function (key) {
            return [categories[key].name].toString();
        }),
        datasets: [
            {
                label: "% din total",
                data: Object.keys(categories).map(function (key) {
                    return (([categories[key].candidateDTOS])[0].length).toString();
                }),
                backgroundColor: [
                    "rgba(255, 134,159,0.4)",
                    "rgba(98,  182, 239,0.4)",
                    "rgba(255, 218, 128,0.4)",
                    "rgba(113, 205, 205,0.4)",
                    "rgba(170, 128, 252,0.4)",
                    "rgba(255, 177, 101,0.4)"
                ],
                borderWidth: 2,
                borderColor: [
                    "rgba(255, 134, 159, 1)",
                    "rgba(98,  182, 239, 1)",
                    "rgba(255, 218, 128, 1)",
                    "rgba(113, 205, 205, 1)",
                    "rgba(170, 128, 252, 1)",
                    "rgba(255, 177, 101, 1)"
                ]
            }
        ]
    };
    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [
                {
                    barPercentage: 1,
                    gridLines: {
                        display: true,
                        color: "rgba(0, 0, 0, 0.1)"
                    }
                }
            ],
            yAxes: [
                {
                    gridLines: {
                        display: true,
                        color: "rgba(0, 0, 0, 0.1)"
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }

    return (
        <MDBContainer>
            <h3 className="mt-5">Participare Categorie</h3>
            <Bar data={dataBar} options={barChartOptions}/>
        </MDBContainer>
    );

}

