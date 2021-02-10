import React from "react";
import ReactApexChart from 'react-apexcharts';

export default function ChartHalls({halls}) {

    const series = [{
        name: 'Locuri Libere folosibile',
        data: Object.keys(halls).map(function (key) {
            return ((halls[key].utilizableSize))
        })
    }, {
        name: 'Locuri ocupate',
        data: Object.keys(halls).map(function (key) {
            return ((halls[key].listCandidates.length))
        })
    }];


    console.log(series);
    const options = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            stackType: '100%'
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        title: {
            text: 'Situatia Salilor'
        },
        xaxis: {
            categories: Object.keys(halls).map(function (key) {
                return (([halls[key].name]));
            }),
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val +"Locuri"
                }
            }
        },
        fill: {
            opacity: 1

        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
        }
    };


    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={350}/>
        </div>
    )
}