<template>

	<div id="stock-chart">

	</div>
	<div class="d-flex info-container justify-content-between" style="margin-top: -55px;">
		<div>
			<div class="btn-group" role="group" aria-label="Basic radio toggle button group">
				<input type="radio" class="btn-check" name="btnradio" id="sc-show-5-btn" autocomplete="off" checked>
				<label class="btn btn-outline-primary" for="sc-show-5-btn">5</label>

				<input type="radio" class="btn-check" name="btnradio" id="sc-show-20-btn" autocomplete="off">
				<label class="btn btn-outline-primary" for="sc-show-20-btn">20</label>

				<input type="radio" class="btn-check" name="btnradio" id="sc-show-all-btn" autocomplete="off">
				<label class="btn btn-outline-primary" for="sc-show-all-btn">All</label>
			</div>
		</div>
		<div>
			<button class="btn btn-primary" id="next-round-btn">Nächste Runde</button>
		</div>
	</div>
</template>

<script lang="ts">
//@ts-ignore
import Game from '../game.js';
import StockChart from '../stocks/stockChart.js';

function setup() {

StockChart.init(document.getElementById("stock-chart") as HTMLElement);

Game.init();
	
let allData = [];
let currentIndex = 0;

(document.getElementById("next-round-btn") as HTMLElement).addEventListener("click", () => {
	Game.nextRound();
});

}

export default {
	name: "StockChart",
	mounted: setup,
}

</script>

<style scoped>


</style>