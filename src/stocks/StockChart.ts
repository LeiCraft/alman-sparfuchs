import { Chart, type ChartConfiguration, type ChartItem } from "chart.js/auto";
import type Stock from "./stock";

class StockChartUtils {

    static defaultConfig: ChartConfiguration = {
        type: 'line',
        data: {
            labels: ["0"],
            datasets: []
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: "Wert"
                    },
                    ticks: {
                        callback: function(value, index, ticks) {
                            return value + '€';
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: "Runden"
                    }
                }
            },
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    position: "bottom",
                }
            }
        }
    }
}

export class StockChart {

    public static chart: Chart;
    public static container: HTMLElement;
    public static canvas: HTMLElement;

    private static initalized: boolean = false;

    public static init(parent: HTMLElement) {
        if (this.initalized) return;
        this.initalized = true;

        this.container = document.createElement('div');
        this.container.setAttribute("style", "height: 400px; width: 100%;");

        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute("style", "height: 400px; min-width: 100%;");

        parent.appendChild(this.container);
        this.container.appendChild(this.canvas);

        this.chart = new Chart(this.canvas as ChartItem, StockChartUtils.defaultConfig);
    }

    public static addStock(stock: Stock) {
        this.chart.data.datasets.push({
            label: stock.name,
            data: [stock.price],
            backgroundColor: stock.color,
            borderColor: stock.color,
        });
        return this.chart.data.datasets.length - 1;
    }

    public static addRound() {
        const len = (this.chart.data.labels as Array<string>).length;
        (this.chart.data.labels as Array<string>).push(len.toString());
    }

    public static addData(index: number, data: number) {
        this.chart.data.datasets[index].data.push(data);
    }

    public static show(count: number) {



    }

}

// @ts-ignore
globalThis.sc = StockChart;
// @ts-ignore
globalThis.cadd = function (count = 1) {
    for (let i = 0; i < count; i++) {
        const len = (StockChart.chart.data.labels as Array<any>).length;
        (StockChart.chart.data.labels as Array<any>).push(len.toString());
        StockChart.chart.data.datasets[0].data[len] = Math.floor(Math.random() * 120);
        StockChart.chart.update();
    }
}

export default StockChart;
