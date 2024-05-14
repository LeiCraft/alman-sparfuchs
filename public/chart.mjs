//import 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js';

import * as chartjs from "./node_modules/chart.js";

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

      
    
    var ctx = document.getElementById('myChart').getContext('2d');

    new chartjs.Chart(ctx, config);
}