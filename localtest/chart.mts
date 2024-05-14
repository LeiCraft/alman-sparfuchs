import * as chartjs from "chart.js";

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export function create() {

    //const labels = months({count: 7});
    const data = {
        labels: ['Positive', 'Negative'],
        datasets: [{
            data: [100, -50],
            backgroundColor: 'rgb(255, 99, 132)'
        }],
    };
    
    const config = {
        type: 'bar',
        data,
        options: {
            scales: {
                y: {
                    type: 'linear',
                    grace: '5%'
                }
            },
            plugins: {
                legend: false
            }
        }
    }
    
    var ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');

    // @ts-ignore
    new chartjs.Chart((ctx as CanvasRenderingContext2D), config);
}