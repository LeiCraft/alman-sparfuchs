<template>
</template>

<script lang="ts">
import { Chart, type ChartConfiguration, type ChartData, type ChartItem, type ChartOptions } from 'chart.js/auto';

const data: ChartData = {
	labels: ['1', '2', '3', '4', '5'],
	datasets: [{
		label: 'Stock Price',
		data: [100, 110, 105, 120, 115],
		backgroundColor: "rgb(75, 192, 192)",
		borderColor: "rgb(0, 255, 255)",
		
	}]
};

function setup() {

	globalThis.cadd = function (count = 1) {
		for (let i = 0; i < count; i++) {
			const len = globalThis.chart.data.labels.length;
			globalThis.chart.data.labels.push(len.toString());
			globalThis.chart.data.datasets[0].data[len] = Math.floor(Math.random() * 120);
			globalThis.chart.update();
		}
	}
	
}

export default {
	name: "StockChart",
	mounted: setup,
}

</script>