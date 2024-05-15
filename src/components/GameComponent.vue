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
		<div class="d-flex flex-row">
			<button class="btn btn-primary me-1" id="next-round-btn">Nächste Runde</button>
			<button
				type="button"
				data-bs-toggle="collapse" data-bs-target="#details-section" aria-controls="details-section"
				:class="'btn btn-primary details-section-btn' + (isWindowHeightBigger ? '' : ' collapsed')"
				:aria-expanded="(isWindowHeightBigger ? 'true' : 'false')"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down details-section-arrow-icon" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" stroke="currentColor" stroke-width="2"></path>
                </svg>
			</button>
		</div>
	</div>
	<div
		id="details-section"
		:class="'mt-5 collapse' + (isWindowHeightBigger ? ' show' : '')"
	>
		<div class="d-flex flex-row justify-content-between">
			<div id="current-prices" class="d-flex flex-wrap">

			</div>
			<div>
				<!--button id="game-end-btn" class="btn btn-danger">Spiel beenden</button-->
				<button id="game-end-btn" class="btn btn-danger">Spielstand löschen</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
//@ts-ignore
import Swal from 'sweetalert2';
import Game from '../game.js';
import Stock from '@/stocks/stock.js';

export default {
	name: "StockChart",

	data() {
		return {
			isWindowHeightBigger: false
		}
	},

	methods: {

		checkWindowHeight() {
			this.isWindowHeightBigger = window.innerHeight > 400;
		}

	},

	mounted() {
		Game.init();

		// Add Events		
		(document.getElementById("next-round-btn") as HTMLElement).addEventListener("click", () => {
			Game.nextRound();
		});

		(document.getElementById("game-end-btn") as HTMLElement).addEventListener("click", () => {
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!"
			}).then((result) => {
			if (result.isConfirmed) {
				Game.deleteCookie();
				Game.resetGame();
				Game.saveCookie();
				Swal.fire({
					title: "Deleted!",
					text: "Your file has been deleted.",
					icon: "success"
				});
			}
			});
		});

		this.checkWindowHeight();
		window.addEventListener('resize', this.checkWindowHeight);

	},

	beforeUnmount() {

		// Remove Events
		window.removeEventListener('resize', this.checkWindowHeight);

	}
}

</script>

<style scoped>

.details-section-arrow-icon {
	transition: transform 0.3s;
    transform: rotate(-180deg);
}

.details-section-btn.collapsed .details-section-arrow-icon {
    transform: none;
}

</style>