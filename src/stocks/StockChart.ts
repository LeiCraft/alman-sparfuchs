import { Chart, type ChartConfiguration, type ChartItem } from "chart.js/auto";

class StockChartUtils {

    static defaultConfig: ChartConfiguration = {
        type: 'line',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            responsive: true, // Allow chart to resize
            maintainAspectRatio: false, // Disable aspect ratio constraint
            animation: {
                onComplete: function(animation: any) {
                    const labels = StockChart.chart.data.labels as Array<string>;
                    if (labels.length > 5) {
                        const newWidth = (labels.length * 50) + 100;
                        StockChart.container.style.width = newWidth + 'px';
                        StockChart.container.style.height = '400px';
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
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
                title: {
                    display: true,
                    text: 'Chart.js Line Chart'
                },
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
    public static fullContainer: HTMLElement;
    public static container: HTMLElement;
    public static canvas: HTMLElement;

    private static initalized: boolean = false;

    static init(parent: HTMLElement) {
        if (this.initalized) return;

        this.fullContainer = document.createElement('div');
        this.fullContainer.setAttribute("style", "overflow: auto;");

        this.container = document.createElement('div');
        this.container.setAttribute("style", "height: 400px; width: 300px;");

        this.canvas = document.createElement('canvas');
        this.chart = new Chart(this.canvas as ChartItem, StockChartUtils.defaultConfig);

        parent.appendChild(this.fullContainer);
        this.fullContainer.appendChild(this.container);
        this.container.appendChild(this.canvas);
    }

    static addRound() {

    }

}

export default StockChart;
